import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { AnimatedCounter } from "@/components/site/AnimatedCounter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "McKWork — Claim Your Bounty. Sail the Digital Seven Seas." },
      {
        name: "description",
        content:
          "Accept contracts. Validate data. Earn solar gold. The galaxy's most elegant work-for-crypto guild on Solana.",
      },
    ],
  }),
  component: GuildHall,
});

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.9, 0.4, 1.1] as const } },
};

function GuildHall() {
  return (
    <div className="min-h-screen text-parchment">
      <Navbar />
      <Hero />
      <Manifesto />
      <Quests />
      <Bounties />
      <Categories />
      <Testimonials />
      <Leaderboard />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="relative scanlines">
      <div className="mx-auto max-w-[1280px] px-4 md:px-8 pt-16 md:pt-24 pb-20 md:pb-28">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp} className="quest-rule mb-10">
            <span>Hangar Bay · Sector 07</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="leading-[1.05] uppercase"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 7.5vw, 80px)",
              letterSpacing: "0.04em",
              color: "var(--bronze)",
              textShadow: "0 0 24px rgba(212,175,55,0.25), 3px 3px 0 #000",
            }}
          >
            ⟡ Claim Your Bounty ⟡
            <br />
            <span className="text-parchment" style={{ textShadow: "2px 2px 0 #000" }}>
              Sail the Digital Seas
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="accent-italic mt-8 text-xl md:text-2xl text-bronze max-w-2xl leading-snug"
          >
            Accept contracts. Validate data. Earn solar gold.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-base text-parchment/80 max-w-xl leading-relaxed"
          >
            McKWork is the galaxy's most elegant work-for-crypto guild — a hangar for digital
            privateers, where every contract pays out in Solana the moment it is verified.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-12 flex flex-wrap gap-5">
            <Link to="/tasks" className="btn-pixel-solid">
              <span>⚔</span>
              <span>Start Questing</span>
              <span>⚔</span>
            </Link>
            <Link to="/post-task" className="btn-pixel">
              <span>＋</span>
              <span>Post Contract</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scoreboard — awaiting first privateers */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 md:mt-28 pixel-frame p-6 md:p-8"
        >
          <div className="quest-rule mb-6">
            <span>Galactic Scoreboard</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
            {["Contracts Cleared", "Active Privateers", "Solar Gold Paid", "Sectors Served"].map((l) => (
              <div key={l} className="text-center md:text-left">
                <div className="label-pixel mb-3">{l}</div>
                <div
                  className="font-mono text-4xl md:text-5xl tabular-nums text-bronze/40"
                  style={{ textShadow: "2px 2px 0 #000" }}
                >
                  ——
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t-2 border-bronze/15 text-center">
            <p className="label-pixel text-bronze-dim">▸ Awaiting first transmissions from the fleet</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- MANIFESTO ---------------- */
function Manifesto() {
  const tenets = [
    "Powered by Solana",
    "Instant Payouts",
    "2% Guild Fee",
    "No Min. Withdrawal",
  ];
  return (
    <section style={{ borderTop: "2px solid rgba(212,175,55,0.25)", borderBottom: "2px solid rgba(212,175,55,0.25)" }}>
      <div className="mx-auto max-w-[1280px] px-4 md:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {tenets.map((t) => (
            <div key={t} className="flex items-center gap-3">
              <span className="inline-block h-2 w-2 bg-bronze" style={{ boxShadow: "0 0 8px var(--bronze)" }} />
              <span className="label-pixel">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- HOW IT WORKS (3 steps) ---------------- */
function Quests() {
  const steps = [
    {
      n: "01",
      icon: "⛁",
      title: "Connect Your Wallet",
      desc: "Link your Solana wallet to start your journey. We support Phantom, Backpack, Solflare and Glow — three taps and you're in the hangar.",
    },
    {
      n: "02",
      icon: "✦",
      title: "Accept Contracts",
      desc: "Browse the bounty board. Choose missions that match your skills. Every contract ships with clear instructions and worked examples.",
    },
    {
      n: "03",
      icon: "◈",
      title: "Collect Your Gold",
      desc: "Complete the task, get verified by consensus or AI, and SOL lands in your wallet within minutes. Your treasure, your rules.",
    },
  ];
  return (
    <Section eyebrow="Three Steps to First Gold" title="The Privateer's Path">
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="pixel-frame p-8 trim-top"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-5xl text-bronze" style={{ textShadow: "2px 2px 0 #000" }}>{s.n}</span>
              <span className="font-mono text-3xl text-bronze">{s.icon}</span>
            </div>
            <h3 className="text-xl text-bronze mt-8">{s.title}</h3>
            <p className="mt-4 text-parchment/85 leading-relaxed text-[15px]">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- BOUNTIES (sample contracts) ---------------- */
type Bounty = {
  cat: string;
  title: string;
  reward: number;
  usd: number;
  mins: number;
  diff: "Easy" | "Medium" | "Hard";
};
const SAMPLE: Bounty[] = [];

function Bounties() {
  return (
    <Section eyebrow="Open Contracts" title="Today's Bounty Board">
      {SAMPLE.length === 0 ? (
        <div className="pixel-frame p-12 md:p-20 text-center">
          <div className="font-mono text-5xl text-bronze/50 mb-6" style={{ textShadow: "2px 2px 0 #000" }}>
            ⌬ ◇ ⌬
          </div>
          <h3 className="text-2xl text-bronze uppercase tracking-widest" style={{ textShadow: "0 0 14px rgba(212,175,55,0.3)" }}>
            The Bounty Board is Empty
          </h3>
          <p className="accent-italic mt-4 text-lg text-parchment/70 max-w-md mx-auto">
            No contracts have been posted yet. The first patrons of the Guild are arriving soon.
          </p>
          <div className="quest-rule my-8" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="pixel-frame-soft p-6 trim-top opacity-60" style={{ borderStyle: "dashed" }}>
                <div className="h-6 w-24 bg-bronze/10 mb-5" />
                <div className="h-5 w-full bg-bronze/10 mb-3" />
                <div className="h-5 w-3/4 bg-bronze/10" />
                <div className="quest-rule my-6" />
                <div className="flex justify-between">
                  <div>
                    <div className="h-3 w-12 bg-bronze/10 mb-2" />
                    <div className="h-8 w-20 bg-bronze/10" />
                  </div>
                  <div>
                    <div className="h-3 w-10 bg-bronze/10 mb-2" />
                    <div className="h-5 w-16 bg-bronze/10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE.map((b, i) => <BountyCard key={i} b={b} i={i} />)}
        </div>
      )}
    </Section>
  );
}

function BountyCard({ b, i }: { b: Bounty; i: number }) {
  const diffColor = b.diff === "Easy" ? "text-forest" : b.diff === "Medium" ? "text-bronze" : "text-copper";
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: i * 0.05 }}
      className="pixel-frame p-6 trim-top flex flex-col hover:translate-y-[-2px] transition-transform duration-200"
    >
      <div className="flex items-start justify-between">
        <span className="ribbon">{b.cat}</span>
        <span className={`font-mono text-sm ${diffColor} tracking-widest`}>{b.diff.toUpperCase()}</span>
      </div>

      <h3 className="text-lg text-parchment mt-5 leading-snug" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}>
        {b.title}
      </h3>

      <div className="quest-rule my-6" />

      <div className="flex items-baseline justify-between">
        <div>
          <div className="label-pixel text-bronze-dim">Reward</div>
          <div className="font-mono text-3xl text-bronze tabular-nums mt-1" style={{ textShadow: "0 0 12px rgba(212,175,55,0.4)" }}>
            ⛁ {b.reward.toFixed(2)}
          </div>
          <div className="text-xs text-bronze-dim tabular-nums mt-1">≈ ${b.usd.toFixed(2)} USD</div>
        </div>
        <div className="text-right">
          <div className="label-pixel text-bronze-dim">Time</div>
          <div className="font-mono text-base text-parchment mt-1">⧗ ~{b.mins} min</div>
        </div>
      </div>

      <button className="btn-pixel mt-6 w-full !text-sm">
        ⚔ Accept Contract ⚔
      </button>
    </motion.article>
  );
}

/* ---------------- CATEGORIES ---------------- */
function Categories() {
  const cats = [
    { sigil: "⌬", name: "AI Training", hue: "text-bronze" },
    { sigil: "▣", name: "Image Labeling", hue: "text-teal-faded" },
    { sigil: "✎", name: "Surveys", hue: "text-forest" },
    { sigil: "♪", name: "Transcription", hue: "text-bronze" },
    { sigil: "⚑", name: "Moderation", hue: "text-copper" },
    { sigil: "✓", name: "Validation", hue: "text-bronze" },
  ];
  return (
    <Section eyebrow="Disciplines of the Guild" title="A Trade for Every Privateer">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {cats.map((c, i) => (
          <motion.button
            key={c.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="pixel-frame-soft p-5 text-left hover:border-bronze transition-colors group"
          >
            <div className={`font-mono text-3xl ${c.hue}`} style={{ textShadow: "0 0 10px currentColor" }}>
              {c.sigil}
            </div>
            <div className="font-mono text-base text-parchment mt-4 tracking-wider">{c.name}</div>
            <div className="label-pixel mt-2 text-bronze-dim">— open</div>
          </motion.button>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  return (
    <Section eyebrow="Voices from the Fleet" title="Voices of the Privateers">
      <div className="grid md:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="pixel-frame p-8 opacity-70"
            style={{ borderStyle: "dashed" }}
          >
            <span className="font-serif text-6xl text-bronze/30 leading-none block">"</span>
            <div className="mt-4 space-y-3">
              <div className="h-4 w-full bg-bronze/10" />
              <div className="h-4 w-11/12 bg-bronze/10" />
              <div className="h-4 w-2/3 bg-bronze/10" />
            </div>
            <div className="quest-rule my-7" />
            <figcaption className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-24 bg-bronze/10" />
                <div className="h-3 w-32 bg-bronze/10" />
              </div>
              <div className="space-y-2 text-right">
                <div className="h-6 w-16 bg-bronze/10 ml-auto" />
                <div className="h-3 w-12 bg-bronze/10 ml-auto" />
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
      <p className="text-center label-pixel text-bronze-dim mt-8">
        ▸ Awaiting the first testimonies from our privateers
      </p>
    </Section>
  );
}

/* ---------------- LEADERBOARD ---------------- */
function Leaderboard() {
  return (
    <Section eyebrow="High Score" title="This Week's Top Privateers">
      <div className="pixel-frame overflow-hidden">
        <div className="font-mono text-bronze text-base tracking-[0.2em] px-6 py-4" style={{ borderBottom: "2px solid rgba(212,175,55,0.5)" }}>
          ━━━━ TOP OF THE FLEET ━━━━
        </div>
        <div className="px-6 py-16 text-center">
          <div className="font-mono text-4xl text-bronze/40 mb-4" style={{ textShadow: "2px 2px 0 #000" }}>
            ⚜  ◇  ⚜
          </div>
          <h3 className="font-mono text-xl text-bronze uppercase tracking-widest">
            The Register is Empty
          </h3>
          <p className="accent-italic mt-3 text-parchment/70 max-w-md mx-auto">
            No privateers have logged contracts this week. Be the first to claim the throne.
          </p>
          <div className="quest-rule my-8" />
          <ul className="space-y-3 max-w-xl mx-auto">
            {[0, 1, 2, 3, 4].map((i) => (
              <li
                key={i}
                className="flex items-center gap-4 px-4 py-4 opacity-50"
                style={{ border: "2px dashed rgba(212,175,55,0.2)" }}
              >
                <span className="font-mono text-xl text-bronze/40 tabular-nums w-10 text-left" style={{ textShadow: "1px 1px 0 #000" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="h-4 flex-1 bg-bronze/10" />
                <div className="h-4 w-20 bg-bronze/10" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const faqs = [
    { q: "How do I receive payment?", a: "Solana arrives in your linked wallet upon verification — typically within two to five minutes of submission." },
    { q: "What kinds of contracts are available?", a: "AI training, image labelling, surveys, transcription, content moderation, and data validation. New disciplines are added each week." },
    { q: "Do I need experience to begin?", a: "None whatsoever. Every contract ships with a clear briefing and worked examples. If you can hold a smartphone, you can earn." },
    { q: "How is quality assured?", a: "Through consensus — three independent privateers — or AI validation. This preserves the standard of the Guild and ensures fair compensation." },
    { q: "What is the cost to use McKWork?", a: "Privateers pay nothing. Patrons are charged a 2% Guild Fee on contracts they post." },
  ];
  return (
    <Section eyebrow="Enquiries" title="Questions, Answered">
      <div className="max-w-3xl mx-auto pixel-frame" style={{ borderColor: "var(--bronze)" }}>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-0"
              style={{ borderBottom: i < faqs.length - 1 ? "2px solid rgba(212,175,55,0.2)" : "none" }}
            >
              <AccordionTrigger className="font-mono text-lg text-bronze tracking-wider text-left hover:no-underline px-6 py-5">
                ▸ {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-parchment/85 px-6 pb-5 leading-relaxed text-[15px]">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCTA() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 md:px-8 py-20">
      <div className="pixel-frame p-12 md:p-20 text-center trim-top">
        <div className="quest-rule mb-8">
          <span>An Invitation</span>
        </div>
        <h2 className="text-4xl md:text-5xl uppercase leading-tight" style={{ textShadow: "0 0 24px rgba(212,175,55,0.3), 2px 2px 0 #000" }}>
          The Hangar is Open.
        </h2>
        <p className="accent-italic mt-6 text-xl text-parchment max-w-xl mx-auto">
          Link your wallet. Claim your first bounty. Begin your ascent through the galaxy.
        </p>
        <button className="btn-pixel-solid mt-10">
          <span>⛁</span>
          <span>Enter the Guild</span>
        </button>
        <p className="mt-6 label-pixel text-bronze-dim">
          Trusted by 12,000+ privateers across 180 sectors
        </p>
      </div>
    </section>
  );
}

/* ---------------- SECTION HELPER ---------------- */
function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-[1280px] px-4 md:px-8 py-20 md:py-24">
      <div className="mb-12 md:mb-16">
        <div className="quest-rule mb-6">
          <span>{eyebrow}</span>
        </div>
        <h2 className="text-3xl md:text-5xl uppercase leading-tight" style={{ textShadow: "0 0 20px rgba(212,175,55,0.25), 2px 2px 0 #000" }}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
