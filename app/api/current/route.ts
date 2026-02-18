import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const rawCookie = cookieStore.get("supervisorId")?.value;

  if (!rawCookie)
    return NextResponse.json({ error: "No session" }, { status: 401 });

  return NextResponse.json(JSON.parse(rawCookie));
}
