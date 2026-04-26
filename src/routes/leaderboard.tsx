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
          <div className="font-mono text-bronze text-base tracking-[0.2em] px-6 py-4" style={{ borderBottom: "2px solid rgba(201,168,124,0.5)" }}>
            ━━━━ TOP OF THE REGISTER ━━━━
          </div>
          <div className="overflow-x-auto">
            <table className="w-full font-mono min-w-[640px]">
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(201,168,124,0.4)" }}>
                  <th className="text-left label-pixel py-4 px-6 w-24">Rank</th>
                  <th className="text-left label-pixel py-4 px-6">Wallet</th>
                  <th className="text-right label-pixel py-4 px-6">Level</th>
                  <th className="text-right label-pixel py-4 px-6">Quests</th>
                  <th className="text-right label-pixel py-4 px-6">Gold</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} style={{ borderBottom: "2px solid rgba(201,168,124,0.15)" }}>
                    <td className="py-5 px-6 text-bronze-dim/60 text-xl tabular-nums" style={{ textShadow: "1px 1px 0 #000" }}>
                      {String(i + 1).padStart(2, "0")}
                    </td>
                    <td className="py-5 px-6"><span className="empty-line w-32" /></td>
                    <td className="py-5 px-6 text-right"><span className="empty-line w-12 inline-block" /></td>
                    <td className="py-5 px-6 text-right"><span className="empty-line w-16 inline-block" /></td>
                    <td className="py-5 px-6 text-right"><span className="empty-line w-20 inline-block" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-8 text-center" style={{ borderTop: "2px solid rgba(201,168,124,0.3)" }}>
            <p className="label-pixel text-bronze-dim">▸ The register is empty · Complete quests to climb</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
