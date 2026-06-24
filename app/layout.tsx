import type { Metadata } from "next";
import { Archivo, Space_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

// Heavy grotesk for big bold headlines.
const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

// Monospace for body copy and labels — the bold/brutalist accent.
const spaceMono = Space_Mono({
  variable: "--font-stamp",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "AutoCare Auto Repair — AI Voice Receptionist",
  description:
    "Call AutoCare's AI receptionist to book, check, or cancel your car repair appointment — any time, day or night.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
