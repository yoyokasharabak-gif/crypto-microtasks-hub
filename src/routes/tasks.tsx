import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { useWallet } from "@/lib/wallet";
import { getPostedQuests, type PostedQuest } from "@/lib/quests";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "Quest Board — McKWork Guild" },
      { name: "description", content: "Browse the open quest board. Accept microtasks. Earn Solana." },
    ],
  }),
  component: QuestBoard,
});

const CATEGORIES = ["All", "AI Training", "Image Labeling", "Surveys", "Transcription", "Moderation", "Validation"] as const;
const SORTS = ["Most Recent", "Highest Reward", "Easiest", "Quickest"] as const;

const SIGILS: Record<string, string> = {
  "AI Training": "⌬",
  "Image Labeling": "▣",
  "Data Labeling": "▦",
  "Image Classification": "◧",
  Surveys: "✎",
  Transcription: "♪",
  Moderation: "⚑",
  "Content Moderation": "⚑",
  Validation: "✓",
};

type Quest = {
  id: string;
  category: string;
  title: string;
  desc: string;
  reward: number;
  usd: number;
  minutes: number;
  difficulty: "Easy" | "Medium" | "Hard" | "——";
  slots: number;
  accuracy: number;
};

// Six empty placeholder quests — board awaits first transmissions
const PLACEHOLDER_QUESTS: Quest[] = Array.from({ length: 6 }).map((_, i) => ({
  id: `empty-${i}`,
  category: "All",
  title: "——",
  desc: "Awaiting first transmission from the patrons of the Guild.",
  reward: 0,
  usd: 0,
  minutes: 0,
  difficulty: "——",
  slots: 0,
  accuracy: 0,
}));

function QuestBoard() {
  const { connected } = useWallet();
  const [posted, setPosted] = useState<PostedQuest[]>([]);
  useEffect(() => { setPosted(getPostedQuests()); }, []);

  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<typeof CATEGORIES[number]>("All");
  const [sort, setSort] = useState<typeof SORTS[number]>("Most Recent");
  const [minReward, setMinReward] = useState(0);

  // Convert posted (real) quests to display Quest format
  const realQuests: Quest[] = useMemo(
    () =>
      posted.map((p) => ({
        id: p.id,
        category: p.category,
        title: p.title,
        desc: p.description || "Posted by patron · awaiting privateers.",
        reward: p.reward,
        usd: p.reward * 24,
        minutes: 0,
        difficulty: "Medium",
        slots: 1,
        accuracy: 0,
      })),
    [posted],
  );

  const filtered = useMemo(() => {
    if (realQuests.length === 0) return [] as Quest[];
    let out = realQuests.filter(
      (t) =>
        (cat === "All" || t.category === cat) &&
        t.reward >= minReward &&
        (query === "" ||
          t.title.toLowerCase().includes(query.toLowerCase()) ||
          t.desc.toLowerCase().includes(query.toLowerCase())),
    );
    if (sort === "Highest Reward") out = [...out].sort((a, b) => b.reward - a.reward);
    if (sort === "Quickest") out = [...out].sort((a, b) => a.minutes - b.minutes);
    return out;
  }, [query, cat, sort, minReward, realQuests]);

  const handleAccept = () => {
    if (!connected) {
      alert("Please connect your wallet first.");
      return;
    }
    alert("Quest not available yet. Complete setup first.");
  };

  return (
    <div className="min-h-screen text-parchment">
      <Navbar />
      <main className="mx-auto max-w-[1280px] px-4 md:px-8 pt-12 pb-20">
        {/* Header */}
        <div className="quest-rule mb-6"><span>Quest Board</span></div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-mono text-bronze text-4xl md:text-6xl uppercase leading-tight" style={{ textShadow: "2px 2px 0 #000" }}>
              Open Quests
            </h1>
            <p className="accent-italic mt-4 text-xl text-parchment max-w-2xl">
              Accept a quest. Honour the standard. Receive your gold.
            </p>
          </div>
          <div className="text-right">
            <div className="label-pixel text-bronze-dim mb-2">Currently Open</div>
            <div className="font-mono text-5xl text-bronze tabular-nums" style={{ textShadow: "2px 2px 0 #000" }}>
              {String(realQuests.length).padStart(4, "0")}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="pixel-frame p-6 mt-10">
          <div className="grid lg:grid-cols-12 gap-5 items-end">
            <div className="lg:col-span-5">
              <label className="label-pixel block mb-3">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-bronze-dim" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Quest title or keyword"
                  className="w-full bg-black/40 pl-10 pr-4 py-3 font-mono text-base text-parchment placeholder:text-bronze-dim/50 focus:outline-none"
                  style={{ border: "2px solid rgba(201,168,124,0.45)", boxShadow: "inset 2px 2px 0 #000" }}
                />
              </div>
            </div>
            <div className="lg:col-span-3">
              <label className="label-pixel block mb-3">Discipline</label>
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value as typeof CATEGORIES[number])}
                className="w-full bg-black/40 px-4 py-3 font-mono text-base text-parchment focus:outline-none"
                style={{ border: "2px solid rgba(201,168,124,0.45)", boxShadow: "inset 2px 2px 0 #000" }}
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="lg:col-span-2">
              <label className="label-pixel block mb-3">Min ⛁ SOL</label>
              <input
                type="number"
                step={0.01}
                min={0}
                value={minReward}
                onChange={(e) => setMinReward(Number(e.target.value) || 0)}
                className="w-full bg-black/40 px-4 py-3 font-mono text-base text-parchment focus:outline-none"
                style={{ border: "2px solid rgba(201,168,124,0.45)", boxShadow: "inset 2px 2px 0 #000" }}
              />
            </div>
            <div className="lg:col-span-2">
              <label className="label-pixel block mb-3">Sort</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof SORTS[number])}
                className="w-full bg-black/40 px-4 py-3 font-mono text-base text-parchment focus:outline-none"
                style={{ border: "2px solid rgba(201,168,124,0.45)", boxShadow: "inset 2px 2px 0 #000" }}
              >
                {SORTS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Grid — placeholder slots while the board is being populated */}
        {filtered.length > 0 ? (
          <>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((q, i) => <QuestCard key={q.id} q={q} i={i} onAccept={handleAccept} />)}
            </div>
            <div className="mt-12 flex items-center justify-between">
              <p className="label-pixel">Page 01 / 01</p>
              <div className="flex gap-3">
                <button className="btn-pixel !text-sm !py-2 !px-5">◂ Prev</button>
                <button className="btn-pixel-solid !text-sm !py-2 !px-5">Next ▸</button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <EmptyQuestSlot key={i} i={i} onAccept={handleAccept} />
              ))}
            </div>
            <div className="pixel-frame py-10 text-center mt-10">
              <p className="font-mono text-2xl text-bronze">━━━ THE BOARD AWAITS ━━━</p>
              <p className="text-parchment/80 mt-3 max-w-md mx-auto">
                No quests have been posted yet. Patrons of the Guild are preparing the first commissions.
              </p>
              <button
                onClick={() => { setQuery(""); setCat("All"); setMinReward(0); }}
                className="btn-pixel mt-6 !text-sm !py-2 !px-5"
              >
                Reset Filters
              </button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

