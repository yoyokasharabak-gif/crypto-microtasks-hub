import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Copy, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Worker Dashboard — McKWork" },
      { name: "description", content: "Your earnings, performance and recent activity at a glance." },
    ],
  }),
  component: DashboardPage,
});

const recent = [
  { task: "Identify objects in urban photographs", category: "Image Labeling", reward: "0.05", date: "Today, 14:22", status: "Verified" },
  { task: "Rate the quality of model responses", category: "AI Training", reward: "0.12", date: "Today, 13:08", status: "Pending" },
  { task: "Consumer behaviour study, EU region", category: "Surveys", reward: "0.08", date: "Yesterday", status: "Completed" },
  { task: "Transcribe a 90-second audio clip", category: "Transcription", reward: "0.18", date: "Yesterday", status: "Verified" },
  { task: "Verify business addresses, 12 cities", category: "Validation", reward: "0.14", date: "23 Apr", status: "Verified" },
  { task: "Classify product photographs", category: "Image Labeling", reward: "0.04", date: "23 Apr", status: "Completed" },
];

const statusDot: Record<string, string> = {
  Verified: "bg-[oklch(0.55_0.07_175)]",
  Pending: "bg-[oklch(0.6_0.13_78)]",
  Completed: "bg-[oklch(0.55_0.06_245)]",
};

