import assert from "node:assert/strict";
import { afterEach, test } from "node:test";

process.env.SUPABASE_URL = "https://academy-test.supabase.co";
process.env.SUPABASE_ANON_KEY = "test-anon-key";
process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key";
process.env.ADMIN_USER_IDS = "allowed-user";

const { admin } = await import("../api/_lib/supabase.js");
const { default: licensesHandler } = await import("../api/admin/licenses.js");
const { default: configHandler } = await import("../api/admin/config.js");
const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

function request(token = "") {
  return { headers: token ? { authorization: `Bearer ${token}` } : {} };
}

function response() {
  return {
    statusCode: 0,
    headers: {},
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    setHeader(name, value) {
      this.headers[name] = value;
      return this;
    },
    send(body) {
      this.body = JSON.parse(body);
      return this;
    },
  };
}

test("admin authorization rejects a missing bearer token without a request", async () => {
  let fetchCalled = false;
  globalThis.fetch = async () => {
    fetchCalled = true;
    throw new Error("Unexpected request");
  };

  assert.equal(await admin(request()), false);
  assert.equal(fetchCalled, false);
});

test("admin authorization accepts an authenticated allowlisted user", async () => {
  globalThis.fetch = async (url, options) => {
    assert.equal(url, "https://academy-test.supabase.co/auth/v1/user");
    assert.equal(options.headers.apikey, "test-anon-key");
    assert.equal(options.headers.Authorization, "Bearer valid-token");
    return new Response(JSON.stringify({ id: "allowed-user" }), {
      status: 200,
    });
  };

  assert.equal(await admin(request("valid-token")), true);
});

test("admin authorization rejects an authenticated user outside the allowlist", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ id: "other-user" }), { status: 200 });

  assert.equal(await admin(request("valid-token")), false);
});

test("admin authorization propagates authentication service failures", async () => {
  globalThis.fetch = async () => {
    throw new Error("Authentication service unavailable");
  };

  await assert.rejects(
    admin(request("valid-token")),
    /Authentication service unavailable/,
  );
});

test("license status changes reject invalid statuses before database access", async () => {
  let databaseCalled = false;
  globalThis.fetch = async (url) => {
    if (url.endsWith("/auth/v1/user")) {
      return new Response(JSON.stringify({ id: "allowed-user" }), {
        status: 200,
      });
    }
    databaseCalled = true;
    throw new Error("Database should not be called");
  };

  const res = response();
  await licensesHandler(
    {
      method: "PATCH",
      headers: { authorization: "Bearer valid-token" },
      body: {
        licenseId: "123e4567-e89b-12d3-a456-426614174000",
        status: "bad",
      },
    },
    res,
  );

  assert.equal(res.statusCode, 400);
  assert.equal(databaseCalled, false);
});

test("license status changes return only safe license fields", async () => {
  globalThis.fetch = async (url, options) => {
    if (url.endsWith("/auth/v1/user")) {
      return new Response(JSON.stringify({ id: "allowed-user" }), {
        status: 200,
      });
    }
    assert.match(url, /select=id,customer_label,status,activated_at$/);
    assert.deepEqual(JSON.parse(options.body), { status: "suspended" });
    return new Response(
      JSON.stringify([
        {
          id: "123e4567-e89b-12d3-a456-426614174000",
          customer_label: "Test customer",
          status: "suspended",
          activated_at: null,
        },
      ]),
      { status: 200 },
    );
  };

  const res = response();
  await licensesHandler(
    {
      method: "PATCH",
      headers: { authorization: "Bearer valid-token" },
      body: {
        licenseId: "123e4567-e89b-12d3-a456-426614174000",
        status: "suspended",
      },
    },
    res,
  );

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.license.status, "suspended");
  assert.deepEqual(Object.keys(res.body.license).sort(), [
    "activated_at",
    "customer_label",
    "id",
    "status",
  ]);
});

test("admin configuration publishes only the public Supabase settings", () => {
  const res = response();
  configHandler({ method: "GET" }, res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, {
    supabaseUrl: "https://academy-test.supabase.co",
    supabaseAnonKey: "test-anon-key",
  });
  assert.equal("SUPABASE_SERVICE_ROLE_KEY" in res.body, false);
  assert.equal(res.headers["Cache-Control"], "no-store");
});
