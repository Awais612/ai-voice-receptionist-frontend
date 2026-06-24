"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

/** Auth-aware nav actions: shows Log in when logged out, the user's name +
 *  Log out when logged in. Always shows the Call Ava button. */
export function NavAuth() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="flex items-center gap-4 sm:gap-7 text-sm">
      <a href="#services" className="hidden sm:inline hover:text-orange">
        Services
      </a>
      <a href="#how" className="hidden sm:inline hover:text-orange">
        How it works
      </a>

      {/* Avoid a flash of the wrong state while auth is resolving */}
      {!loading &&
        (user ? (
          <>
            <span className="hidden sm:inline text-ink/70">
              Hi, <strong>{user.name}</strong>
            </span>
            <button
              onClick={() => logout().then(() => router.refresh())}
              className="hidden sm:inline font-display font-bold hover:text-orange"
            >
              Log out
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="hidden sm:inline font-display font-bold hover:text-orange"
          >
            Log in
          </Link>
        ))}

      <Link
        href="/call"
        className="bold-btn bg-lime font-display font-bold px-5 py-2.5"
      >
        Call Ava →
      </Link>
    </div>
  );
}
