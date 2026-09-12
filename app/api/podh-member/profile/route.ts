import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { PODH_AUTH_COOKIE, podhApiUrl } from "@/lib/podh-api";

export const runtime = "nodejs";

async function tokenOrNull() {
  return (await cookies()).get(PODH_AUTH_COOKIE)?.value ?? null;
}

export async function GET() {
  const token = await tokenOrNull();

  if (!token) {
    return NextResponse.json(
      { message: "Belum masuk ke akun PODH." },
      { status: 401 },
    );
  }

  const backend = await fetch(podhApiUrl("/member/profile"), {
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

export async function PUT(request: Request) {
  const token = await tokenOrNull();

  if (!token) {
    return NextResponse.json(
      { message: "Silakan masuk dengan Google terlebih dahulu." },
      { status: 401 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Data anggota tidak valid." },
      { status: 400 },
    );
  }

  const backend = await fetch(podhApiUrl("/member/profile"), {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = await backend.json().catch(() => ({
    message: "Respons backend tidak dapat dibaca.",
  }));

  return NextResponse.json(data, { status: backend.status });
}
