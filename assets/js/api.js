const jsonHeaders = { "Content-Type": "application/json" };
async function request(path, body, token) {
  const response = await fetch(path, {
    method: "POST",
    headers: {
      ...jsonHeaders,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body || {}),
  });
  const data = await response
    .json()
    .catch(() => ({ error: "Unexpected server response" }));
  if (!response.ok) throw new Error(data.error || "Request failed");
  return data;
}
export const api = {
  activate: (code) => request("/api/activate", { code }),
  verify: (token) => request("/api/verify", {}, token),
  progress: (token, completed) =>
    request("/api/progress", { completed }, token),
};
