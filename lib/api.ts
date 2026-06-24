const base = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function getToken(): Promise<{ token: string; room: string }> {
  const res = await fetch(`${base}/livekit/token`, { method: "POST" });
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
