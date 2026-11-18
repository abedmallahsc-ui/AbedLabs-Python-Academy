import { json } from "../_lib/supabase.js";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return json(res, 405, { error: "Method not allowed." });
  }

  const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return json(res, 500, {
      error:
        "Admin sign-in is not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY in Vercel, then redeploy.",
    });
  }

  res.setHeader("Cache-Control", "no-store");
  return json(res, 200, {
    supabaseUrl: SUPABASE_URL,
    supabaseAnonKey: SUPABASE_ANON_KEY,
  });
}
