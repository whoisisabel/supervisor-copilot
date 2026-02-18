import { cookies } from "next/headers";

export async function requireSupervisor() {
  const cookieStore = await cookies();
  const id = cookieStore.get("supervisorId")?.value;
  if (!id) throw new Error("Unauthorized");
  return Number(id);
}