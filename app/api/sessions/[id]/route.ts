import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: sessionId } = await params;
    
    const numericId = parseInt(sessionId, 10);

    const sessions = await sql`
      SELECT id, fellow_name, group_id, date, status, transcript
      FROM sessions
      WHERE id = ${numericId}
    `;

    if (sessions.length === 0) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json(sessions[0]);
  } catch (err) {
    console.error("Failed to fetch session:", err);
    return NextResponse.json(
      { error: "Failed to fetch session" },
      { status: 500 },
    );
  }
}
