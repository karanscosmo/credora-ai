import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CREDORA AI — Neural Recruiter Intelligence Platform",
  description:
    "Decode recruiter trust before interviews decide your future. Credora AI uses neural intelligence to validate your technical depth with enterprise-grade precision — in under 2 minutes.",
  keywords: "recruiter intelligence, resume analysis, GitHub analysis, candidate scoring, AI hiring platform",
  authors: [{ name: "Credora AI" }],
  openGraph: {
    title: "CREDORA AI — Neural Recruiter Intelligence",
    description: "Enterprise-grade candidate evaluation powered by neural AI. Full analysis in under 2 minutes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* Google Fonts — Geist + Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Geist:wght@400;500;600;700;800&family=Geist+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* Material Symbols icon font — loaded in <head> for guaranteed priority */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-obsidian-base text-on-surface antialiased">
        {children}
      </body>
    </html>
  );
}
