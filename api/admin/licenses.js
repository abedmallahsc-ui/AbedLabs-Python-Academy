import { db, sha256, json, admin } from "../_lib/supabase.js";
export default async function handler(req, res) {
  try {
    if (!(await admin(req)))
      return json(res, 401, { error: "Admin authorization required." });

    if (req.method === "GET") {
      const rows = await db(
        "licenses?select=id,customer_label,status,created_at,activated_at&order=created_at.desc",
      );
      return json(res, 200, { licenses: rows });
    }
    if (req.method === "POST") {
      const label = String(req.body?.customerLabel || "").slice(0, 100);
      const activationCode =
        "ABED-" +
        crypto.randomUUID().replaceAll("-", "").slice(0, 4).toUpperCase() +
        "-" +
        crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase();
      const rows = await db("licenses", {
        method: "POST",
        body: JSON.stringify({
          license_key_hash: await sha256(activationCode),
          customer_label: label,
          status: "active",
        }),
      });
      return json(res, 201, {
        license: {
          id: rows[0].id,
          customer_label: rows[0].customer_label,
          status: rows[0].status,
        },
        activationCode,
      });
    }

    if (req.method === "PATCH") {
      const id = String(req.body?.licenseId || "");
      const status = String(req.body?.status || "");
      if (!/^[0-9a-f-]{36}$/i.test(id)) {
        return json(res, 400, { error: "A valid license ID is required." });
      }
      if (!["active", "suspended", "revoked"].includes(status)) {
        return json(res, 400, { error: "A valid license status is required." });
      }

      const rows = await db(
        `licenses?id=eq.${encodeURIComponent(id)}&select=id,customer_label,status,activated_at`,
        {
          method: "PATCH",
          body: JSON.stringify({ status }),
        },
      );
      if (!rows.length) return json(res, 404, { error: "License not found." });
      return json(res, 200, { license: rows[0] });
    }

    return json(res, 405, { error: "Method not allowed." });
  } catch (e) {
    console.error(
      "Admin license request failed:",
      e instanceof Error ? e.message : String(e),
    );
    return json(res, 500, { error: "Admin request failed." });
  }
}
