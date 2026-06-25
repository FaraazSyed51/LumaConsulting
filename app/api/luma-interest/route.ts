import { NextResponse } from "next/server";
import { formatProjectRankings } from "@/data/lumaProjects";

const ALLOWED_RESUME_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/octet-stream",
]);

const MAX_RESUME_BYTES = 5 * 1024 * 1024;

type StudentPayload = {
  applicantType: "student";
  name: string;
  email: string;
  universityEmail: string;
  major: string;
  year: string;
  graduatingYear: string;
  linkedin?: string;
  github?: string;
  resumeFileName: string;
  resumeMimeType: string;
  resumeBase64: string;
  hoursPerWeek: string;
  availableUntil: string;
  interest: string;
  skills: string;
  additionalNotes?: string;
  projectRankings: string[];
};

type PartnerPayload = {
  applicantType: "partner";
  name: string;
  email: string;
  organization: string;
  orgType?: string;
  message: string;
};

function isValidResumeExtension(fileName: string) {
  const ext = fileName.split(".").pop()?.toLowerCase();
  return ext === "pdf" || ext === "doc" || ext === "docx";
}

function isStudentPayload(body: Record<string, unknown>): body is StudentPayload {
  if (
    body.applicantType !== "student" ||
    typeof body.name !== "string" ||
    body.name.trim().length === 0 ||
    typeof body.email !== "string" ||
    body.email.trim().length === 0 ||
    typeof body.universityEmail !== "string" ||
    body.universityEmail.trim().length === 0 ||
    typeof body.major !== "string" ||
    body.major.trim().length === 0 ||
    typeof body.year !== "string" ||
    body.year.trim().length === 0 ||
    typeof body.graduatingYear !== "string" ||
    body.graduatingYear.trim().length === 0 ||
    typeof body.resumeFileName !== "string" ||
    body.resumeFileName.trim().length === 0 ||
    typeof body.resumeMimeType !== "string" ||
    typeof body.resumeBase64 !== "string" ||
    body.resumeBase64.trim().length === 0 ||
    typeof body.hoursPerWeek !== "string" ||
    body.hoursPerWeek.trim().length === 0 ||
    typeof body.availableUntil !== "string" ||
    body.availableUntil.trim().length === 0 ||
    typeof body.interest !== "string" ||
    body.interest.trim().length === 0 ||
    typeof body.skills !== "string" ||
    body.skills.trim().length === 0 ||
    !Array.isArray(body.projectRankings) ||
    body.projectRankings.length === 0
  ) {
    return false;
  }

  if (!isValidResumeExtension(body.resumeFileName)) {
    return false;
  }

  const mime = body.resumeMimeType.trim();
  if (mime && !ALLOWED_RESUME_MIME_TYPES.has(mime)) {
    return false;
  }

  const estimatedBytes = Math.floor((body.resumeBase64.length * 3) / 4);
  if (estimatedBytes > MAX_RESUME_BYTES) {
    return false;
  }

  return true;
}

function isPartnerPayload(body: Record<string, unknown>): body is PartnerPayload {
  return (
    body.applicantType === "partner" &&
    typeof body.name === "string" &&
    body.name.trim().length > 0 &&
    typeof body.email === "string" &&
    body.email.trim().length > 0 &&
    typeof body.organization === "string" &&
    body.organization.trim().length > 0 &&
    typeof body.message === "string" &&
    body.message.trim().length > 0
  );
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;

  if (!isStudentPayload(data) && !isPartnerPayload(data)) {
    return NextResponse.json(
      { error: "Please fill in all required fields and upload a valid resume (PDF or Word, max 5 MB)." },
      { status: 400 }
    );
  }

  const scriptUrl = process.env.GOOGLE_FORM_SCRIPT_URL;

  if (!scriptUrl) {
    return NextResponse.json(
      {
        error:
          "Form backend is not configured yet. Add GOOGLE_FORM_SCRIPT_URL to your environment.",
      },
      { status: 503 }
    );
  }

  const submittedAt = new Date().toISOString();
  const source = "mtc-osu-luma";

  const payload =
    data.applicantType === "student"
      ? {
          applicantType: "student" as const,
          submittedAt,
          source,
          name: data.name.trim(),
          email: data.email.trim(),
          universityEmail: data.universityEmail.trim(),
          major: data.major.trim(),
          year: data.year.trim(),
          graduatingYear: data.graduatingYear.trim(),
          linkedin: data.linkedin?.trim() ?? "",
          github: data.github?.trim() ?? "",
          resumeFileName: data.resumeFileName.trim(),
          resumeMimeType: data.resumeMimeType.trim(),
          resumeBase64: data.resumeBase64.trim(),
          hoursPerWeek: data.hoursPerWeek.trim(),
          availableUntil: data.availableUntil.trim(),
          interest: data.interest.trim(),
          skills: data.skills.trim(),
          additionalNotes: data.additionalNotes?.trim() ?? "",
          projectRankings: data.projectRankings,
          projectRankingsFormatted: formatProjectRankings(data.projectRankings),
        }
      : {
          applicantType: "partner" as const,
          submittedAt,
          source,
          name: data.name.trim(),
          email: data.email.trim(),
          organization: data.organization.trim(),
          orgType: data.orgType?.trim() ?? "",
          message: data.message.trim(),
        };

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const result = await response.json().catch(() => null);

    if (!response.ok || !result?.success) {
      throw new Error(result?.error ?? "Submission failed.");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Luma interest form error:", error);
    return NextResponse.json(
      {
        error:
          "Something went wrong. Please try again or email ohiostatemtc@gmail.com.",
      },
      { status: 502 }
    );
  }
}
