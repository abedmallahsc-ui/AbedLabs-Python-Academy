import { db, json, admin } from "../_lib/supabase.js";
export default async function handler(req, res) {
  if (req.method !== "POST")
    return json(res, 405, { error: "Method not allowed" });
  try {
    if (!(await admin(req)))
      return json(res, 401, { error: "Admin authorization required." });

    const id = String(req.body?.licenseId || "");
    if (!id) return json(res, 400, { error: "License ID is required." });
    const rows = await db(`licenses?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify({ device_token_hash: null, activated_at: null }),
    });
    if (!rows.length) return json(res, 404, { error: "License not found." });
    return json(res, 200, {
      ok: true,
      message: "Device binding reset. The customer can activate again.",
    });
  } catch (e) {
    return json(res, 500, { error: "Could not reset device." });
  }
}
