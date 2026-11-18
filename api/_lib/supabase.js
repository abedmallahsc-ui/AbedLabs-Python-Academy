const base = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
export async function db(path, options = {}) {
  if (!base || !key) throw new Error("Server database is not configured.");
  const response = await fetch(`${base}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(options.headers || {}),
    },
  });
  const body = await response.text();
  if (!response.ok)
    throw new Error(`Database request failed (${response.status}): ${body}`);
  return body ? JSON.parse(body) : [];
}
export async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(hash)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
export function json(res, status, body) {
  res
    .status(status)
    .setHeader("Content-Type", "application/json")
    .send(JSON.stringify(body));
}
export function bearer(req) {
  const h = req.headers.authorization || "";
  return h.startsWith("Bearer ") ? h.slice(7) : "";
}
export async function admin(req) {
  const token = bearer(req);
  const allowedUserIds = (process.env.ADMIN_USER_IDS || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  if (!token || !allowedUserIds.length) return false;
  if (!base || !process.env.SUPABASE_ANON_KEY) {
    throw new Error("Admin authentication is not configured.");
  }

  const response = await fetch(`${base}/auth/v1/user`, {
    headers: {
      apikey: process.env.SUPABASE_ANON_KEY,
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) return false;

  const user = await response.json();
  return typeof user.id === "string" && allowedUserIds.includes(user.id);
}
