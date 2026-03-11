import type { Metadata } from "next";
import Link from "next/link";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "UT Austin Alumni Connector",
  description: "A simple MVP for students to discover fictional UT Austin alumni, browse alumni-posted jobs, send email outreach, and celebrate helpful mentors."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="bg-hero-glow">
          <div className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <header className="mb-8 rounded-[2rem] border border-white/60 bg-white/70 px-5 py-4 shadow-panel backdrop-blur">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <Link href="/" className="font-[family-name:var(--font-display)] text-2xl text-slate hover:text-burnt">
                    UT Austin Alumni Connector
                  </Link>
                  <p className="mt-1 text-sm text-slate/65">Discovery, outreach, alumni-posted jobs, and lightweight recognition for student-alumni connections.</p>
                </div>
                <nav className="flex items-center gap-4 text-sm font-semibold text-slate/80">
                  <Link href="/" className="rounded-full px-4 py-2 transition hover:bg-burnt/10 hover:text-burnt">
                    Home
                  </Link>
                  <Link href="/jobs" className="rounded-full px-4 py-2 transition hover:bg-burnt/10 hover:text-burnt">
                    Job Board
                  </Link>
                  <Link href="/leaderboard" className="rounded-full px-4 py-2 transition hover:bg-burnt/10 hover:text-burnt">
                    Leaderboard
                  </Link>
                </nav>
              </div>
            </header>
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}