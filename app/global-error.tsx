"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#ffffff",
          color: "#454545",
        }}
      >
        <div style={{ textAlign: "center", padding: "1rem" }}>
          <h1 style={{ color: "#BA0C2F", fontSize: "1.5rem", marginBottom: "0.5rem" }}>
            MTC at Ohio State
          </h1>
          <p style={{ marginBottom: "1.5rem" }}>Something went wrong loading this page.</p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              background: "#BA0C2F",
              color: "#fff",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
