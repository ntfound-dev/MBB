import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { PODH_AUTH_COOKIE, podhApiUrl } from "@/lib/podh-api";

export const runtime = "nodejs";

export async function GET() {
  const token = (await cookies()).get(PODH_AUTH_COOKIE)?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Belum masuk ke akun PODH." },
      { status: 401 },
    );
  }

  const backend = await fetch(podhApiUrl("/me"), {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const data = await backend.json().catch(() => ({
    message: "Respons backend tidak dapat dibaca.",
  }));

  return NextResponse.json(data, { status: backend.status });
}
