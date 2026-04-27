import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { useWallet, shortAddr } from "@/lib/wallet";
import { getPostedQuests, savePostedQuest, type PostedQuest } from "@/lib/quests";

export const Route = createFileRoute("/post-task")({
  head: () => ({
    meta: [
      { title: "Contract Registry — McKWork Guild" },
      { name: "description", content: "Publish a contract to the Guild's privateers. Pay in SOL or USDC." },
    ],
  }),
  component: PostQuestPage,
});

const CATEGORIES = [
  "Data Labeling",
  "Image Classification",
  "AI Training",
  "Surveys",
  "Transcription",
  "Content Moderation",
  "Validation",
] as const;

function PostQuestPage() {
  const { connected, address } = useWallet();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<typeof CATEGORIES[number]>("Data Labeling");
  const [reward, setReward] = useState<string>("");
  const [currency, setCurrency] = useState<"SOL" | "USDC">("SOL");
  const [deadline, setDeadline] = useState<string>("");
  const [description, setDescription] = useState("");

  const [registry, setRegistry] = useState<PostedQuest[]>([]);
  useEffect(() => { setRegistry(getPostedQuests()); }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !address) {
      alert("Please connect wallet first");
      return;
    }
    if (!title.trim() || !reward || Number(reward) <= 0) {
      alert("Please fill in title and a reward amount.");
      return;
    }
    const q: PostedQuest = {
      id: `q-${Date.now()}`,
      title: title.trim(),
      category,
      reward: Number(reward),
      currency,
      deadline: deadline || "——",
      description: description.trim(),
      postedBy: address,
      createdAt: Date.now(),
    };
    savePostedQuest(q);
    alert("Quest posted successfully!");
    navigate({ to: "/tasks" });
  };

  return (
    <div className="min-h-screen text-parchment">
      <Navbar />
      <main className="mx-auto max-w-[1280px] px-4 md:px-8 pt-12 pb-20">
        <div className="quest-rule mb-6"><span>Contract Registry · Admiralty</span></div>
        <h1 className="font-mono text-bronze text-4xl md:text-5xl uppercase leading-tight" style={{ textShadow: "2px 2px 0 #000" }}>
          Forge a New Contract
        </h1>
        <p className="accent-italic mt-4 text-xl text-parchment max-w-2xl">
          Publish a quest. The Guild's privateers will answer the call.
        </p>

        {!connected && (
          <div className="pixel-frame p-5 mt-8 flex items-center gap-4" style={{ borderColor: "var(--bronze)" }}>
            <span className="font-mono text-2xl text-bronze">⚠</span>
            <p className="font-mono text-sm text-parchment">
              Wallet not bound. <span className="text-bronze">Connect wallet</span> to publish a contract.
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="pixel-frame p-8 mt-8 trim-top">
          <div className="quest-rule mb-6"><span>Contract Details</span></div>

          <div className="space-y-6">
            <div>
              <label className="label-pixel block mb-3">Task Title *</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Name your contract…"
                className="w-full bg-black/40 px-4 py-3 font-mono text-base text-parchment placeholder:text-bronze-dim/50 focus:outline-none"
                style={{ border: "2px solid rgba(201,168,124,0.45)", boxShadow: "inset 2px 2px 0 #000" }}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="label-pixel block mb-3">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as typeof CATEGORIES[number])}
                  className="w-full bg-black/40 px-4 py-3 font-mono text-base text-parchment focus:outline-none"
                  style={{ border: "2px solid rgba(201,168,124,0.45)", boxShadow: "inset 2px 2px 0 #000" }}
                >
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label-pixel block mb-3">Deadline</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full bg-black/40 px-4 py-3 font-mono text-base text-parchment focus:outline-none"
                  style={{ border: "2px solid rgba(201,168,124,0.45)", boxShadow: "inset 2px 2px 0 #000" }}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className="label-pixel block mb-3">Reward Amount *</label>
                <input
                  type="number"
                  step={0.01}
                  min={0}
                  value={reward}
                  onChange={(e) => setReward(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-black/40 px-4 py-3 font-mono text-base text-bronze placeholder:text-bronze-dim/50 focus:outline-none"
                  style={{ border: "2px solid rgba(201,168,124,0.45)", boxShadow: "inset 2px 2px 0 #000" }}
                />
              </div>
              <div>
                <label className="label-pixel block mb-3">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as "SOL" | "USDC")}
                  className="w-full bg-black/40 px-4 py-3 font-mono text-base text-parchment focus:outline-none"
                  style={{ border: "2px solid rgba(201,168,124,0.45)", boxShadow: "inset 2px 2px 0 #000" }}
                >
                  <option>SOL</option>
                  <option>USDC</option>
                </select>
              </div>
            </div>

            <div>
              <label className="label-pixel block mb-3">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Describe the work as you would brief an artisan…"
                className="w-full bg-black/40 px-4 py-3 font-mono text-base text-parchment placeholder:text-bronze-dim/50 focus:outline-none resize-none"
                style={{ border: "2px solid rgba(201,168,124,0.45)", boxShadow: "inset 2px 2px 0 #000" }}
              />
            </div>
          </div>

          <div className="quest-rule my-8" />
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <p className="label-pixel text-bronze-dim">
              Posted by · {address ? shortAddr(address) : "—— · not bound ——"}
            </p>
            <button type="submit" className="btn-pixel-solid">
              ⟧ Publish to Registry ⟦
            </button>
          </div>
        </form>

        {/* Registry table */}
        <div className="quest-rule mt-14 mb-6"><span>Your Contract Registry</span></div>
        <div className="pixel-frame overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full font-mono min-w-[640px]">
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(212,175,55,0.4)" }}>
                  <th className="text-left label-pixel py-4 px-6">Title</th>
                  <th className="text-left label-pixel py-4 px-6">Category</th>
                  <th className="text-right label-pixel py-4 px-6">Reward</th>
                  <th className="text-right label-pixel py-4 px-6">Deadline</th>
                </tr>
              </thead>
              <tbody>
                {registry.length === 0 ? (
                  <>
                    <tr>
                      <td colSpan={4} className="py-12 text-center">
                        <div className="font-mono text-3xl text-bronze/40 mb-3" style={{ textShadow: "2px 2px 0 #000" }}>
                          ◇  ⌬  ◇
                        </div>
                        <p className="font-mono text-bronze uppercase tracking-widest">No contracts published yet</p>
                        <p className="accent-italic mt-2 text-parchment/70 text-sm">Awaiting first transmissions from the Admiralty</p>
                      </td>
                    </tr>
                    {[0, 1, 2].map((i) => (
                      <tr key={i} className="opacity-50" style={{ borderTop: "2px dashed rgba(212,175,55,0.18)" }}>
                        <td className="py-5 px-6 text-bronze-dim">——</td>
                        <td className="py-5 px-6 text-bronze-dim">——</td>
                        <td className="py-5 px-6 text-right text-bronze-dim">⛁ ——</td>
                        <td className="py-5 px-6 text-right text-bronze-dim">——</td>
                      </tr>
                    ))}
                  </>
                ) : registry.map((r, i) => (
                  <tr key={r.id} style={{ borderBottom: i < registry.length - 1 ? "2px solid rgba(212,175,55,0.15)" : "none" }}>
                    <td className="py-5 px-6 text-parchment uppercase tracking-wider">{r.title}</td>
                    <td className="py-5 px-6 text-bronze-dim">{r.category}</td>
                    <td className="py-5 px-6 text-right text-bronze tabular-nums">⛁ {r.reward.toFixed(2)} {r.currency}</td>
                    <td className="py-5 px-6 text-right text-parchment/80">{r.deadline}</td>
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
