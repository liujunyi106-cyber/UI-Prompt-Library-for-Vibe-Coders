import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VibeUI — 92 Free UI Prompts for Vibe Coders",
  description: "A curated library of layout prompts for vibe coders. Pick a structure, copy the prompt, paste it into your AI tool — and let it match your screenshot's aesthetic.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
