const $ = (id) => document.getElementById(id);
const SESSION_KEY = "abed_academy_admin_session";
const LICENSE_STATUSES = ["active", "suspended", "revoked"];
let config;
let session;

function showMessage(message = "") {
  $("message").textContent = message;
}

function saveSession(value) {
  session = value;
  if (value) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(value));
  } else {
    sessionStorage.removeItem(SESSION_KEY);
  }
}

async function readResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      data.error_description || data.msg || data.error || "Request failed.",
    );
  }
  return data;
}

async function authRequest(path, body) {
  const response = await fetch(`${config.supabaseUrl}/auth/v1/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: config.supabaseAnonKey,
    },
    body: JSON.stringify(body),
  });
  return readResponse(response);
}

async function refreshSession() {
  if (!session?.refresh_token) return null;
  try {
    const refreshed = await authRequest("token?grant_type=refresh_token", {
      refresh_token: session.refresh_token,
    });
    const nextSession = {
      ...refreshed,
      expires_at: Date.now() + refreshed.expires_in * 1000,
    };
    saveSession(nextSession);
    return nextSession;
  } catch (error) {
    saveSession(null);
    throw new Error(`Could not refresh the admin session: ${error.message}`);
  }
}

async function validSession() {
  if (!session) return null;
  if (session.expires_at <= Date.now() + 60_000) {
    return refreshSession();
  }
  return session;
}

async function call(path, method = "GET", body) {
  const activeSession = await validSession();
  if (!activeSession) throw new Error("Please sign in again.");

  const response = await fetch(path, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${activeSession.access_token}`,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  return readResponse(response);
}

function setSignedIn(signedIn) {
  $("login-form").classList.toggle("hidden", signedIn);
  $("admin-tools").classList.toggle("hidden", !signedIn);
}

function createLicenseCard(license) {
  const card = document.createElement("div");
  card.className = "callout";

  const customer = document.createElement("strong");
  customer.textContent = license.customer_label || "Customer";
  card.append(customer, document.createElement("br"));

  const details = document.createElement("small");
  details.textContent = `${license.id} · ${license.status} · ${
    license.activated_at ? "Activated" : "Not activated"
  }`;
  card.append(details, document.createElement("br"));

  const statusLabel = document.createElement("label");
  statusLabel.textContent = "License status ";
  const statusSelect = document.createElement("select");
  statusSelect.setAttribute("aria-label", "License status");
  for (const status of LICENSE_STATUSES) {
    const option = document.createElement("option");
    option.value = status;
    option.textContent = status;
    option.selected = status === license.status;
    statusSelect.append(option);
  }
  statusLabel.append(statusSelect);
  card.append(statusLabel, document.createElement("br"));

  const updateButton = document.createElement("button");
  updateButton.className = "ghost";
  updateButton.type = "button";
  updateButton.textContent = "Update status";
  updateButton.addEventListener("click", async () => {
    try {
      await call("/api/admin/licenses", "PATCH", {
        licenseId: license.id,
        status: statusSelect.value,
      });
      await refresh();
    } catch (error) {
      showMessage(error.message);
    }
  });
  card.append(updateButton);

  const resetButton = document.createElement("button");
  resetButton.className = "ghost";
  resetButton.type = "button";
  resetButton.textContent = "Reset device";
  resetButton.addEventListener("click", async () => {
    if (
      !confirm(
        "Reset this license's device binding? The customer will need to activate again.",
      )
    ) {
      return;
    }
    try {
      await call("/api/admin/reset-device", "POST", {
        licenseId: license.id,
      });
      await refresh();
    } catch (error) {
      showMessage(error.message);
    }
  });
  card.append(document.createTextNode(" "), resetButton);

  return card;
}

async function refresh() {
  try {
    const data = await call("/api/admin/licenses");
    const container = $("licenses");
    container.replaceChildren();
    if (!data.licenses.length) {
      container.textContent = "No licenses yet.";
      return;
    }
    for (const license of data.licenses) {
      container.append(createLicenseCard(license));
    }
    showMessage("");
  } catch (error) {
    showMessage(error.message);
  }
}

$("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const button = $("sign-in");
  button.disabled = true;
  showMessage("");
  try {
    const result = await authRequest("token?grant_type=password", {
      email: $("email").value.trim(),
      password: $("password").value,
    });
    saveSession({
      ...result,
      expires_at: Date.now() + result.expires_in * 1000,
    });
    await call("/api/admin/licenses");
    setSignedIn(true);
    $("password").value = "";
    await refresh();
  } catch (error) {
    saveSession(null);
    setSignedIn(false);
    showMessage(error.message);
  } finally {
    button.disabled = false;
  }
});

$("create").addEventListener("click", async () => {
  const button = $("create");
  button.disabled = true;
  try {
    const data = await call("/api/admin/licenses", "POST", {
      customerLabel: $("customer").value,
    });
    $("new-code").classList.remove("hidden");
    $("new-code").textContent =
      "New activation code (copy and send once): " + data.activationCode;
    showMessage("");
    await refresh();
  } catch (error) {
    showMessage(error.message);
  } finally {
    button.disabled = false;
  }
});

$("refresh").addEventListener("click", refresh);
$("sign-out").addEventListener("click", async () => {
  const activeSession = await validSession();
  saveSession(null);
  setSignedIn(false);
  $("licenses").replaceChildren();
  $("new-code").classList.add("hidden");
  if (!activeSession) return;

  try {
    const response = await fetch(`${config.supabaseUrl}/auth/v1/logout`, {
      method: "POST",
      headers: {
        apikey: config.supabaseAnonKey,
        Authorization: `Bearer ${activeSession.access_token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Supabase did not confirm the server sign-out.");
    }
  } catch (error) {
    showMessage(`Signed out locally; server sign-out failed: ${error.message}`);
  }
});

async function initialize() {
  try {
    const response = await fetch("/api/admin/config", {
      cache: "no-store",
    });
    config = await readResponse(response);

    const storedSession = sessionStorage.getItem(SESSION_KEY);
    if (storedSession) {
      try {
        session = JSON.parse(storedSession);
      } catch {
        saveSession(null);
      }
    }

    if (await validSession()) {
      await call("/api/admin/licenses");
      setSignedIn(true);
      await refresh();
    }
  } catch (error) {
    saveSession(null);
    showMessage(error.message);
  }
}

initialize();
