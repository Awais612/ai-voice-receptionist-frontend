"use client";

import { useState } from "react";
import { useField } from "formik";

type Props = {
  name: string;
  label: string;
  autoComplete?: string;
  hint?: string;
};

/** Password input with a show/hide toggle, wired to Formik + Yup. */
export function PasswordField({ name, label, autoComplete, hint }: Props) {
  const [field, meta] = useField(name);
  const [show, setShow] = useState(false);
  const showError = meta.touched && meta.error;

  return (
    <label className="flex flex-col gap-1">
      <span className="font-display font-bold text-sm">{label}</span>
      <div className="relative">
        <input
          {...field}
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          className={`bold-card !rounded-xl bg-cream w-full px-4 py-3 pr-16 outline-none focus:bg-lime-soft ${
            showError ? "border-orange!" : ""
          }`}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 font-display font-bold text-xs text-ink/60 hover:text-ink"
        >
          {show ? "HIDE" : "SHOW"}
        </button>
      </div>
      {showError ? (
        <span className="text-xs text-orange font-bold">{meta.error}</span>
      ) : hint ? (
        <span className="text-xs text-ink/50">{hint}</span>
      ) : null}
    </label>
  );
}
