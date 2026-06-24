"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { getBookings } from "@/lib/api";

type Appointment = {
  id: string;
  date: string;
  time: string;
  callerName: string;
  vehicle: string;
  service: string;
  status: string;
  confirmationCode: string;
};

const STATUS_OPTIONS = ["", "booked", "cancelled", "rescheduled", "completed"];

export default function AdminPage() {
  const [pw, setPw] = useState("");
  const [authed, setAuthed] = useState(false);
  const [bookings, setBookings] = useState<Appointment[]>([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await getBookings(pw, status || undefined);
      setBookings(data);
      setError(null);
    } catch {
      setError("Wrong password or backend unreachable.");
      setAuthed(false);
    }
  }, [pw, status]);

  useEffect(() => {
    if (!authed) return;
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, [authed, load]);

  if (!authed) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
        <div className="bg-gray-900 rounded-xl p-8 flex flex-col gap-4 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-center">Admin Dashboard</h1>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <input
            type="password"
            placeholder="Admin password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setAuthed(true)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setAuthed(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg transition"
          >
            Sign In
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Bookings</h1>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s || "All statuses"}</option>
            ))}
          </select>
        </div>

        {bookings.length === 0 ? (
          <p className="text-gray-400">No bookings found.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-800">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-900 text-gray-400 uppercase text-xs">
                <tr>
                  {["Date", "Time", "Caller", "Vehicle", "Service", "Status", "Code", ""].map((h) => (
                    <th key={h} className="px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-t border-gray-800 hover:bg-gray-900 transition">
                    <td className="px-4 py-3">{b.date}</td>
                    <td className="px-4 py-3">{b.time}</td>
                    <td className="px-4 py-3 font-medium">{b.callerName}</td>
                    <td className="px-4 py-3 text-gray-400">{b.vehicle}</td>
                    <td className="px-4 py-3">{b.service}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        b.status === "booked" ? "bg-green-900 text-green-300" :
                        b.status === "cancelled" ? "bg-red-900 text-red-300" :
                        b.status === "rescheduled" ? "bg-yellow-900 text-yellow-300" :
                        "bg-gray-700 text-gray-300"
                      }`}>{b.status}</span>
                    </td>
                    <td className="px-4 py-3 font-mono text-blue-400">{b.confirmationCode}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/sessions?highlight=${b.id}&pw=${encodeURIComponent(pw)}`}
                        className="text-blue-400 hover:underline text-xs"
                      >
                        Sessions →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
