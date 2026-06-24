"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Formik, Form } from "formik";
import { useAuth } from "@/lib/auth-context";
import { loginSchema } from "@/lib/validation";
import { TextField } from "@/components/TextField";
import { PasswordField } from "@/components/PasswordField";

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/call";
  const [serverError, setServerError] = useState<string | null>(null);

  return (
    <main className="flex-1 flex items-center justify-center px-5 py-16">
      <div className="bold-card bg-paper p-7 sm:p-9 w-full max-w-md">
        <h1 className="font-display font-black text-4xl tracking-tight">
          Welcome back
        </h1>
        <p className="mt-2 text-ink/70 text-sm">
          Sign in to call Ava and book your appointment.
        </p>

        {serverError && (
          <p className="mt-5 bg-orange/20 border-2 border-orange text-ink font-bold text-sm rounded-xl px-4 py-2">
            {serverError}
          </p>
        )}

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setServerError(null);
            try {
              await login(values.email, values.password);
              router.push(next);
            } catch (err) {
              setServerError(err instanceof Error ? err.message : "Login failed");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="mt-6 flex flex-col gap-4">
              <TextField name="email" label="Email" type="email" autoComplete="email" />
              <PasswordField
                name="password"
                label="Password"
                autoComplete="current-password"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bold-btn bg-ink text-cream font-display font-bold text-lg px-6 py-3 mt-2 disabled:opacity-60"
              >
                {isSubmitting ? "Signing in…" : "Sign in →"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-6 text-sm text-ink/70">
          No account?{" "}
          <Link href="/register" className="font-bold text-ink underline hover:text-orange">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="flex-1" />}>
      <LoginForm />
    </Suspense>
  );
}
