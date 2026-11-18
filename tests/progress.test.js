import assert from "node:assert/strict";
import { afterEach, test } from "node:test";

process.env.SUPABASE_URL = "https://academy-test.supabase.co";
process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key";

const { default: saveProgress } = await import("../api/progress.js");
const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

function response() {
  return {
    statusCode: 0,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    setHeader() {
      return this;
    },
    send(body) {
      this.body = JSON.parse(body);
      return this;
    },
  };
}

test("progress accepts only IDs from the 39-lesson course version", async () => {
  let saved;
  globalThis.fetch = async (url, options) => {
    if (options.method === "PATCH") {
      saved = JSON.parse(options.body).completed_lessons;
      return new Response(JSON.stringify([{ id: "license-id" }]), {
        status: 200,
      });
    }
    return new Response(JSON.stringify([{ id: "license-id" }]), {
      status: 200,
    });
  };

  const res = response();
  await saveProgress(
    {
      method: "POST",
      headers: { authorization: "Bearer device-token" },
      body: {
        completed: [
          "01",
          "v2-01",
          "v3-01",
          "v3-24",
          "v3-25",
          "v3-39",
          "v3-40",
          "v3-00",
          2,
        ],
      },
    },
    res,
  );

  assert.equal(res.statusCode, 200);
  assert.deepEqual(saved, ["v3-01", "v3-24", "v3-25", "v3-39"]);
});
