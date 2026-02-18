import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

type ReviewPayload = {
  sessionId: number;
  finalStatus: "SAFE" | "RISK" | "FLAGGED";
  note?: string;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");

  if (!sessionId) {
    return NextResponse.json({ error: "Session ID required" }, { status: 400 });
  }

  try {
    const result = await sql`
      SELECT final_status as status, note
      FROM reviews
      WHERE session_id = ${sessionId}
      LIMIT 1
    `;

    return NextResponse.json(result[0] || null);
  } catch (error) {
    console.error("Review submission error:", error);
    return NextResponse.json(
      { error: "Failed to fetch review" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ReviewPayload;
    const { sessionId, finalStatus, note } = body;

    if (!sessionId || !finalStatus) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    await sql`
      INSERT INTO reviews (session_id, final_status, note)
      VALUES (${sessionId}, ${finalStatus}, ${note ?? null})
      ON CONFLICT (session_id)
      DO UPDATE SET
        final_status = EXCLUDED.final_status,
        note = EXCLUDED.note,
        updated_at = NOW()
    `;

    await sql`
      UPDATE sessions
      SET status = ${finalStatus}
      WHERE id = ${sessionId}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Review submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 },
    );
  }
}
