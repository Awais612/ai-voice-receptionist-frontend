const base = process.env.NEXT_PUBLIC_API_URL ?? "";

export type AuthUser = { id: string; email: string; name: string };

async function parseError(res: Response, fallback: string): Promise<string> {
  try {
    const body = (await res.json()) as { message?: string | string[] };
    if (Array.isArray(body.message)) return body.message.join(", ");
    return body.message ?? fallback;
  } catch {
    return fallback;
  }
}

export async function register(
  email: string,
  password: string,
  name: string,
): Promise<{ user: AuthUser }> {
  const res = await fetch(`${base}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password, name }),
  });
  if (!res.ok) throw new Error(await parseError(res, "Registration failed"));
  return res.json();
}

export async function login(
  email: string,
  password: string,
): Promise<{ user: AuthUser }> {
  const res = await fetch(`${base}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(await parseError(res, "Login failed"));
  return res.json();
}

export async function logout(): Promise<void> {
  await fetch(`${base}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}

export async function getMe(): Promise<{ user: AuthUser } | null> {
  const res = await fetch(`${base}/auth/me`, { credentials: "include" });
  if (!res.ok) return null;
  return res.json();
}

export async function getToken(): Promise<{ token: string; room: string }> {
  const res = await fetch(`${base}/livekit/token`, {
    method: "POST",
    credentials: "include",
  });
  if (res.status === 401) throw new Error("UNAUTHENTICATED");
  if (!res.ok) throw new Error(`Failed to get token: ${res.status}`);
  return res.json();
}

export async function getBookings(pw: string, status?: string) {
  const q = status ? `?status=${encodeURIComponent(status)}` : "";
  const res = await fetch(`${base}/admin/bookings${q}`, {
    headers: { "x-admin-password": pw },
  });
  if (!res.ok) throw new Error(`Unauthorized or error: ${res.status}`);
  return res.json();
}

export async function getSessions(pw: string) {
  const res = await fetch(`${base}/admin/sessions`, {
    headers: { "x-admin-password": pw },
  });
  if (!res.ok) throw new Error(`Unauthorized or error: ${res.status}`);
  return res.json();
}

export async function getSession(pw: string, id: string) {
  const res = await fetch(`${base}/admin/sessions/${id}`, {
    headers: { "x-admin-password": pw },
  });
  if (!res.ok) throw new Error(`Unauthorized or error: ${res.status}`);
  return res.json();
}
