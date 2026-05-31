import { Suspense } from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import CommandBar from "@/components/command-bar";
import { getStartups } from "@/actions/startups";

export default async function TerminalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Call server action to check if Neon DB is connected or using mock data
  const { isFallback } = await getStartups();

  return (
    <div className="min-h-screen bg-background terminal-grid">
      <Sidebar />
      <div className="pl-[64px] flex flex-col min-h-screen">
        <Suspense fallback={<div className="h-12 border-b border-graphite-stroke bg-surface-container-low" />}>
          <Header isFallback={isFallback} />
        </Suspense>
        <main className="flex-1 p-6 md:p-8 max-w-[1440px] w-full mx-auto pb-28">
          {children}
        </main>
      </div>
      <CommandBar />
    </div>
  );
}
