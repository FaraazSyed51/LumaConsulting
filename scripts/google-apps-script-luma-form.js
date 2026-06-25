/**
 * Luma form → Google Sheets (student + partner + MTC email list)
 *
 * STUDENT SHEET: import scripts/sheet-templates/student-applications.csv
 * PARTNER SHEET: import scripts/sheet-templates/business-partners.csv
 * MTC EMAILS:   import scripts/sheet-templates/mtc-emails.csv
 *
 * Resumes upload to RESUME_FOLDER_ID in Google Drive (PDF + Word).
 */

const SHEET_ID_STUDENTS = "PASTE_STUDENT_APPLICATIONS_SHEET_ID";
const SHEET_ID_BUSINESS = "PASTE_BUSINESS_PARTNERS_SHEET_ID";
const SHEET_ID_MTC_EMAILS = "PASTE_MTC_EMAILS_SHEET_ID";
const SHEET_ID_IWAQF = "PASTE_YOUR_WAHED_IWAQF_SHEET_ID";

const RESUME_FOLDER_ID = "PASTE_RESUME_FOLDER_ID";

const TAB_NAME = "Sheet1";
const NOTIFY_EMAIL = "ohiostatemtc@gmail.com";

/** Accepts a bare ID or a full Google URL — paste either format. */
function extractSheetId(value) {
  if (!value || String(value).indexOf("PASTE_") === 0) return value;
  const text = String(value).trim();
  const match = text.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : text;
}

