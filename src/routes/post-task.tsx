import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/post-task")({
  head: () => ({
    meta: [
      { title: "Post a Quest — McKWork Guild" },
      { name: "description", content: "Publish a quest to the Guild's adventurers. Pay in SOL or USDC." },
    ],
  }),
  component: PostQuestPage,
});

function PostQuestPage() {
  const steps = ["Basics", "Content", "Media", "Reward", "Slots", "Quality", "Publish"];
  return (
    <div className="min-h-screen text-parchment">
      <Navbar />
      <main className="mx-auto max-w-[1280px] px-4 md:px-8 pt-12 pb-20">
        <div className="quest-rule mb-6"><span>Quest Log · Creation</span></div>
        <h1 className="font-mono text-bronze text-5xl uppercase leading-tight" style={{ textShadow: "2px 2px 0 #000" }}>
          Forge a New Quest
        </h1>
        <p className="accent-italic mt-4 text-xl text-parchment max-w-2xl">
          Seven steps to commission the Guild's adventurers.
        </p>

        {/* Step indicator */}
        <div className="pixel-frame p-6 mt-10">
          <div className="flex items-center justify-between mb-4">
            <span className="label-pixel">Step 01 / 07 · Basics</span>
            <span className="font-mono text-bronze-dim">0%</span>
          </div>
          <div className="stat-bar">
            <span style={{ width: "0%", background: "var(--bronze)" }} />
          </div>
          <div className="grid grid-cols-7 gap-2 mt-4">
            {steps.map((s, i) => (
              <div key={s} className={`text-center label-pixel ${i === 0 ? "text-bronze" : "text-bronze-dim/60"}`}>
                <div className="hidden md:block">{s}</div>
                <div className="md:hidden">{String(i + 1).padStart(2, "0")}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="pixel-frame p-8 mt-6 trim-top">
          <div className="quest-rule mb-6"><span>Quest Basics</span></div>

          <div className="space-y-6">
            <div>
              <label className="label-pixel block mb-3">Quest Title</label>
              <input
                placeholder="Name thy quest…"
                className="w-full bg-black/40 px-4 py-3 font-mono text-base text-parchment placeholder:text-bronze-dim/50 focus:outline-none"
                style={{ border: "2px solid rgba(201,168,124,0.45)", boxShadow: "inset 2px 2px 0 #000" }}
              />
            </div>
            <div>
              <label className="label-pixel block mb-3">Description</label>
              <textarea
                rows={5}
                placeholder="Describe the work as you would brief an artisan…"
                className="w-full bg-black/40 px-4 py-3 font-mono text-base text-parchment placeholder:text-bronze-dim/50 focus:outline-none resize-none"
                style={{ border: "2px solid rgba(201,168,124,0.45)", boxShadow: "inset 2px 2px 0 #000" }}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="label-pixel block mb-3">Discipline</label>
                <select
                  defaultValue=""
                  className="w-full bg-black/40 px-4 py-3 font-mono text-base text-parchment focus:outline-none"
                  style={{ border: "2px solid rgba(201,168,124,0.45)", boxShadow: "inset 2px 2px 0 #000" }}
                >
                  <option value="" disabled>— Select a discipline —</option>
                  {["AI Training", "Image Labeling", "Surveys", "Transcription", "Moderation", "Validation"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-pixel block mb-3">Reward · ⛁ SOL per quest</label>
                <input
                  placeholder="0.00"
                  className="w-full bg-black/40 px-4 py-3 font-mono text-base text-bronze placeholder:text-bronze-dim/50 focus:outline-none"
                  style={{ border: "2px solid rgba(201,168,124,0.45)", boxShadow: "inset 2px 2px 0 #000" }}
                />
              </div>
            </div>
          </div>

          <div className="quest-rule my-8" />
          <div className="flex justify-between items-center">
            <button className="btn-pixel !text-sm !py-2 !px-5">◂ Back</button>
            <button className="btn-pixel-solid">Continue ▸</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