function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-[1280px] px-6 md:px-10 pt-16 pb-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="label-classic text-gold">The Ledger</p>
            <h1 className="serif text-5xl mt-4">Welcome back, <span className="font-mono text-3xl text-gold">8x7K…3pL9</span></h1>
            <p className="accent-italic mt-4 text-xl text-silver">A seven-day streak. Member since March 2026.</p>
          </div>
          <button className="btn-gold rounded-full px-6 py-3 text-xs uppercase tracking-[0.12em] font-medium self-start md:self-auto">
            Withdraw earnings
          </button>
        </div>

        <div className="divider-gold my-12" />

        {/* KPI cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Kpi label="Total earned" value="12.50" unit="SOL" sub="≈ $312.50 USD" />
          <Kpi label="Available balance" value="3.20" unit="SOL" sub="Ready to withdraw" highlight />
          <Kpi label="Pending verification" value="0.80" unit="SOL" sub="3 tasks in review" />
        </div>

        {/* Performance + Withdraw */}
        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          <div className="card-classic rounded-md p-8 lg:col-span-2">
            <p className="label-classic text-gold">Performance</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
              <Metric value="94%" label="Accuracy" />
              <Metric value="47" label="This week" />
              <Metric value="342" label="Lifetime" />
              <Metric value="2.3 min" label="Response avg." />
            </div>
            <div className="divider-gold my-8" />
            <p className="label-classic text-gold mb-4">Approval rate</p>
            <div className="flex items-center gap-5">
              <div className="serif text-5xl text-gold tabular-nums">98%</div>
              <div className="flex-1 h-1 bg-surface rounded-full overflow-hidden">
                <div className="h-full bg-[oklch(0.74_0.13_88)]" style={{ width: "98%" }} />
              </div>
            </div>
          </div>

          <div className="card-classic rounded-md p-8">
            <p className="label-classic text-gold">Withdraw</p>
            <div className="mt-6">
              <label className="label-classic block mb-3">Amount · SOL</label>
              <div className="relative">
                <input
                  defaultValue="3.20"
                  className="w-full bg-surface border border-[rgba(74,112,139,0.4)] rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[oklch(0.74_0.13_88)] pr-16"
                />
                <button className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-[0.12em] text-gold border border-[rgba(197,165,63,0.4)] rounded-full px-3 py-1.5">
                  Max
                </button>
              </div>
              <label className="label-classic block mt-5 mb-3">Destination</label>
              <input
                defaultValue="8x7K…3pL9"
                className="w-full bg-surface border border-[rgba(74,112,139,0.4)] rounded-full px-5 py-3 text-sm font-mono focus:outline-none focus:border-[oklch(0.74_0.13_88)]"
              />
              <p className="text-xs text-silver mt-4">Network fee · ≈ 0.000005 SOL</p>
              <button className="btn-gold rounded-full w-full py-3 mt-5 text-xs uppercase tracking-[0.12em] font-medium">
                Withdraw now
              </button>
            </div>
          </div>
        </div>

        {/* Recent earnings */}
        <div className="mt-12">
          <div className="flex items-end justify-between">
            <div>
              <p className="label-classic text-gold">Recent earnings</p>
              <h2 className="serif text-3xl mt-2">Your most recent contributions</h2>
            </div>
            <a href="#" className="label-classic text-silver hover:text-gold inline-flex items-center gap-1">
              View all <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>

          <div className="card-classic rounded-md mt-6 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr className="border-b border-[rgba(197,165,63,0.2)]">
                    <th className="text-left label-classic py-5 px-6">Task</th>
                    <th className="text-left label-classic py-5 px-6">Category</th>
                    <th className="text-right label-classic py-5 px-6">Reward</th>
                    <th className="text-left label-classic py-5 px-6">Date</th>
                    <th className="text-left label-classic py-5 px-6">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((r, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      className="border-b border-[rgba(197,165,63,0.08)] last:border-0 hover:bg-[rgba(197,165,63,0.04)] transition-colors"
                    >
                      <td className="py-5 px-6 text-foreground/90">{r.task}</td>
                      <td className="py-5 px-6 text-silver">{r.category}</td>
                      <td className="py-5 px-6 text-right serif text-gold tabular-nums">{r.reward} ◎</td>
                      <td className="py-5 px-6 text-silver">{r.date}</td>
                      <td className="py-5 px-6">
                        <span className="inline-flex items-center gap-2 text-xs text-foreground/80">
                          <span className={`h-1.5 w-1.5 rounded-full ${statusDot[r.status]}`} />
                          {r.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Referral */}
        <div className="card-classic rounded-md p-8 md:p-10 mt-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="label-classic text-gold">Referral programme</p>
            <h2 className="serif text-3xl mt-2">Invite a friend, earn 5%</h2>
            <p className="accent-italic text-lg text-silver mt-3">
              Receive five percent of their earnings for thirty days.
            </p>
          </div>
          <div>
            <label className="label-classic block mb-3">Your link</label>
            <div className="flex gap-3">
              <input
                readOnly
                value="https://mckwork.xyz/r/abc123"
                className="flex-1 bg-surface border border-[rgba(74,112,139,0.4)] rounded-full px-5 py-3 text-sm font-mono"
              />
              <button className="btn-gold-outline rounded-full px-4 py-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em]">
                <Copy className="h-3.5 w-3.5" /> Copy
              </button>
            </div>
            <div className="flex gap-10 mt-6">
              <div>
                <div className="serif text-3xl text-gold tabular-nums">1.20</div>
                <p className="label-classic mt-1">SOL earned</p>
              </div>
              <div>
                <div className="serif text-3xl text-gold tabular-nums">12</div>
                <p className="label-classic mt-1">Friends invited</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Kpi({ label, value, unit, sub, highlight }: { label: string; value: string; unit: string; sub: string; highlight?: boolean }) {
  return (
    <div className={`rounded-md p-8 backdrop-blur-md border transition-colors ${highlight ? "bg-surface/85 border-[rgba(197,165,63,0.4)]" : "card-classic"}`}>
      <p className="label-classic">{label}</p>
      <div className="mt-6 flex items-baseline gap-2">
        <span className="serif text-5xl text-gold tabular-nums">{value}</span>
        <span className="serif text-xl text-gold/70">{unit}</span>
      </div>
      <p className="text-sm text-silver mt-3">{sub}</p>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="serif text-3xl text-gold tabular-nums">{value}</div>
      <p className="label-classic mt-2">{label}</p>
    </div>
  );
}
