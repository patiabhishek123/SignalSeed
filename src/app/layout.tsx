import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SignalSeed | Venture Intelligence Terminal",
  description:
    "Institutional venture intelligence terminal. Discovers high-momentum startups before they become mainstream by correlating GitHub, Hacker News, Product Hunt, and YC activity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-background text-on-background min-h-screen selection:bg-primary selection:text-black">
        {children}
      </body>
    </html>
  );
}
