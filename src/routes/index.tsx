import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Image as ImageIcon,
  FileText,
  Mic,
  ShieldAlert,
  CheckCircle2,
  Wallet,
  ClipboardList,
  Coins,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { AnimatedCounter } from "@/components/site/AnimatedCounter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "McKWork — Earn with Integrity. Work with Purpose." },
      {
        name: "description",
        content:
          "A considered platform for global microwork on Solana. Reliable tasks, instant payment, restrained design. Join 10,000+ workers worldwide.",
      },
    ],
  }),
  component: Landing,
});

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.9, 0.4, 1.1] as const } },
};

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <Manifesto />
      <HowItWorks />
      <Categories />
      <Testimonials />
      <Register />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 pt-20 md:pt-32 pb-20 md:pb-28">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="max-w-3xl"
        >
          <motion.p variants={fadeUp} className="label-classic text-gold">
            Established 2026 · Built on Solana
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-8 serif text-5xl sm:text-6xl md:text-7xl leading-[1.05]"
          >
            Earn with integrity.
            <br />
            <span className="text-gold accent-italic font-normal">Work with purpose.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-lg text-silver max-w-xl leading-relaxed"
          >
            McKWork is a measured platform for global microwork. Complete tasks of consequence —
            data labelling, validation, transcription, surveys — and receive Solana the moment
            your work is verified.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-12 flex flex-col sm:flex-row gap-4">
            <button className="btn-gold rounded-full px-8 py-4 text-xs uppercase tracking-[0.14em] font-medium inline-flex items-center justify-center gap-2">
              Begin earning <ArrowRight className="h-4 w-4" />
            </button>
            <button className="btn-gold-outline rounded-full px-8 py-4 text-xs uppercase tracking-[0.14em] font-medium">
              Post a task
            </button>
          </motion.div>
        </motion.div>

        {/* Stats — newspaper-style */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-24 md:mt-32 border-t border-[rgba(197,165,63,0.2)] pt-10 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6"
        >
          {[
            { v: 50000, s: "+", l: "Tasks completed" },
            { v: 12000, s: "+", l: "Active workers" },
            { v: 150000, s: "+", l: "Total paid", p: "$" },
            { v: 180, s: "+", l: "Countries served" },
          ].map((s, i) => (
            <div key={i} className="md:border-r md:last:border-r-0 border-[rgba(197,165,63,0.15)] md:pr-6">
              <div className="serif text-4xl md:text-5xl text-gold tabular-nums">
                <AnimatedCounter value={s.v} suffix={s.s} prefix={s.p ?? ""} />
              </div>
              <div className="label-classic mt-3">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- MANIFESTO STRIP ---------- */
function Manifesto() {
  const tenets = [
    "Powered by Solana",
    "Instant payment",
    "Two percent fee",
    "No minimum payout",
  ];
  return (
    <section className="border-y border-[rgba(197,165,63,0.15)]">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {tenets.map((t) => (
            <div key={t} className="flex items-center gap-3">
              <span className="h-px w-8 bg-[oklch(0.74_0.13_88)]" />
              <span className="label-classic text-foreground/90">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- HOW IT WORKS ---------- */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      icon: Wallet,
      title: "Connect your wallet",
      desc: "Phantom, Backpack, Solflare or Glow — connect in seconds. No applications, no waiting list.",
    },
    {
      n: "02",
      icon: ClipboardList,
      title: "Choose your tasks",
      desc: "A curated atelier of microtasks across categories. Filter by reward, difficulty, and time.",
    },
    {
      n: "03",
      icon: Coins,
      title: "Complete and earn",
      desc: "Submit your work. Verification follows promptly. Solana arrives in your wallet within minutes.",
    },
  ];
  return (
    <Section eyebrow="Process" title="Three steps to your first SOL">
      <div className="grid md:grid-cols-3 gap-px bg-[rgba(197,165,63,0.15)] border border-[rgba(197,165,63,0.15)] rounded-md overflow-hidden">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="bg-background p-10 md:p-12"
          >
            <div className="flex items-start justify-between">
              <span className="serif text-4xl text-gold/40">{s.n}</span>
              <s.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
            </div>
            <h3 className="serif text-2xl mt-10">{s.title}</h3>
            <p className="text-silver mt-4 leading-relaxed text-[15px]">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- CATEGORIES ---------- */
function Categories() {
  const cats = [
    { icon: Bot, name: "AI Training", count: 2340 },
    { icon: ImageIcon, name: "Image Labeling", count: 1892 },
    { icon: FileText, name: "Surveys", count: 543 },
    { icon: Mic, name: "Transcription", count: 321 },
    { icon: ShieldAlert, name: "Moderation", count: 156 },
    { icon: CheckCircle2, name: "Validation", count: 892 },
  ];
  return (
    <Section eyebrow="Departments" title="A discipline for every contributor">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {cats.map((c, i) => (
          <motion.button
            key={c.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group card-classic rounded-md p-6 text-left hover-lift"
          >
            <c.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
            <div className="serif text-lg mt-6 leading-tight">{c.name}</div>
            <div className="text-xs text-silver mt-2 tabular-nums">
              {c.count.toLocaleString()} open
            </div>
          </motion.button>
        ))}
      </div>
    </Section>
  );
}

/* ---------- TESTIMONIALS ---------- */
function Testimonials() {
  const items = [
    { quote: "I earned my first $50 in three days labelling images. McKWork has changed my life.", name: "Ahmad", country: "Indonesia", earned: "$50" },
    { quote: "Perfect between classes. I earn ten to fifteen dollars daily, on my own schedule.", name: "Maria", country: "Philippines", earned: "$320" },
    { quote: "Finally — a microtask platform that pays instantly, in crypto, with grace.", name: "John", country: "Nigeria", earned: "$127" },
  ];
  return (
    <Section eyebrow="Correspondence" title="From the global community">
      <div className="grid md:grid-cols-3 gap-px bg-[rgba(197,165,63,0.15)] border border-[rgba(197,165,63,0.15)] rounded-md overflow-hidden">
        {items.map((t, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-background p-10 md:p-12"
          >
            <span className="serif text-6xl text-gold/40 leading-none block">“</span>
            <blockquote className="accent-italic text-xl text-foreground/90 leading-snug -mt-2">
              {t.quote}
            </blockquote>
            <div className="divider-gold my-8" />
            <figcaption className="flex items-center justify-between">
              <div>
                <div className="serif text-lg">{t.name}</div>
                <div className="label-classic mt-1">{t.country}</div>
              </div>
              <div className="text-right">
                <div className="serif text-2xl text-gold tabular-nums">{t.earned}</div>
                <div className="label-classic mt-1">earned</div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}

/* ---------- THE REGISTER (top earners) ---------- */
function Register() {
  const top = [
    { rank: "01", addr: "8x7K…3pL9", sol: "12.84" },
    { rank: "02", addr: "Bn4P…vQ2x", sol: "10.12" },
    { rank: "03", addr: "Cz9M…kR8w", sol: "8.47" },
    { rank: "04", addr: "Df2H…mY1q", sol: "7.20" },
    { rank: "05", addr: "Eg6L…nT4r", sol: "6.55" },
  ];
  return (
    <Section eyebrow="The Register" title="This week's most accomplished">
      <div className="card-classic rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[rgba(197,165,63,0.2)]">
              <th className="text-left label-classic py-5 px-6 w-24">Rank</th>
              <th className="text-left label-classic py-5 px-6">Wallet</th>
              <th className="text-right label-classic py-5 px-6">Earnings</th>
            </tr>
          </thead>
          <tbody>
            {top.map((t) => (
              <tr key={t.rank} className="border-b border-[rgba(197,165,63,0.08)] last:border-0 hover:bg-[rgba(197,165,63,0.04)] transition-colors">
                <td className="py-5 px-6 serif text-gold text-lg">{t.rank}</td>
                <td className="py-5 px-6 font-mono text-foreground/90">{t.addr}</td>
                <td className="py-5 px-6 text-right serif text-gold tabular-nums">{t.sol} ◎</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const faqs = [
    { q: "How do I get paid?", a: "Instantly to your Solana wallet upon verification. Most payments arrive within two to five minutes." },
    { q: "What kind of tasks can I do?", a: "AI training, image labelling, surveys, transcription, moderation and data validation. New disciplines are added weekly." },
    { q: "Do I need experience?", a: "No. Each task is accompanied by clear instructions and worked examples. If you can use a smartphone with care, you can earn." },
    { q: "How are tasks verified?", a: "Through consensus — three independent workers — or AI validation. This preserves quality and ensures fair payment." },
    { q: "What does it cost to use McKWork?", a: "Nothing for workers. Clients are charged a two percent platform fee on tasks they publish." },
  ];
  return (
    <Section eyebrow="Enquiries" title="Questions, answered">
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-px bg-[rgba(197,165,63,0.15)] border border-[rgba(197,165,63,0.15)] rounded-md overflow-hidden">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-background border-0 px-6 md:px-8"
            >
              <AccordionTrigger className="serif text-lg text-left hover:no-underline py-6">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-silver pb-6 leading-relaxed text-[15px]">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}

/* ---------- FINAL CTA ---------- */
function FinalCTA() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 md:px-10 py-24">
      <div className="card-classic rounded-md p-12 md:p-20 text-center border-t-2 border-t-[oklch(0.74_0.13_88)]">
        <p className="label-classic text-gold">An invitation</p>
        <h2 className="serif text-4xl md:text-5xl mt-6 max-w-2xl mx-auto leading-tight">
          Ready to begin earning, <span className="accent-italic text-gold">on your terms?</span>
        </h2>
        <p className="text-silver mt-6 max-w-lg mx-auto">
          Join McKWork today. No email required — only a Solana wallet, and the willingness to do good work.
        </p>
        <button className="btn-gold rounded-full px-10 py-4 mt-10 text-xs uppercase tracking-[0.14em] font-medium inline-flex items-center gap-2">
          <Wallet className="h-4 w-4" /> Connect wallet
        </button>
        <p className="text-xs text-silver/70 mt-5">Trusted by 10,000+ workers in 180 countries.</p>
      </div>
    </section>
  );
}

/* ---------- SECTION HELPER ---------- */
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
    <section className="mx-auto max-w-[1280px] px-6 md:px-10 py-20 md:py-28">
      <div className="flex items-end justify-between mb-12 md:mb-16 flex-wrap gap-6">
        <div className="max-w-2xl">
          <p className="label-classic text-gold">{eyebrow}</p>
          <h2 className="serif text-4xl md:text-5xl mt-4 leading-tight">{title}</h2>
        </div>
        <div className="h-px flex-1 min-w-[80px] bg-[rgba(197,165,63,0.2)] mb-3 hidden md:block" />
      </div>
      {children}
    </section>
  );
}
