import { NextResponse } from "next/server";
import { PODH_AUTH_COOKIE, podhApiUrl } from "@/lib/podh-api";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { code?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Payload login tidak valid." },
      { status: 400 },
    );
  }

  if (!body.code) {
    return NextResponse.json(
      { message: "Kode login tidak ditemukan." },
      { status: 400 },
    );
  }

  const backend = await fetch(podhApiUrl("/auth/exchange"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: body.code }),
    cache: "no-store",
  });

  const data = await backend.json().catch(() => ({
    message: "Respons backend tidak dapat dibaca.",
  }));

  if (!backend.ok) {
    return NextResponse.json(data, { status: backend.status });
  }

  const token = typeof data?.token === "string" ? data.token : "";

  if (!token) {
    return NextResponse.json(
      { message: "Backend tidak mengembalikan token sesi." },
      { status: 502 },
    );
  }

  const response = NextResponse.json({
    user: data.user ?? null,
  });

  response.cookies.set({
    name: PODH_AUTH_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
