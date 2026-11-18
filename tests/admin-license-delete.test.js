import assert from "node:assert/strict";
import { afterEach, test } from "node:test";

process.env.SUPABASE_URL = "https://academy-test.supabase.co";
process.env.SUPABASE_ANON_KEY = "test-anon-key";
process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key";
process.env.ADMIN_USER_IDS = "allowed-user";

const { default: licensesHandler } = await import("../api/admin/licenses.js");
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

function mockAdminFetch(deleteResponse) {
  let deleteUrl;
  globalThis.fetch = async (url, options) => {
    if (url.endsWith("/auth/v1/user")) {
      return new Response(JSON.stringify({ id: "allowed-user" }), {
        status: 200,
      });
    }
    deleteUrl = url;
    assert.equal(options.method, "DELETE");
    return new Response(deleteResponse, { status: 200 });
  };
  return () => deleteUrl;
}

test("license deletion removes only revoked licenses", async () => {
  const getDeleteUrl = mockAdminFetch(
    JSON.stringify([{ id: "123e4567-e89b-12d3-a456-426614174000" }]),
  );
  const res = response();

  await licensesHandler(
    {
      method: "DELETE",
      headers: { authorization: "Bearer valid-token" },
      body: { licenseId: "123e4567-e89b-12d3-a456-426614174000" },
    },
    res,
  );

  assert.equal(res.statusCode, 200);
  assert.match(getDeleteUrl(), /status=eq\.revoked/);
  assert.deepEqual(res.body, { ok: true });
});

test("license deletion rejects licenses that are not revoked", async () => {
  const getDeleteUrl = mockAdminFetch("[]");
  const res = response();

  await licensesHandler(
    {
      method: "DELETE",
      headers: { authorization: "Bearer valid-token" },
      body: { licenseId: "123e4567-e89b-12d3-a456-426614174000" },
    },
    res,
  );

  assert.equal(res.statusCode, 409);
  assert.match(getDeleteUrl(), /status=eq\.revoked/);
  assert.match(res.body.error, /Only revoked licenses can be deleted/);
});