function EmptyQuestSlot({ i, onAccept }: { i: number; onAccept: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: i * 0.05 }}
      className="empty-slot p-6 min-h-[280px] flex-col gap-3"
    >
      <div className="flex items-center justify-between w-full">
        <span className="ribbon opacity-60">——</span>
        <span className="font-mono text-sm text-bronze-dim">[Empty]</span>
      </div>
      <div className="font-mono text-3xl text-bronze-dim/60 mt-2" style={{ textShadow: "2px 2px 0 #000" }}>▢</div>
      <div className="font-mono text-lg text-bronze-dim uppercase tracking-wide">——</div>
      <span className="empty-line w-2/3" />
      <div className="quest-rule my-3 w-full" />
      <div className="flex justify-between w-full">
        <div>
          <div className="label-pixel text-bronze-dim">Reward</div>
          <div className="font-mono text-2xl text-bronze-dim mt-1">⛁ ——</div>
        </div>
        <div className="text-right">
          <div className="label-pixel text-bronze-dim">Deadline</div>
          <div className="font-mono text-base text-bronze-dim">⧗ ——</div>
        </div>
      </div>
      <button onClick={onAccept} className="btn-pixel mt-3 w-full !text-sm opacity-70">
        ▶ Accept Quest
      </button>
    </motion.div>
  );
}

function QuestCard({ q, i, onAccept }: { q: Quest; i: number; onAccept: () => void }) {
  const diffColor =
    q.difficulty === "Easy" ? "text-forest" :
    q.difficulty === "Medium" ? "text-bronze" :
    q.difficulty === "Hard" ? "text-copper" :
    "text-bronze-dim";
  const diffSym = q.difficulty === "Easy" ? "★" : q.difficulty === "Medium" ? "★★" : q.difficulty === "Hard" ? "★★★" : "——";

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: i * 0.04 }}
      className="pixel-frame p-6 trim-top flex flex-col group hover:translate-x-[-1px] hover:translate-y-[-1px] transition-transform"
      style={{ transitionTimingFunction: "steps(2)" }}
    >
      <div className="flex items-start justify-between">
        <span className="ribbon">{q.category}</span>
        <span className={`font-mono text-base ${diffColor}`} title={q.difficulty}>{diffSym}</span>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <span className="font-mono text-3xl text-bronze" style={{ textShadow: "1px 1px 0 #000" }}>
          {SIGILS[q.category] ?? "✦"}
        </span>
        <h3 className="font-mono text-lg text-parchment leading-tight tracking-wide uppercase">{q.title}</h3>
      </div>
      <p className="text-sm text-parchment/75 mt-3 leading-relaxed line-clamp-2">{q.desc}</p>

      <div className="quest-rule my-6" />

      <div className="flex items-baseline justify-between">
        <div>
          <div className="label-pixel text-bronze-dim">Reward</div>
          <div className="font-mono text-3xl text-bronze tabular-nums mt-1" style={{ textShadow: "1px 1px 0 #000" }}>
            ⛁ {q.reward.toFixed(2)}
          </div>
          <div className="text-xs text-bronze-dim tabular-nums mt-1">≈ ${q.usd.toFixed(2)}</div>
        </div>
        <div className="text-right space-y-1">
          <div className="label-pixel text-bronze-dim">Time</div>
          <div className="font-mono text-base text-parchment">⧗ ~{q.minutes} min</div>
          <div className="font-mono text-xs text-bronze-dim">⛁ {q.slots} slots</div>
        </div>
      </div>

      <button onClick={onAccept} className="btn-pixel mt-6 w-full !text-sm">
        ▶ Accept Quest
      </button>

      <p className="label-pixel text-bronze-dim/70 mt-3 text-center">
        Quality · {q.accuracy}% accuracy
      </p>
    </motion.article>
  );
}
