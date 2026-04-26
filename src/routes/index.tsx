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

        {/* Scoreboard */}
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
              { v: 50000, s: "+", l: "Quests Cleared", c: "text-bronze" },
              { v: 12000, s: "+", l: "Active Agents", c: "text-teal-faded" },
              { v: 150000, s: "+", l: "Gold Paid", p: "$", c: "text-bronze" },
              { v: 180, s: "+", l: "Realms Served", c: "text-amethyst" },
            ].map((s, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="label-pixel mb-3">{s.l}</div>
                <div className={`font-mono text-4xl md:text-5xl tabular-nums ${s.c}`} style={{ textShadow: "2px 2px 0 #000" }}>
                  <AnimatedCounter value={s.v} suffix={s.s} prefix={s.p ?? ""} />
                </div>
              </div>
            ))}
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
    { sigil: "⌬", name: "AI Training", count: 2340, hue: "text-bronze" },
    { sigil: "▣", name: "Image Labeling", count: 1892, hue: "text-teal-faded" },
    { sigil: "✎", name: "Surveys", count: 543, hue: "text-amethyst" },
    { sigil: "♪", name: "Transcription", count: 321, hue: "text-bronze" },
    { sigil: "⚑", name: "Moderation", count: 156, hue: "text-copper" },
    { sigil: "✓", name: "Validation", count: 892, hue: "text-bronze" },
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
            style={{ boxShadow: "2px 2px 0 #000" }}
          >
            <div className={`font-mono text-3xl ${c.hue}`} style={{ textShadow: "1px 1px 0 #000" }}>
              {c.sigil}
            </div>
            <div className="font-mono text-base text-parchment mt-4 tracking-wider">{c.name}</div>
            <div className="label-pixel mt-2 text-bronze-dim">
              {c.count.toLocaleString()} open
            </div>
          </motion.button>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  const items = [
    { quote: "I earned my first $50 in three days labelling images. McKWork has changed my life.", name: "Ahmad", country: "Indonesia", earned: "50", lvl: 8 },
    { quote: "Perfect between classes. I earn ten to fifteen dollars daily, on my own schedule.", name: "Maria", country: "Philippines", earned: "320", lvl: 14 },
    { quote: "Finally — a microtask platform that pays instantly, in crypto, with grace.", name: "John", country: "Nigeria", earned: "127", lvl: 11 },
  ];
  return (
    <Section eyebrow="Letters from the Field" title="Voices of the Adventurers">
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((t, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="pixel-frame p-8"
          >
            <span className="font-serif text-6xl text-bronze/40 leading-none block">“</span>
            <blockquote className="accent-italic text-lg text-parchment leading-snug -mt-2">
              {t.quote}
            </blockquote>
            <div className="quest-rule my-7" />
            <figcaption className="flex items-center justify-between">
              <div>
                <div className="font-mono text-bronze text-lg tracking-wider">{t.name}</div>
                <div className="label-pixel mt-1 text-bronze-dim">{t.country} · LV {t.lvl}</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-3xl text-bronze tabular-nums" style={{ textShadow: "1px 1px 0 #000" }}>
                  ${t.earned}
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
  const top = [
    { rank: "01", addr: "8x7K…3pL9", sol: "12.84", lvl: 23 },
    { rank: "02", addr: "Bn4P…vQ2x", sol: "10.12", lvl: 21 },
    { rank: "03", addr: "Cz9M…kR8w", sol: "8.47", lvl: 19 },
    { rank: "04", addr: "Df2H…mY1q", sol: "7.20", lvl: 17 },
    { rank: "05", addr: "Eg6L…nT4r", sol: "6.55", lvl: 16 },
  ];
  return (
    <Section eyebrow="High Score" title="This Week's Top Adventurers">
      <div className="pixel-frame overflow-hidden">
        <div className="font-mono text-bronze text-base tracking-[0.2em] px-6 py-4" style={{ borderBottom: "1px solid rgba(201,168,124,0.4)" }}>
          ━━━━ TOP OF THE REGISTER ━━━━
        </div>
        <table className="w-full font-mono text-base">
          <tbody>
            {top.map((t) => (
              <tr key={t.rank} className="hover:bg-bronze/5 transition-colors" style={{ borderBottom: "1px solid rgba(201,168,124,0.12)" }}>
                <td className="py-4 px-6 text-bronze text-xl w-20" style={{ textShadow: "1px 1px 0 #000" }}>{t.rank}</td>
                <td className="py-4 px-6 text-parchment">{t.addr}</td>
                <td className="py-4 px-6 text-bronze-dim text-sm tracking-wider">LV {t.lvl}</td>
                <td className="py-4 px-6 text-right text-bronze text-xl tabular-nums" style={{ textShadow: "1px 1px 0 #000" }}>
                  ⛁ {t.sol}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
