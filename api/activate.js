import { db, sha256, json } from "./_lib/supabase.js";
function code() {
  return (
    "ABED-" +
    crypto.randomUUID().replaceAll("-", "").slice(0, 4).toUpperCase() +
    "-" +
    crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase()
  );
}
export default async function handler(req, res) {
  if (req.method !== "POST")
    return json(res, 405, { error: "Method not allowed" });
  try {
    const raw = String(req.body?.code || "")
      .trim()
      .toUpperCase();
    if (!raw) return json(res, 400, { error: "Enter your activation code." });
    const hash = await sha256(raw);
    const rows = await db(
      `licenses?license_key_hash=eq.${hash}&select=id,status,device_token_hash,completed_lessons`,
    );
    const license = rows[0];
    if (!license || license.status !== "active")
      return json(res, 403, { error: "Invalid or inactive activation code." });
    if (license.device_token_hash)
      return json(res, 409, {
        error:
          "This license has already been activated. Contact ABED LABS for a device reset.",
      });
    const deviceToken = crypto.randomUUID() + crypto.randomUUID();
    const updated = await db(
      `licenses?id=eq.${license.id}&device_token_hash=is.null`,
      {
        method: "PATCH",
        body: JSON.stringify({
          device_token_hash: await sha256(deviceToken),
          activated_at: new Date().toISOString(),
        }),
      },
    );
    if (!updated.length)
      return json(res, 409, {
        error:
          "This license was activated on another device. Contact ABED LABS.",
      });
    return json(res, 200, {
      deviceToken,
      completed: license.completed_lessons || [],
    });
  } catch (e) {
    return json(res, 500, { error: "Activation service unavailable." });
  }
}
