"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
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
    initializing: "Warming up…",
    listening: "Listening",
    thinking: "Thinking…",
    speaking: "Speaking",
  };

  const stateColor: Record<string, string> = {
    listening: "text-forest",
    thinking: "text-orange",
    speaking: "text-ink",
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <div
        className={`font-display font-bold text-2xl ${stateColor[state] ?? "text-ink/60"}`}
      >
        Ava is {stateLabel[state] ?? state}
      </div>
      <div className="w-full max-w-sm h-20 bg-ink bold-card p-3">
        <BarVisualizer
          state={state}
          trackRef={audioTrack}
          barCount={20}
          options={{ minHeight: 8 }}
        />
      </div>
      <RoomAudioRenderer />
      <StartAudio
        label="▶ Click to enable audio"
        className="font-display font-bold text-sm text-orange underline underline-offset-4"
      />
    </div>
  );
}

export default function CallPage() {
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

  const endCall = useCallback(() => setToken(null), []);

  return (
    <main className="flex-1 flex flex-col items-center px-5 py-10 sm:py-16 gap-8">
      <Link
        href="/"
        className="self-start font-display font-bold text-sm text-ink/70 hover:text-orange"
      >
        ← Back to shop
      </Link>

      <div className="text-center max-w-xl">
        <p className="font-display font-bold bg-lime inline-block px-3 py-1 text-xs mb-4 bold-card border-2! rounded-full">
          Service desk
        </p>
        <h1 className="font-display font-black text-5xl sm:text-6xl tracking-tight">
          Talk to Ava
        </h1>
        <p className="mt-3 text-ink/80 text-base sm:text-lg">
          Your AI service writer. Speak naturally to book, check, or cancel an
          appointment.
        </p>
      </div>

      <div className="bold-card bg-paper p-5 max-w-md w-full">
        <p className="font-display font-bold text-sm text-ink/70 mb-3 border-b-2 border-ink pb-2">
          Try saying…
        </p>
        <ul className="space-y-2">
          {EXAMPLE_PHRASES.map((phrase) => (
            <li key={phrase} className="text-ink/90 text-sm flex gap-2">
              <span className="text-orange font-bold">»</span>
              <span>&ldquo;{phrase}&rdquo;</span>
            </li>
          ))}
        </ul>
      </div>

      {!token ? (
        <div className="flex flex-col items-center gap-3">
          {error && (
            <p className="font-display font-bold text-orange text-sm">{error}</p>
          )}
          <button
            onClick={startCall}
            disabled={loading}
            className="bold-btn bg-ink text-cream font-display font-bold text-xl px-10 py-4 disabled:opacity-60"
          >
            {loading ? "Connecting…" : "🔧 Start call"}
          </button>
        </div>
      ) : (
        <LiveKitRoom
          token={token}
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
          connect
          audio
          video={false}
          className="w-full max-w-md flex flex-col items-center gap-7"
        >
          <CallUI />
          <button
            onClick={endCall}
            className="bold-btn bg-orange font-display font-bold text-lg px-8 py-3"
          >
            ✕ End call
          </button>
        </LiveKitRoom>
      )}
    </main>
  );
}
