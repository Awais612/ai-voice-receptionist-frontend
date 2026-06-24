"use client";

import { useState, useCallback } from "react";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  StartAudio,
  useVoiceAssistant,
  BarVisualizer,
} from "@livekit/components-react";
import { getToken } from "@/lib/api";

const EXAMPLE_PHRASES = [
  "I'd like to book an oil change for Friday",
  "What appointment times are available tomorrow?",
  "Cancel my appointment AC-1234",
];

function CallUI() {
  const { state, audioTrack } = useVoiceAssistant();

  const stateLabel: Record<string, string> = {
    disconnected: "Idle",
    connecting: "Connecting…",
    initializing: "Starting…",
    listening: "Listening",
    thinking: "Thinking…",
    speaking: "Speaking",
  };

  const stateColor: Record<string, string> = {
    listening: "text-green-400",
    thinking: "text-yellow-400",
    speaking: "text-blue-400",
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className={`text-lg font-semibold ${stateColor[state] ?? "text-gray-400"}`}>
        Ava is {stateLabel[state] ?? state}
      </div>
      <div className="w-full max-w-sm h-16">
        <BarVisualizer state={state} trackRef={audioTrack} barCount={20} />
      </div>
      <RoomAudioRenderer />
      {/* Shows only when the browser blocks autoplay; click unlocks audio. */}
      <StartAudio
        label="Click to enable audio"
        className="text-sm text-blue-400 underline"
      />
    </div>
  );
}

export default function DemoPage() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCall = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getToken();
      setToken(data.token);
    } catch {
      setError("Could not connect. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, []);

  const endCall = useCallback(() => {
    setToken(null);
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center px-4 py-12 gap-10">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-2">AutoCare Auto Repair</h1>
        <p className="text-gray-400 text-lg">
          AI Voice Receptionist — speak naturally to book, check, or cancel a car repair appointment.
        </p>
      </div>

      <div className="bg-gray-900 rounded-xl p-5 max-w-md w-full">
        <p className="text-sm text-gray-400 font-semibold mb-3 uppercase tracking-wide">Try saying…</p>
        <ul className="space-y-2">
          {EXAMPLE_PHRASES.map((phrase) => (
            <li key={phrase} className="text-gray-200 text-sm flex gap-2">
              <span className="text-blue-400">›</span>
              <span>&ldquo;{phrase}&rdquo;</span>
            </li>
          ))}
        </ul>
      </div>

      {!token ? (
        <div className="flex flex-col items-center gap-3">
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            onClick={startCall}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold px-8 py-3 rounded-full text-lg transition"
          >
            {loading ? "Connecting…" : "Start Call"}
          </button>
        </div>
      ) : (
        <LiveKitRoom
          token={token}
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
          connect
          audio
          video={false}
          className="w-full max-w-md flex flex-col items-center gap-6"
        >
          <CallUI />
          <button
            onClick={endCall}
            className="bg-red-600 hover:bg-red-500 text-white font-semibold px-8 py-3 rounded-full text-lg transition"
          >
            End Call
          </button>
        </LiveKitRoom>
      )}
    </main>
  );
}
