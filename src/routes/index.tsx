import { createFileRoute } from "@tanstack/react-router";
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
      { title: "McKWork Guild — Earn Gold. Complete Quests." },
      {
        name: "description",
        content:
          "Accept microtasks. Validate data. Collect your bounty. The realm's most elegant work-for-crypto guild on Solana.",
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
      <Categories />
      <Testimonials />
      <Register />
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
            <span>Guild Hall · Entrance</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-mono text-bronze leading-[1] uppercase"
            style={{
              fontSize: "clamp(40px, 8vw, 88px)",
              letterSpacing: "0.02em",
              textShadow: "3px 3px 0 #000",
            }}
          >
            Earn Gold.
            <br />
            <span className="text-parchment">Complete Quests.</span>
            <span className="blink text-bronze">_</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="accent-italic mt-8 text-xl md:text-2xl text-bronze max-w-2xl leading-snug"
          >
            Accept microtasks. Validate data. Collect your bounty.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-base text-parchment/80 max-w-xl leading-relaxed"
          >
            McKWork is the realm's most elegant work-for-crypto guild — a parlour for digital
            artisans, where every contribution earns Solana the moment it is verified.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-12 flex flex-wrap gap-5">
            <button className="btn-pixel-solid">
              <span>⟧</span>
              <span>Start Quest</span>
              <span>⟦</span>
            </button>
            <button className="btn-pixel">
              <span>＋</span>
              <span>Post Quest</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Scoreboard — awaiting live data */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 md:mt-28 pixel-frame p-6 md:p-8"
        >
          <div className="quest-rule mb-6">
            <span>Realm Scoreboard</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
            {[
              { l: "Quests Cleared" },
              { l: "Active Agents" },
              { l: "Gold Paid" },
              { l: "Realms Served" },
            ].map((s, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="label-pixel mb-3">{s.l}</div>
                <div className="font-mono text-4xl md:text-5xl tabular-nums text-bronze-dim/60" style={{ textShadow: "2px 2px 0 #000" }}>
                  ——
                </div>
                <div className="empty-line w-20 mt-3" />
              </div>
            ))}
          </div>
          <p className="label-pixel text-bronze-dim/70 mt-8 text-center md:text-left">
            ▸ Awaiting live telemetry
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// AnimatedCounter retained for future live-data wiring
void AnimatedCounter;

/* ---------------- MANIFESTO ---------------- */
function Manifesto() {
  const tenets = [
    "Powered by Solana",
    "Instant Payouts",
    "2% Guild Fee",
    "No Min. Withdrawal",
  ];
  return (
    <section style={{ borderTop: "1px solid rgba(201,168,124,0.2)", borderBottom: "1px solid rgba(201,168,124,0.2)" }}>
      <div className="mx-auto max-w-[1280px] px-4 md:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {tenets.map((t) => (
            <div key={t} className="flex items-center gap-3">
              <span className="inline-block h-2 w-2 bg-bronze" style={{ boxShadow: "1px 1px 0 #000" }} />
              <span className="label-pixel">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- QUEST FLOW (3 steps) ---------------- */
function Quests() {
  const steps = [
    { n: "01", icon: "⛁", title: "Bind Your Wallet", desc: "Phantom, Backpack, Solflare or Glow. Three taps and your character is created — no scrolls of registration required." },
    { n: "02", icon: "✦", title: "Choose Your Quest", desc: "Browse the open Quest Board. Filter by reward, difficulty, time, and discipline. Every quest is hand-curated by the Guild." },
    { n: "03", icon: "◈", title: "Collect Your Gold", desc: "Submit your work. Verification follows promptly. SOL arrives in your treasury within minutes — never weeks." },
  ];
  return (
    <Section eyebrow="Path of the Adventurer" title="Three Steps to First Gold">
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
            <h3 className="font-mono text-xl text-bronze mt-8">{s.title}</h3>
            <p className="mt-4 text-parchment/80 leading-relaxed text-[15px]">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- CATEGORIES ---------------- */
function Categories() {
  const cats = [
    { sigil: "⌬", name: "AI Training", hue: "text-bronze" },
    { sigil: "▣", name: "Image Labeling", hue: "text-teal-faded" },
    { sigil: "✎", name: "Surveys", hue: "text-amethyst" },
    { sigil: "♪", name: "Transcription", hue: "text-bronze" },
    { sigil: "⚑", name: "Moderation", hue: "text-copper" },
    { sigil: "✓", name: "Validation", hue: "text-bronze" },
  ];
  return (
    <Section eyebrow="Disciplines of the Guild" title="A Trade for Every Adventurer">
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
            <div className={`font-mono text-3xl ${c.hue}`} style={{ textShadow: "1px 1px 0 #000" }}>
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
    <Section eyebrow="Letters from the Field" title="Voices of the Adventurers">
      <div className="grid md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="pixel-frame p-8"
          >
            <span className="font-serif text-6xl text-bronze/40 leading-none block">“</span>
            <div className="space-y-3 mt-2">
              <span className="empty-line block w-full" />
              <span className="empty-line block w-11/12" />
              <span className="empty-line block w-3/4" />
            </div>
            <div className="quest-rule my-7" />
            <figcaption className="flex items-center justify-between">
              <div>
                <div className="empty-line block w-24 mb-2" style={{ height: 14 }} />
                <div className="label-pixel mt-1 text-bronze-dim">— · LV —</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-3xl text-bronze-dim/60 tabular-nums" style={{ textShadow: "1px 1px 0 #000" }}>
                  $—
                </div>
                <div className="label-pixel mt-1 text-bronze-dim">Gold</div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- REGISTER ---------------- */
function Register() {
  return (
    <Section eyebrow="High Score" title="This Week's Top Adventurers">
      <div className="pixel-frame overflow-hidden">
        <div className="font-mono text-bronze text-base tracking-[0.2em] px-6 py-4" style={{ borderBottom: "2px solid rgba(201,168,124,0.5)" }}>
          ━━━━ TOP OF THE REGISTER ━━━━
        </div>
        <div className="px-6 py-16 text-center">
          <div className="font-mono text-3xl text-bronze-dim mb-3" style={{ textShadow: "2px 2px 0 #000" }}>
            ▣ ▣ ▣ ▣ ▣
          </div>
          <p className="label-pixel text-bronze-dim">No entries yet · The register awaits its first heroes</p>
          <button className="btn-pixel mt-8 !text-sm !py-2 !px-5">▶ Be the First</button>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const faqs = [
    { q: "How do I receive payment?", a: "Solana arrives in your bound wallet upon verification — typically within two to five minutes of submission." },
    { q: "What kinds of quests are available?", a: "AI training, image labelling, surveys, transcription, content moderation, and data validation. New disciplines are added each week." },
    { q: "Do I need experience to begin?", a: "None whatsoever. Every quest is accompanied by a clear scroll of instructions and worked examples. If you can hold a smartphone, you can earn." },
    { q: "How is quality assured?", a: "Through consensus — three independent agents — or AI validation. This preserves the standard of the Guild and ensures fair compensation." },
    { q: "What is the cost to use McKWork?", a: "Adventurers pay nothing. Patrons are charged a 2% Guild Fee on quests they post." },
  ];
  return (
    <Section eyebrow="Enquiries" title="Questions, Answered">
      <div className="max-w-3xl mx-auto pixel-frame divide-y" style={{ borderColor: "var(--bronze)" }}>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-0"
              style={{ borderBottom: i < faqs.length - 1 ? "1px solid rgba(201,168,124,0.2)" : "none" }}
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
        <h2 className="font-mono text-bronze text-4xl md:text-5xl uppercase leading-tight" style={{ textShadow: "2px 2px 0 #000" }}>
          The Hall is Open.
        </h2>
        <p className="accent-italic mt-6 text-xl text-parchment max-w-xl mx-auto">
          Bind your wallet. Claim your first quest. Begin your ascent.
        </p>
        <button className="btn-pixel-solid mt-10">
          <span>⛁</span>
          <span>Enter the Guild</span>
        </button>
        <p className="mt-6 label-pixel text-bronze-dim">
          Trusted by 10,000+ adventurers across 180 realms
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
        <h2 className="font-mono text-bronze text-3xl md:text-5xl uppercase leading-tight" style={{ textShadow: "2px 2px 0 #000" }}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