function extractFolderId(value) {
  if (!value || String(value).indexOf("PASTE_") === 0) return value;
  const text = String(value).trim();
  const match = text.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : text;
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function sanitizeFileName(name) {
  return String(name || "resume")
    .replace(/[^\w.\-() ]/g, "_")
    .slice(0, 120);
}

function saveResumeToDrive(data) {
  if (!data.resumeBase64) return "";

  if (!RESUME_FOLDER_ID || RESUME_FOLDER_ID.indexOf("PASTE_") === 0) {
    throw new Error("Resume folder is not configured in Apps Script.");
  }

  const bytes = Utilities.base64Decode(data.resumeBase64);
  const mime = data.resumeMimeType || "application/pdf";
  const originalName = sanitizeFileName(data.resumeFileName || "resume.pdf");
  const applicant = sanitizeFileName(data.name || "Applicant");
  const blob = Utilities.newBlob(bytes, mime, originalName);
  const folder = DriveApp.getFolderById(extractFolderId(RESUME_FOLDER_ID));
  const file = folder.createFile(blob);
  file.setName(applicant + " - " + originalName);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}

function buildStudentRow(data) {
  return [
    data.submittedAt || new Date().toISOString(),
    data.name || "",
    data.email || "",
    data.universityEmail || "",
    data.major || "",
    data.year || "",
    data.graduatingYear || "",
    data.linkedin || "",
    data.github || "",
    data.resumeUrl || "",
    data.hoursPerWeek || "",
    data.availableUntil || "",
    data.projectRankingsFormatted || (data.projectRankings || []).join(", "),
    data.interest || "",
    data.skills || "",
    data.additionalNotes || "",
    data.source || "mtc-osu-luma",
    "New",
  ];
}

function buildBusinessRow(data) {
  return [
    data.submittedAt || new Date().toISOString(),
    data.name || "",
    data.email || "",
    data.organization || "",
    data.orgType || "",
    data.message || "",
    data.source || "mtc-osu-luma",
    "New",
  ];
}

function buildMtcEmailRow(timestamp, email, name, type, organization, source, label) {
  return [
    timestamp,
    email || "",
    name || "",
    type || "",
    organization || "",
    source || "mtc-osu-luma",
    label || "",
  ];
}

function appendMtcEmails(data) {
  const timestamp = data.submittedAt || new Date().toISOString();
  const source = data.source || "mtc-osu-luma";

  if (data.applicantType === "student") {
    appendToSheet(
      SHEET_ID_MTC_EMAILS,
      buildMtcEmailRow(timestamp, data.email, data.name, "student", "", source, "personal")
    );

    const personal = normalizeEmail(data.email);
    const university = normalizeEmail(data.universityEmail);
    if (university && university !== personal) {
      appendToSheet(
        SHEET_ID_MTC_EMAILS,
        buildMtcEmailRow(
          timestamp,
          data.universityEmail,
          data.name,
          "student",
          "",
          source,
          "university"
        )
      );
    }
  } else {
    appendToSheet(
      SHEET_ID_MTC_EMAILS,
      buildMtcEmailRow(
        timestamp,
        data.email,
        data.name,
        "partner",
        data.organization || "",
        source,
        data.orgType || "partner"
      )
    );
  }
}

function buildIwaqfRow(data) {
  return [
    data.submittedAt || new Date().toISOString(),
    data.name || "",
    data.email || "",
    "student",
    data.major || "",
    data.skills || "",
    data.interest || "",
    data.source || "mtc-osu-luma",
    "New",
  ];
}

function appendToSheet(spreadsheetId, row) {
  if (!spreadsheetId || spreadsheetId.indexOf("PASTE_") === 0) {
    throw new Error("Spreadsheet is not configured in Apps Script.");
  }
  const sheet = SpreadsheetApp.openById(extractSheetId(spreadsheetId)).getSheetByName(TAB_NAME);
  if (!sheet) throw new Error('Tab "' + TAB_NAME + '" not found');
  sheet.appendRow(row);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (data.applicantType === "student") {
      data.resumeUrl = saveResumeToDrive(data);
      appendToSheet(SHEET_ID_STUDENTS, buildStudentRow(data));

      const rankings = data.projectRankings || [];
      if (rankings[0] === "iwaqf" && SHEET_ID_IWAQF && SHEET_ID_IWAQF.indexOf("PASTE_") !== 0) {
        appendToSheet(SHEET_ID_IWAQF, buildIwaqfRow(data));
      }
    } else {
      appendToSheet(SHEET_ID_BUSINESS, buildBusinessRow(data));
    }

    appendMtcEmails(data);

    if (NOTIFY_EMAIL) {
      const isStudent = data.applicantType === "student";
      const subject = isStudent
        ? "[Luma Student] " + data.name + " — " + (data.projectRankingsFormatted || "")
        : "[Luma Partner] " + data.name + " — " + (data.organization || "");

      const lines = isStudent
        ? [
            "Rankings: " + (data.projectRankingsFormatted || ""),
            "",
            "Name: " + data.name,
            "Email: " + data.email,
            "OSU: " + data.universityEmail,
            "Major: " + data.major,
            "Year / Graduating: " + data.year + " / " + data.graduatingYear,
            "Resume: " + data.resumeUrl,
            "Hours: " + data.hoursPerWeek,
            "Available until: " + data.availableUntil,
            "",
            data.interest,
          ]
        : [
            "Org: " + data.organization,
            "Type: " + (data.orgType || "—"),
            "Contact: " + data.name + " <" + data.email + ">",
            "",
            data.message,
          ];

      MailApp.sendEmail(NOTIFY_EMAIL, subject, lines.join("\n"), {
        replyTo: data.email || "",
      });
    }

    return jsonResponse({ success: true });
  } catch (error) {
    return jsonResponse({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/** Run once from the Apps Script editor to verify IDs + authorize Drive/Sheets. */
function testSetup() {
  const results = [];

  try {
    const folder = DriveApp.getFolderById(extractFolderId(RESUME_FOLDER_ID));
    results.push("Resume folder OK: " + folder.getName());
  } catch (e) {
    results.push("Resume folder FAILED: " + e.message);
  }

  try {
    const sheet = SpreadsheetApp.openById(extractSheetId(SHEET_ID_STUDENTS)).getSheetByName(TAB_NAME);
    results.push("Student sheet OK: " + sheet.getParent().getName());
  } catch (e) {
    results.push("Student sheet FAILED: " + e.message);
  }

  try {
    if (!SHEET_ID_BUSINESS || SHEET_ID_BUSINESS.indexOf("PASTE_") === 0) {
      results.push("Business sheet SKIPPED: not configured yet");
    } else {
      const business = SpreadsheetApp.openById(extractSheetId(SHEET_ID_BUSINESS)).getSheetByName(TAB_NAME);
      results.push("Business sheet OK: " + business.getParent().getName());
    }
  } catch (e) {
    results.push("Business sheet FAILED: " + e.message);
  }

  try {
    if (!SHEET_ID_MTC_EMAILS || SHEET_ID_MTC_EMAILS.indexOf("PASTE_") === 0) {
      results.push("MTC emails sheet SKIPPED: not configured yet");
    } else {
      const emails = SpreadsheetApp.openById(extractSheetId(SHEET_ID_MTC_EMAILS)).getSheetByName(TAB_NAME);
      results.push("MTC emails sheet OK: " + emails.getParent().getName());
    }
  } catch (e) {
    results.push("MTC emails sheet FAILED: " + e.message);
  }

  Logger.log(results.join("\n"));
  return results.join("\n");
}
