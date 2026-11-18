import { db, sha256, bearer, json } from "./_lib/supabase.js";
export default async function handler(req, res) {
  if (req.method !== "POST")
    return json(res, 405, { error: "Method not allowed" });
  try {
    const token = bearer(req);
    if (!token)
      return json(res, 401, { error: "Device authorization required." });
    const rows = await db(
      `licenses?device_token_hash=eq.${await sha256(token)}&select=id,status,completed_lessons`,
    );
    const l = rows[0];
    if (!l || l.status !== "active")
      return json(res, 403, { error: "This device is not authorized." });
    return json(res, 200, { completed: l.completed_lessons || [] });
  } catch (e) {
    return json(res, 500, { error: "Verification service unavailable." });
  }
}
