import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — McKWork" },
      { name: "description", content: "This week's most accomplished workers on McKWork." },
    ],
  }),
  component: LeaderboardPage,
});

function LeaderboardPage() {
  const rows = Array.from({ length: 12 }).map((_, i) => ({
    rank: i + 1,
    addr: `${(Math.random().toString(36) + "00000").slice(2, 6)}…${(Math.random().toString(36) + "00000").slice(2, 6)}`,
    sol: (15 - i * 0.7 + Math.random() * 0.4).toFixed(2),
    tasks: 420 - i * 18,
  }));
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-[1280px] px-6 md:px-10 py-20">
        <p className="label-classic text-gold">The Register</p>
        <h1 className="serif text-5xl mt-4">This week's earners</h1>
        <p className="accent-italic mt-4 text-xl text-silver max-w-2xl">
          A weekly ledger of the most diligent contributors across the platform.
        </p>

        <div className="card-classic rounded-md mt-12 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(197,165,63,0.2)]">
                <th className="text-left label-classic py-5 px-6">Rank</th>
                <th className="text-left label-classic py-5 px-6">Wallet</th>
                <th className="text-right label-classic py-5 px-6">Tasks</th>
                <th className="text-right label-classic py-5 px-6">Earnings</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.rank} className="border-b border-[rgba(197,165,63,0.08)] last:border-0 hover:bg-[rgba(197,165,63,0.04)] transition-colors">
                  <td className="py-5 px-6 serif text-gold text-lg w-24">{String(r.rank).padStart(2, "0")}</td>
                  <td className="py-5 px-6 font-mono text-foreground/90">{r.addr}</td>
                  <td className="py-5 px-6 text-right text-silver tabular-nums">{r.tasks}</td>
                  <td className="py-5 px-6 text-right serif text-gold tabular-nums">{r.sol} ◎</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}
