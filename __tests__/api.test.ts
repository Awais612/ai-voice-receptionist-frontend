import { describe, it, expect, vi, beforeEach } from "vitest";

// Stub env before importing the module
vi.stubEnv("NEXT_PUBLIC_API_URL", "http://api");

const { getToken, getBookings, getSession } = await import("../lib/api");

describe("api helpers", () => {
  beforeEach(() => vi.clearAllMocks());

  it("getToken POSTs to /livekit/token and returns token+room", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ token: "tok", room: "demo-1" }),
    }) as unknown as typeof fetch;
    const r = await getToken();
    expect(r.token).toBe("tok");
    expect(r.room).toBe("demo-1");
    expect((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][0]).toBe("http://api/livekit/token");
  });

  it("getBookings sends x-admin-password header", async () => {
    const f = vi.fn().mockResolvedValue({ ok: true, json: async () => [] });
    global.fetch = f as unknown as typeof fetch;
    await getBookings("secret");
    expect(f.mock.calls[0][1].headers["x-admin-password"]).toBe("secret");
  });

  it("getBookings appends status query param when provided", async () => {
    const f = vi.fn().mockResolvedValue({ ok: true, json: async () => [] });
    global.fetch = f as unknown as typeof fetch;
    await getBookings("secret", "booked");
    expect(f.mock.calls[0][0]).toBe("http://api/admin/bookings?status=booked");
  });

  it("getSession GETs the correct session URL", async () => {
    const f = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ id: "s1" }) });
    global.fetch = f as unknown as typeof fetch;
    await getSession("secret", "s1");
    expect(f.mock.calls[0][0]).toBe("http://api/admin/sessions/s1");
  });
});
