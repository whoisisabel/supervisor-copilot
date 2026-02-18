import { sql } from "@/lib/db";
import { analyzeSession } from "@/lib/ai/analyzeSession";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();
    const result = await sql`
      SELECT transcript FROM sessions WHERE id = ${sessionId}
    `;

    const transcript = result?.[0]?.transcript;
    if (!transcript) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const analysis = await analyzeSession(transcript);

    await sql`
      INSERT INTO session_analysis (session_id, analysis)
      VALUES (${sessionId}, ${JSON.stringify(analysis)})
    `;

    await sql`
      UPDATE sessions
      SET status = ${analysis.riskDetection.flag}
      WHERE id = ${sessionId}
    `;

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("ANALYSIS_ROUTE_ERROR:", error);

    return NextResponse.json(
      { error: "Analysis failed. Please check server logs." },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId"); 

  const result = await sql`
    SELECT analysis FROM session_analysis WHERE session_id = ${sessionId}
  `;

  if (result.length === 0) {
    return NextResponse.json({ analysis: null }, { status: 404 });
  }

  return NextResponse.json({ analysis: result[0].analysis });
}
