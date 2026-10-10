import { cookies } from "next/headers";

export const ADMIN_PASS = process.env.ADMIN_PASSWORD || "NaplesAdmin2026!";
export const SESSION_SECRET = "naples_auth_token_983192";

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === SESSION_SECRET;
}
