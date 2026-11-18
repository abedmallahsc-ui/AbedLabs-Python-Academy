import { db, sha256, bearer, json } from "./_lib/supabase.js";
export default async function handler(req, res) {
  if (req.method !== "POST")
    return json(res, 405, { error: "Method not allowed" });
  try {
    const token = bearer(req);
    if (!token)
      return json(res, 401, { error: "Device authorization required." });
    const rows = await db(
      `licenses?device_token_hash=eq.${await sha256(token)}&status=eq.active&select=id`,
    );
    if (!rows[0])
      return json(res, 403, { error: "This device is not authorized." });
    const completed = Array.isArray(req.body?.completed)
      ? req.body.completed
          .filter(
            (x) =>
              typeof x === "string" &&
              /^v3-(?:0[1-9]|[12]\d|3[0-9])$/.test(x),
          )
          .slice(0, 100)
      : [];
    await db(`licenses?id=eq.${rows[0].id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed_lessons: completed,
        updated_at: new Date().toISOString(),
      }),
    });
    return json(res, 200, { ok: true });
  } catch (e) {
    return json(res, 500, { error: "Could not save progress." });
  }
}
