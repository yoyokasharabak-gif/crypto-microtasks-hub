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

type Entry = { mark: string; name: string; lvl: number; quests: number; gold: number };

const ENTRIES: Entry[] = [];

function RegisterPage() {
  return (
    <div className="min-h-screen text-parchment">
      <Navbar />
      <main className="mx-auto max-w-[1280px] px-4 md:px-8 pt-12 pb-20">
        <div className="quest-rule mb-6"><span>The Contract Registry</span></div>
        <h1 className="text-5xl uppercase leading-tight" style={{ textShadow: "0 0 20px rgba(212,175,55,0.3), 2px 2px 0 #000" }}>
          High Score · This Week
        </h1>
        <p className="accent-italic mt-4 text-xl text-parchment max-w-2xl">
          A weekly ledger of the most diligent privateers across the galaxy.
        </p>

        <div className="pixel-frame mt-12 overflow-hidden">
          <div className="font-mono text-bronze text-base tracking-[0.2em] px-6 py-4" style={{ borderBottom: "2px solid rgba(212,175,55,0.5)" }}>
            ━━━━ TOP OF THE FLEET ━━━━
          </div>
          <div className="overflow-x-auto">
            <table className="w-full font-mono min-w-[640px]">
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(212,175,55,0.4)" }}>
                  <th className="text-left label-pixel py-4 px-6 w-20">Rank</th>
                  <th className="text-left label-pixel py-4 px-6">Privateer</th>
                  <th className="text-right label-pixel py-4 px-6">Level</th>
                  <th className="text-right label-pixel py-4 px-6">Contracts</th>
                  <th className="text-right label-pixel py-4 px-6">Gold</th>
                </tr>
              </thead>
              <tbody>
                {ENTRIES.length === 0 ? (
                  <>
                    <tr>
                      <td colSpan={5} className="py-16 text-center">
                        <div className="font-mono text-4xl text-bronze/40 mb-4" style={{ textShadow: "2px 2px 0 #000" }}>
                          ⚜  ◇  ⚜
                        </div>
                        <h3 className="font-mono text-xl text-bronze uppercase tracking-widest">
                          The Register is Empty
                        </h3>
                        <p className="accent-italic mt-3 text-parchment/70 max-w-md mx-auto px-6">
                          No privateers have been recorded yet. The first contracts will inscribe their names here.
                        </p>
                      </td>
                    </tr>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <tr key={i} className="opacity-50" style={{ borderTop: "2px dashed rgba(212,175,55,0.18)" }}>
                        <td className="py-5 px-6 text-bronze/40 text-xl tabular-nums" style={{ textShadow: "1px 1px 0 #000" }}>
                          {String(i + 1).padStart(2, "0")}
                        </td>
                        <td className="py-5 px-6">
                          <div className="h-4 w-40 bg-bronze/10" />
                        </td>
                        <td className="py-5 px-6"><div className="h-4 w-12 bg-bronze/10 ml-auto" /></td>
                        <td className="py-5 px-6"><div className="h-4 w-10 bg-bronze/10 ml-auto" /></td>
                        <td className="py-5 px-6"><div className="h-4 w-16 bg-bronze/10 ml-auto" /></td>
                      </tr>
                    ))}
                  </>
                ) : ENTRIES.map((e, i) => (
                  <tr key={e.name} className="hover:bg-bronze/5 transition-colors" style={{ borderBottom: i < ENTRIES.length - 1 ? "2px solid rgba(212,175,55,0.15)" : "none" }}>
                    <td className="py-5 px-6 text-bronze text-xl tabular-nums" style={{ textShadow: "1px 1px 0 #000" }}>
                      {String(i + 1).padStart(2, "0")}
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{e.mark}</span>
                        <span className="text-parchment tracking-wider text-lg">{e.name}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-right text-bronze-dim tabular-nums">LV {e.lvl}</td>
                    <td className="py-5 px-6 text-right text-parchment tabular-nums">{e.quests}</td>
                    <td className="py-5 px-6 text-right text-bronze tabular-nums text-lg" style={{ textShadow: "0 0 10px rgba(212,175,55,0.35)" }}>
                      ⛁ {e.gold.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-6 text-center" style={{ borderTop: "2px solid rgba(212,175,55,0.3)" }}>
            <p className="label-pixel text-bronze-dim">▸ Updated every 60 seconds · Next reset in 3 days</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
