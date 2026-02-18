import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sessions = await sql`
      SELECT id, fellow_name, group_id, date, status
      FROM sessions
      ORDER BY date DESC
    `;

    return NextResponse.json(sessions);
  } catch (err) {
    console.error("Failed to fetch sessions:", err);
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 });
  }
}