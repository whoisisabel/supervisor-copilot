import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sql } from "@/lib/db";
import { LoginSchema } from "@/lib/validation/loginSchema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 },
      );
    }

    const { email, password } = parsed.data;

    const result = await sql`
      SELECT id, name, email, password_hash
      FROM supervisors
      WHERE email = ${email}
    `;

    let supervisor = result[0];

    if (!supervisor) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const addResult = await sql`
        INSERT INTO supervisors (email, password_hash, name)
        VALUES (${email}, ${hashedPassword}, ${email.split("@")[0]})
        ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
        RETURNING id, name, email, password_hash
      `;

      supervisor = addResult[0];
    }

    const passwordValid = await bcrypt.compare(
      password,
      supervisor.password_hash,
    );
    if (!passwordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ success: true });

    const cookiePayload = {
      id: supervisor.id,
      name: supervisor.name,
      email: supervisor.email,
    };

    response.cookies.set("supervisorId", JSON.stringify(cookiePayload), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("LOGIN_ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
