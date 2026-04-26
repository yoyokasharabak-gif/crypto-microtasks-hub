import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Clock, Users, ArrowUpRight, Bot, Image as ImageIcon, FileText, Mic, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "Available Tasks — McKWork" },
      { name: "description", content: "Browse, filter and complete microtasks. Earn SOL with every contribution." },
    ],
  }),
  component: TasksPage,
});

const CATEGORIES = ["All", "AI Training", "Image Labeling", "Surveys", "Transcription", "Moderation", "Validation"] as const;
const SORTS = ["Most Recent", "Highest Reward", "Easiest", "Quickest"] as const;

type Task = {
  id: string;
  category: typeof CATEGORIES[number];
  title: string;
  desc: string;
  reward: number;
  usd: number;
  minutes: number;
  difficulty: "Easy" | "Medium" | "Hard";
  slots: number;
  accuracy: number;
};

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "AI Training": Bot,
  "Image Labeling": ImageIcon,
  Surveys: FileText,
  Transcription: Mic,
  Moderation: ShieldAlert,
  Validation: CheckCircle2,
};

const TASKS: Task[] = [
  { id: "t1", category: "Image Labeling", title: "Identify objects in urban photographs", desc: "Review 5 street-level images and tag every visible vehicle.", reward: 0.05, usd: 1.20, minutes: 2, difficulty: "Easy", slots: 234, accuracy: 90 },
  { id: "t2", category: "AI Training", title: "Rate the quality of model responses", desc: "Compare two AI answers and select the more helpful, factually grounded reply.", reward: 0.12, usd: 2.88, minutes: 5, difficulty: "Medium", slots: 89, accuracy: 92 },
  { id: "t3", category: "Surveys", title: "Consumer behaviour study, EU region", desc: "A short fifteen-question survey for adults residing in the European Union.", reward: 0.08, usd: 1.92, minutes: 4, difficulty: "Easy", slots: 412, accuracy: 85 },
  { id: "t4", category: "Transcription", title: "Transcribe a 90-second audio clip", desc: "Listen to a podcast excerpt and provide a verbatim transcription.", reward: 0.18, usd: 4.32, minutes: 8, difficulty: "Medium", slots: 47, accuracy: 95 },
  { id: "t5", category: "Moderation", title: "Review user-submitted forum content", desc: "Approve, flag, or reject forum posts according to our community guidelines.", reward: 0.06, usd: 1.44, minutes: 3, difficulty: "Easy", slots: 156, accuracy: 88 },
  { id: "t6", category: "Validation", title: "Verify business addresses across 12 cities", desc: "Cross-reference business listings against authoritative public sources.", reward: 0.14, usd: 3.36, minutes: 6, difficulty: "Medium", slots: 73, accuracy: 93 },
  { id: "t7", category: "AI Training", title: "Annotate medical imagery (training)", desc: "Outline regions of interest in anonymised medical scans. Training provided.", reward: 0.32, usd: 7.68, minutes: 12, difficulty: "Hard", slots: 28, accuracy: 96 },
  { id: "t8", category: "Image Labeling", title: "Classify product photographs by category", desc: "Assign appropriate retail categories to a small batch of catalogue images.", reward: 0.04, usd: 0.96, minutes: 2, difficulty: "Easy", slots: 612, accuracy: 88 },
  { id: "t9", category: "Surveys", title: "Habits & wellbeing — long-form survey", desc: "A considered, forty-question study on daily routine and wellbeing.", reward: 0.22, usd: 5.28, minutes: 14, difficulty: "Easy", slots: 198, accuracy: 80 },
];

function TasksPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<typeof CATEGORIES[number]>("All");
  const [sort, setSort] = useState<typeof SORTS[number]>("Most Recent");
  const [minReward, setMinReward] = useState(0);

  const filtered = useMemo(() => {
    let out = TASKS.filter(
      (t) =>
        (cat === "All" || t.category === cat) &&
        t.reward >= minReward &&
        (query === "" ||
          t.title.toLowerCase().includes(query.toLowerCase()) ||
          t.desc.toLowerCase().includes(query.toLowerCase())),
    );
    if (sort === "Highest Reward") out = [...out].sort((a, b) => b.reward - a.reward);
    if (sort === "Easiest") out = [...out].sort((a, b) => a.accuracy - b.accuracy);
    if (sort === "Quickest") out = [...out].sort((a, b) => a.minutes - b.minutes);
    return out;
  }, [query, cat, sort, minReward]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-[1280px] px-6 md:px-10 pt-16 pb-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="label-classic text-gold">The Atelier</p>
            <h1 className="serif text-5xl mt-4">Available tasks</h1>
            <p className="accent-italic mt-4 text-xl text-silver max-w-2xl">
              Choose a task. Complete it with care. Receive SOL upon verification.
            </p>
          </div>
          <div className="text-right">
            <div className="serif text-4xl text-gold tabular-nums">{TASKS.length.toLocaleString()}</div>
            <p className="label-classic mt-1">Currently open</p>
          </div>
        </div>

        <div className="divider-gold my-12" />

        {/* Filters */}
        <div className="card-classic rounded-md p-6 md:p-8">
          <div className="grid lg:grid-cols-12 gap-5 items-end">
            <div className="lg:col-span-5">
              <label className="label-classic block mb-3">Search</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-silver" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Title or keyword"
                  className="w-full bg-surface border border-[rgba(74,112,139,0.4)] rounded-full pl-11 pr-5 py-3 text-sm placeholder:text-silver/50 focus:outline-none focus:border-[oklch(0.74_0.13_88)] transition-colors"
                />
              </div>
            </div>
            <div className="lg:col-span-3">
              <label className="label-classic block mb-3">Category</label>
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value as typeof CATEGORIES[number])}
                className="w-full bg-surface border border-[rgba(74,112,139,0.4)] rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[oklch(0.74_0.13_88)]"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="lg:col-span-2">
              <label className="label-classic block mb-3">Min · SOL</label>
              <input
                type="number"
                step={0.01}
                min={0}
                value={minReward}
                onChange={(e) => setMinReward(Number(e.target.value) || 0)}
                className="w-full bg-surface border border-[rgba(74,112,139,0.4)] rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[oklch(0.74_0.13_88)]"
              />
            </div>
            <div className="lg:col-span-2">
              <label className="label-classic block mb-3">Sort</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof SORTS[number])}
                className="w-full bg-surface border border-[rgba(74,112,139,0.4)] rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[oklch(0.74_0.13_88)]"
              >
                {SORTS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t, i) => <TaskCard key={t.id} task={t} index={i} />)}
        </div>

        {filtered.length === 0 && (
          <div className="card-classic rounded-md py-20 text-center mt-10">
            <p className="serif text-2xl text-gold">Nothing on the docket.</p>
            <p className="text-silver mt-3">Adjust your filters, or return shortly.</p>
            <button
              onClick={() => { setQuery(""); setCat("All"); setMinReward(0); }}
              className="btn-gold-outline rounded-full px-6 py-2.5 mt-6 text-xs uppercase tracking-[0.12em]"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Pagination — minimal */}
        {filtered.length > 0 && (
          <div className="mt-14 flex items-center justify-between">
            <p className="label-classic">Page 01 of 04</p>
            <div className="flex gap-3">
              <button className="btn-gold-outline rounded-full px-5 py-2 text-xs uppercase tracking-[0.12em]">Previous</button>
              <button className="btn-gold rounded-full px-5 py-2 text-xs uppercase tracking-[0.12em]">Next</button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function TaskCard({ task, index }: { task: Task; index: number }) {
  const Icon = ICONS[task.category] ?? Bot;
  const dotColor =
    task.difficulty === "Easy" ? "bg-[oklch(0.55_0.07_175)]" :
    task.difficulty === "Medium" ? "bg-[oklch(0.6_0.13_78)]" :
    "bg-[oklch(0.5_0.12_28)]";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group relative bg-surface/60 backdrop-blur-md border border-transparent border-b-[rgba(197,165,63,0.4)] border-l-2 border-l-transparent hover:border-l-[oklch(0.74_0.13_88)] hover:border-b-[oklch(0.74_0.13_88)] transition-all duration-300 p-7 flex flex-col"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-3.5 w-3.5 text-gold" />
          <span className="label-classic text-gold">{task.category}</span>
        </div>
        <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} title={task.difficulty} />
      </div>

      <h3 className="serif text-xl mt-5 leading-snug text-foreground">{task.title}</h3>
      <p className="text-sm text-silver mt-3 leading-relaxed line-clamp-2">{task.desc}</p>

      <div className="divider-gold my-6 opacity-60" />

      <div className="flex items-baseline justify-between">
        <div>
          <div className="serif text-3xl text-gold tabular-nums">{task.reward.toFixed(2)} <span className="text-base">SOL</span></div>
          <div className="text-xs text-silver mt-1 tabular-nums">≈ ${task.usd.toFixed(2)} USD</div>
        </div>
        <div className="text-right space-y-1">
          <div className="flex items-center justify-end gap-1.5 text-xs text-silver">
            <Clock className="h-3 w-3" /> ≈ {task.minutes} min
          </div>
          <div className="flex items-center justify-end gap-1.5 text-xs text-silver">
            <Users className="h-3 w-3" /> {task.slots} slots
          </div>
        </div>
      </div>

      <button className="btn-gold-outline mt-7 rounded-full py-3 text-xs uppercase tracking-[0.12em] font-medium inline-flex items-center justify-center gap-2">
        Begin task <ArrowUpRight className="h-3.5 w-3.5" />
      </button>

      <p className="text-[11px] text-silver/70 mt-3 text-center">
        Quality threshold · {task.accuracy}% accuracy
      </p>
    </motion.article>
  );
}
