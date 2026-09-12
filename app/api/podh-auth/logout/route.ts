import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { PODH_AUTH_COOKIE, podhApiUrl } from "@/lib/podh-api";

export const runtime = "nodejs";

export async function POST() {
  const store = await cookies();
  const token = store.get(PODH_AUTH_COOKIE)?.value;

  if (token) {
    await fetch(podhApiUrl("/auth/logout"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }).catch(() => null);
  }

  const response = NextResponse.json({ message: "Logout berhasil." });

  response.cookies.set({
    name: PODH_AUTH_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
