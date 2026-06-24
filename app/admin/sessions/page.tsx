"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getSessions, getSession } from "@/lib/api";

type Session = {
  id: string;
  roomName: string;
  startedAt: string;
  endedAt?: string;
  outcome: string;
  durationSeconds?: number;
};

type TranscriptEntry = {
  id: string;
  role: "user" | "agent";
  content: string;
  timestamp: string;
};

type SessionWithTranscript = Session & { transcript: TranscriptEntry[] };

export default function SessionsPage() {
  const params = useSearchParams();
  const pw = params.get("pw") ?? "";
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selected, setSelected] = useState<SessionWithTranscript | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pw) return;
    getSessions(pw)
      .then(setSessions)
      .catch(() => setError("Failed to load sessions."));
  }, [pw]);

  const openSession = async (id: string) => {
    try {
      const data = await getSession(pw, id);
      setSelected(data);
    } catch {
      setError("Failed to load session transcript.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin" className="text-gray-400 hover:text-white text-sm">← Bookings</Link>
          <h1 className="text-3xl font-bold">Call Sessions</h1>
        </div>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <div className="flex gap-6">
          {/* Session list */}
          <div className="flex-shrink-0 w-72 flex flex-col gap-2">
            {sessions.length === 0 && <p className="text-gray-400 text-sm">No sessions yet.</p>}
            {sessions.map((s) => (
              <button
                key={s.id}
                onClick={() => openSession(s.id)}
                className={`text-left rounded-xl px-4 py-3 border transition ${
                  selected?.id === s.id
                    ? "bg-blue-900 border-blue-600"
                    : "bg-gray-900 border-gray-800 hover:bg-gray-800"
                }`}
              >
                <div className="text-sm font-medium">{new Date(s.startedAt).toLocaleString()}</div>
                <div className="text-xs text-gray-400 mt-1 flex gap-2">
                  <span className={`px-1.5 py-0.5 rounded-full ${
                    s.outcome === "booked" ? "bg-green-900 text-green-300" :
                    s.outcome === "cancelled" ? "bg-red-900 text-red-300" :
                    "bg-gray-700 text-gray-300"
                  }`}>{s.outcome}</span>
                  {s.durationSeconds != null && <span>{s.durationSeconds}s</span>}
                </div>
              </button>
            ))}
          </div>

          {/* Transcript */}
          {selected && (
            <div className="flex-1 bg-gray-900 rounded-xl p-5 overflow-y-auto max-h-[70vh] flex flex-col gap-3">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Transcript</h2>
              {selected.transcript.map((entry) => (
                <div
                  key={entry.id}
                  className={`flex ${entry.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-xs rounded-xl px-4 py-2 text-sm ${
                    entry.role === "user"
                      ? "bg-blue-700 text-white"
                      : "bg-gray-800 text-gray-200"
                  }`}>
                    <span className="block text-xs opacity-60 mb-1">
                      {entry.role === "user" ? "Caller" : "Ava"}
                    </span>
                    {entry.content}
                  </div>
                </div>
              ))}
              {selected.transcript.length === 0 && (
                <p className="text-gray-500 text-sm">No transcript entries for this session.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
