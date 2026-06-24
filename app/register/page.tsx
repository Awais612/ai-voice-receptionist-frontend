"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Formik, Form } from "formik";
import { useAuth } from "@/lib/auth-context";
import { registerSchema } from "@/lib/validation";
import { TextField } from "@/components/TextField";
import { PasswordField } from "@/components/PasswordField";

function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/call";
  const [serverError, setServerError] = useState<string | null>(null);

  return (
    <main className="flex-1 flex items-center justify-center px-5 py-16">
      <div className="bold-card bg-paper p-7 sm:p-9 w-full max-w-md">
        <h1 className="font-display font-black text-4xl tracking-tight">
          Create account
        </h1>
        <p className="mt-2 text-ink/70 text-sm">
          Register once, then call Ava any time.
        </p>

        {serverError && (
          <p className="mt-5 bg-orange/20 border-2 border-orange text-ink font-bold text-sm rounded-xl px-4 py-2">
            {serverError}
          </p>
        )}

        <Formik
          initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
          validationSchema={registerSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setServerError(null);
            try {
              await register(values.email, values.password, values.name);
              router.push(next);
            } catch (err) {
              setServerError(
                err instanceof Error ? err.message : "Registration failed",
              );
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="mt-6 flex flex-col gap-4">
              <TextField name="name" label="Name" autoComplete="name" />
              <TextField name="email" label="Email" type="email" autoComplete="email" />
              <PasswordField
                name="password"
                label="Password"
                autoComplete="new-password"
                hint="8+ chars, with upper, lower & a number."
              />
              <PasswordField
                name="confirmPassword"
                label="Confirm password"
                autoComplete="new-password"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bold-btn bg-lime font-display font-bold text-lg px-6 py-3 mt-2 disabled:opacity-60"
              >
                {isSubmitting ? "Creating…" : "Create account →"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-6 text-sm text-ink/70">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-ink underline hover:text-orange">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<main className="flex-1" />}>
      <RegisterForm />
    </Suspense>
  );
}
