import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Adventurer's Stats — McKWork Guild" },
      { name: "description", content: "Your level, treasure, performance and recent quests." },
    ],
  }),
  component: AdventurerStats,
});

const inventory: { sigil: string; title: string; reward: string; state: string }[] = [];

const stateColor: Record<string, string> = {
  Verified: "text-forest",
  Pending: "text-bronze",
  Cleared: "text-teal-faded",
};

function AdventurerStats() {
  return (
    <div className="min-h-screen text-parchment">
      <Navbar />

      <main className="mx-auto max-w-[1280px] px-4 md:px-8 pt-12 pb-20">
        <div className="quest-rule mb-6"><span>Adventurer's Status</span></div>

        {/* Top: Avatar + Stats */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Character card */}
          <div className="pixel-frame p-8 trim-top">
            <div className="flex items-center gap-5">
              <PixelAvatar />
              <div>
                <div className="label-pixel text-bronze-dim">Wallet</div>
                <div className="font-mono text-2xl text-bronze-dim/70 mt-1">— · not bound —</div>
                <div className="font-mono text-bronze-dim/70 mt-2">⚜ LV — · UNRANKED</div>
              </div>
            </div>
            <div className="quest-rule my-6" />
            <div className="space-y-4">
              <StatRow label="HP · Accuracy" pct={0} value="—" color="#1A3B32" tone="bg-forest" textColor="text-bronze-dim/70" />
              <StatRow label="MP · Quests Today" pct={0} value="— / —" color="#4A6B6D" textColor="text-bronze-dim/70" />
              <StatRow label="EXP · To Next Level" pct={0} value="— / —" color="#6B4E71" textColor="text-bronze-dim/70" />
            </div>
          </div>

          {/* Treasure */}
          <div className="lg:col-span-2 grid sm:grid-cols-3 gap-6">
            <Kpi label="Total Gold" value="—" unit="SOL" sub="Awaiting first quest" />
            <Kpi label="Treasury" value="—" unit="SOL" sub="Empty" highlight />
            <Kpi label="In Escrow" value="—" unit="SOL" sub="No quests pending" />

            <div className="sm:col-span-3 pixel-frame p-7 trim-top">
              <div className="quest-rule mb-5"><span>Treasury · Withdraw</span></div>
              <div className="grid md:grid-cols-3 gap-5">
                <Field label="Amount ⛁ SOL" value="" placeholder="0.00" suffix="MAX" />
                <Field label="Destination" value="" placeholder="Bind a wallet first" mono />
                <div className="flex flex-col">
                  <span className="label-pixel mb-3">Network Fee</span>
                  <span className="font-mono text-base text-bronze-dim/70 py-3">— ⛁</span>
                </div>
              </div>
              <button className="btn-pixel-solid mt-6 w-full md:w-auto" disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>⟧ Withdraw Now ⟦</button>
            </div>
          </div>
        </div>

        {/* Performance metrics */}
        <div className="quest-rule mt-14 mb-6"><span>Performance Codex</span></div>
        <div className="pixel-frame p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Metric value="—" label="Accuracy" />
            <Metric value="—" label="This Week" />
            <Metric value="—" label="Lifetime Quests" />
            <Metric value="—" label="Response Avg." />
          </div>
        </div>

        {/* Inventory grid */}
        <div className="quest-rule mt-14 mb-6"><span>Inventory · Recent Quests</span></div>
        {inventory.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="empty-slot p-6 min-h-[140px] flex-col gap-3">
                <span className="font-mono text-3xl text-bronze-dim/50">▢</span>
                <span className="empty-line w-2/3" />
                <span className="label-pixel">Empty slot</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {inventory.map((it, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="pixel-frame-soft p-5"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-3xl text-bronze" style={{ textShadow: "1px 1px 0 #000" }}>
                    {it.sigil}
                  </span>
                  <span className={`label-pixel ${stateColor[it.state]}`}>● {it.state}</span>
                </div>
                <div className="font-mono text-sm text-parchment mt-4 tracking-wide leading-snug uppercase">
                  {it.title}
                </div>
                <div className="font-mono text-lg text-bronze mt-3 tabular-nums">⛁ {it.reward}</div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Achievements */}
        <div className="quest-rule mt-14 mb-6"><span>Medals & Honours</span></div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="pixel-frame-soft p-5 min-w-[140px] text-center flex-shrink-0"
              style={{ opacity: 0.55 }}
            >
              <div className="font-mono text-4xl text-bronze-dim" style={{ textShadow: "1px 1px 0 #000" }}>
                ?
              </div>
              <div className="label-pixel mt-3">Locked</div>
            </div>
          ))}
        </div>

        {/* Referral */}
        <div className="quest-rule mt-14 mb-6"><span>Recruit a Companion</span></div>
        <div className="pixel-frame p-8 grid md:grid-cols-2 gap-8 items-center trim-top">
          <div>
            <h3 className="font-mono text-bronze text-2xl uppercase" style={{ textShadow: "1px 1px 0 #000" }}>
              Invite, Earn 5%
            </h3>
            <p className="accent-italic text-lg text-parchment mt-3">
              Receive five percent of their gold for thirty days.
            </p>
            <div className="flex gap-10 mt-6">
              <div>
                <div className="label-pixel text-bronze-dim">Earned</div>
                <div className="font-mono text-3xl text-bronze-dim/70 tabular-nums mt-1">⛁ —</div>
              </div>
              <div>
                <div className="label-pixel text-bronze-dim">Companions</div>
                <div className="font-mono text-3xl text-bronze-dim/70 tabular-nums mt-1">—</div>
              </div>
            </div>
          </div>
          <div>
            <label className="label-pixel block mb-3">Your Scroll</label>
            <div className="flex gap-3">
              <input
                readOnly
                placeholder="Bind a wallet to generate your scroll"
                className="flex-1 bg-black/40 px-4 py-3 font-mono text-sm text-parchment placeholder:text-bronze-dim/50 focus:outline-none"
                style={{ border: "2px solid rgba(201,168,124,0.4)", boxShadow: "inset 2px 2px 0 #000" }}
              />
              <button className="btn-pixel !text-sm !py-2 !px-4">
                <Copy className="h-3.5 w-3.5" /> Copy
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function StatRow({ label, value, pct, textColor, tone }: { label: string; value: string; pct: number; color: string; textColor: string; tone?: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="label-pixel">{label}</span>
        <span className={`font-mono text-base ${textColor} tabular-nums`}>{value}</span>
      </div>
      <div className="stat-bar mt-2">
        <span className={tone ?? ""} style={{ width: `${pct}%`, color: tone ? undefined : "currentColor", background: tone ? undefined : `var(--bronze)` }} />
      </div>
    </div>
  );
}

function PixelAvatar() {
  // Simple pixel "head & cape" mark
  const grid = [
    "..bbbb..",
    ".bggggb.",
    ".bgwgwg.",
    ".bggggb.",
    "..bbbb..",
    ".aaaaaa.",
    "aaaaaaaa",
    "a.a..a.a",
  ];
  const px = 8;
  return (
    <svg width={64} height={64} viewBox="0 0 64 64" shapeRendering="crispEdges" className="flex-shrink-0" style={{ boxShadow: "2px 2px 0 #000", border: "1px solid var(--bronze)", background: "#000" }}>
      {grid.map((row, y) =>
        row.split("").map((c, x) => {
          if (c === ".") return null;
          const fill = c === "g" ? "#C9A87C" : c === "b" ? "#2B1015" : c === "w" ? "#0D0D0D" : "#6B4E71";
          return <rect key={`${x}-${y}`} x={x * px} y={y * px} width={px} height={px} fill={fill} />;
        }),
      )}
    </svg>
  );
}

function Kpi({ label, value, unit, sub, highlight }: { label: string; value: string; unit: string; sub: string; highlight?: boolean }) {
  return (
    <div
      className={highlight ? "pixel-frame p-6 trim-top" : "pixel-frame-soft p-6"}
      style={{ boxShadow: highlight ? undefined : "2px 2px 0 #000" }}
    >
      <p className="label-pixel">{label}</p>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-mono text-4xl text-bronze tabular-nums" style={{ textShadow: "2px 2px 0 #000" }}>{value}</span>
        <span className="font-mono text-lg text-bronze-dim">{unit}</span>
      </div>
      <p className="text-sm text-parchment/70 mt-3">{sub}</p>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-mono text-3xl text-bronze tabular-nums" style={{ textShadow: "2px 2px 0 #000" }}>{value}</div>
      <p className="label-pixel mt-2">{label}</p>
    </div>
  );
}

function Field({ label, value, suffix, mono }: { label: string; value: string; suffix?: string; mono?: boolean }) {
  return (
    <div>
      <label className="label-pixel block mb-3">{label}</label>
      <div className="relative">
        <input
          defaultValue={value}
          className={`w-full bg-black/40 px-4 py-3 ${mono ? "font-mono" : "font-mono"} text-base text-parchment focus:outline-none ${suffix ? "pr-16" : ""}`}
          style={{ border: "1px solid rgba(201,168,124,0.4)", boxShadow: "inset 1px 1px 0 #000" }}
        />
        {suffix && (
          <button className="absolute right-1.5 top-1/2 -translate-y-1/2 label-pixel text-bronze px-3 py-1.5" style={{ border: "1px solid rgba(201,168,124,0.4)" }}>
            {suffix}
          </button>
        )}
      </div>
    </div>
  );
}
