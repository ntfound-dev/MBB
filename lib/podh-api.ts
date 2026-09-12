import "server-only";

export const PODH_AUTH_COOKIE = "podh_access_token";

export function podhApiUrl(path = "") {
  const base = (
    process.env.PODH_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://127.0.0.1:8000/api"
  ).replace(/\/+$/, "");

  const suffix = path ? `/${path.replace(/^\/+/, "")}` : "";

  return `${base}${suffix}`;
}
