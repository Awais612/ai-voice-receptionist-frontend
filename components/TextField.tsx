"use client";

import { useField } from "formik";

type Props = {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
};

/** Plain text/email input wired to Formik + Yup. */
export function TextField({ name, label, type = "text", autoComplete }: Props) {
  const [field, meta] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <label className="flex flex-col gap-1">
      <span className="font-display font-bold text-sm">{label}</span>
      <input
        {...field}
        type={type}
        autoComplete={autoComplete}
        className={`bold-card !rounded-xl bg-cream px-4 py-3 outline-none focus:bg-lime-soft ${
          showError ? "border-orange!" : ""
        }`}
      />
      {showError && (
        <span className="text-xs text-orange font-bold">{meta.error}</span>
      )}
    </label>
  );
}
