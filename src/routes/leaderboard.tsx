import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "The Register — McKWork Guild" },
      { name: "description", content: "This week's top adventurers, ranked by gold." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const rows = Array.from({ length: 14 }).map((_, i) => ({
    rank: String(i + 1).padStart(2, "0"),
    addr: `${(Math.random().toString(36) + "00000").slice(2, 6)}…${(Math.random().toString(36) + "00000").slice(2, 6)}`,
    sol: (15 - i * 0.7 + Math.random() * 0.4).toFixed(2),
    quests: 420 - i * 18,
    lvl: 25 - i,
  }));
  return (
    <div className="min-h-screen text-parchment">
      <Navbar />
      <main className="mx-auto max-w-[1280px] px-4 md:px-8 pt-12 pb-20">
        <div className="quest-rule mb-6"><span>The Register</span></div>
        <h1 className="font-mono text-bronze text-5xl uppercase leading-tight" style={{ textShadow: "2px 2px 0 #000" }}>
          High Score · This Week
        </h1>
        <p className="accent-italic mt-4 text-xl text-parchment max-w-2xl">
          A weekly ledger of the most diligent adventurers across the realm.
        </p>

        <div className="pixel-frame mt-12 overflow-hidden">
          <div className="font-mono text-bronze text-base tracking-[0.2em] px-6 py-4" style={{ borderBottom: "1px solid rgba(201,168,124,0.4)" }}>
            ━━━━ TOP OF THE REGISTER ━━━━
          </div>
          <div className="overflow-x-auto">
            <table className="w-full font-mono min-w-[640px]">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(201,168,124,0.3)" }}>
                  <th className="text-left label-pixel py-4 px-6 w-24">Rank</th>
                  <th className="text-left label-pixel py-4 px-6">Wallet</th>
                  <th className="text-right label-pixel py-4 px-6">Level</th>
                  <th className="text-right label-pixel py-4 px-6">Quests</th>
                  <th className="text-right label-pixel py-4 px-6">Gold</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.rank} className="hover:bg-bronze/5 transition-colors" style={{ borderBottom: "1px solid rgba(201,168,124,0.1)" }}>
                    <td className="py-4 px-6 text-bronze text-xl" style={{ textShadow: "1px 1px 0 #000" }}>{r.rank}</td>
                    <td className="py-4 px-6 text-parchment text-base">{r.addr}</td>
                    <td className="py-4 px-6 text-right text-bronze-dim text-sm tracking-wider">LV {r.lvl}</td>
                    <td className="py-4 px-6 text-right text-parchment text-base tabular-nums">{r.quests}</td>
                    <td className="py-4 px-6 text-right text-bronze text-xl tabular-nums" style={{ textShadow: "1px 1px 0 #000" }}>
                      ⛁ {r.sol}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
