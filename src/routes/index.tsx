import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Wallet,
  ClipboardList,
  Coins,
  Zap,
  Globe,
  Wallet as WalletIcon,
  Target,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Bot,
  Image as ImageIcon,
  FileText,
  Mic,
  ShieldAlert,
  CheckCircle2,
  Trophy,
  CircleCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
      { title: "McKWork — Earn SOL by Completing Simple Microtasks" },
      {
        name: "description",
        content:
          "Join 10,000+ workers worldwide. Get paid instantly in SOL for image labeling, surveys, transcription, and more. No experience needed.",
      },
    ],
  }),
  component: Landing,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <TrustBadges />
      <HowItWorks />
      <Features />
      <Categories />
      <Testimonials />
      <Leaderboard />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-brand pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

      {/* Floating coins */}
      <FloatingCoin className="top-24 left-[8%] hidden md:block" delay={0} />
      <FloatingCoin className="top-40 right-[10%] hidden md:block" delay={1.5} purple />
      <FloatingCoin className="bottom-24 left-[15%] hidden lg:block" delay={2.8} />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 pt-20 md:pt-28 pb-16 md:pb-24">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeUp}>
            <Badge className="glass border-primary/30 text-primary rounded-full px-4 py-1.5 text-xs font-medium">
              <Sparkles className="h-3 w-3 mr-1.5" />
              Powered by Solana · Instant payouts
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]"
          >
            McKWork —{" "}
            <span className="text-gradient-brand">Earn SOL</span>{" "}
            by Completing Simple Microtasks
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Join 10,000+ workers worldwide. Get paid instantly for tasks like image labeling,
            data validation, and surveys. No experience needed. Start earning today.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="h-14 px-8 rounded-xl bg-gradient-brand text-background font-semibold text-base hover:opacity-95 hover:glow-green-strong transition-all"
            >
              Start Earning Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 rounded-xl border-border bg-white/[0.02] text-foreground hover:bg-white/[0.05] hover:border-primary/40 text-base"
            >
              Post a Task
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6"
          >
            {[
              { v: 50000, s: "+", l: "Tasks Completed" },
              { v: 12000, s: "+", l: "Active Workers" },
              { v: 150000, s: "+", l: "Total Paid", p: "$" },
              { v: 180, s: "+", l: "Countries Served" },
            ].map((s, i) => (
              <div key={i} className="glass rounded-2xl p-4 md:p-6 hover-lift">
                <div className="text-2xl md:text-4xl font-bold text-gradient-brand">
                  <AnimatedCounter value={s.v} suffix={s.s} prefix={s.p ?? ""} />
                </div>
                <div className="mt-1 text-xs md:text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingCoin({
  className,
  delay = 0,
  purple = false,
}: {
  className?: string;
  delay?: number;
  purple?: boolean;
}) {
  return (
    <div
      className={`absolute h-12 w-12 rounded-full animate-float ${className}`}
      style={{
        animationDelay: `${delay}s`,
        background: purple
          ? "radial-gradient(circle at 30% 30%, #c794ff, #9945FF)"
          : "radial-gradient(circle at 30% 30%, #7df5c2, #14F195)",
        boxShadow: purple
          ? "0 0 30px rgba(153,69,255,0.4)"
          : "0 0 30px rgba(20,241,149,0.4)",
      }}
    >
      <div className="h-full w-full rounded-full flex items-center justify-center text-background font-bold text-xs">
        ◎
      </div>
    </div>
  );
}

/* ---------- TRUST BADGES ---------- */
function TrustBadges() {
  const items = [
    { icon: ShieldCheck, label: "Powered by Solana" },
    { icon: Zap, label: "Instant Payments" },
    { icon: CircleCheck, label: "No Hidden Fees" },
    { icon: Globe, label: "Global Community" },
  ];
  return (
    <section className="border-y border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 justify-center text-sm text-muted-foreground">
              <Icon className="h-4 w-4 text-primary" />
              <span>{label}</span>
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
      icon: Wallet,
      title: "Connect Your Wallet",
      desc: "Connect Phantom, Backpack, or Solflare in seconds. No signup forms.",
    },
    {
      icon: ClipboardList,
      title: "Choose Your Tasks",
      desc: "Browse thousands of microtasks from categories that match your skills.",
    },
    {
      icon: Coins,
      title: "Complete & Earn",
      desc: "Finish tasks, get verified, receive SOL instantly to your wallet.",
    },
  ];
  return (
    <Section
      eyebrow="Getting Started"
      title={<>Three steps to <span className="text-gradient-brand">your first SOL</span></>}
      subtitle="No applications. No waiting. Just connect and start earning."
    >
      <div className="grid md:grid-cols-3 gap-6 relative">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="relative glass rounded-2xl p-6 md:p-8 hover-lift hover:border-primary/30 transition-colors text-center"
          >
            <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-brand-soft border border-primary/30 flex items-center justify-center mb-5 relative">
              <s.icon className="h-7 w-7 text-primary" />
              <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-gradient-brand text-background text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
            </div>
            <h3 className="text-xl font-bold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- FEATURES ---------- */
function Features() {
  const features = [
    { icon: Zap, title: "Instant Payments", desc: "Receive SOL seconds after task completion. No waiting weeks for payment." },
    { icon: WalletIcon, title: "Low Fees", desc: "Only 2% platform fee — we keep microtasks truly micro." },
    { icon: Globe, title: "Global Access", desc: "Anyone with internet and a Solana wallet can work, anywhere." },
    { icon: Target, title: "No Minimum Payout", desc: "Withdraw any amount, anytime. Even $0.10 — your money, your rules." },
  ];
  return (
    <Section
      eyebrow="Why McKWork"
      title={<>Built for <span className="text-gradient-brand">real workers</span></>}
      subtitle="Everything you need to start earning crypto, without the friction."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="glass rounded-2xl p-6 hover-lift hover:border-primary/30 group transition-all"
          >
            <div className="h-12 w-12 rounded-xl bg-gradient-brand-soft flex items-center justify-center mb-4 group-hover:glow-green transition-all">
              <f.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-lg">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- CATEGORIES ---------- */
function Categories() {
  const cats = [
    { icon: Bot, name: "AI Training", count: 2340, color: "from-primary/20 to-primary/5" },
    { icon: ImageIcon, name: "Image Labeling", count: 1892, color: "from-secondary/20 to-secondary/5" },
    { icon: FileText, name: "Surveys", count: 543, color: "from-info/20 to-info/5" },
    { icon: Mic, name: "Transcription", count: 321, color: "from-warning/20 to-warning/5" },
    { icon: ShieldAlert, name: "Content Moderation", count: 156, color: "from-destructive/20 to-destructive/5" },
    { icon: CheckCircle2, name: "Data Validation", count: 892, color: "from-success/20 to-success/5" },
  ];
  return (
    <Section
      eyebrow="Task Categories"
      title={<>Pick what you <span className="text-gradient-brand">love doing</span></>}
      subtitle="From AI training to surveys — there's something for everyone."
    >
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:grid md:grid-cols-3 lg:grid-cols-6 md:overflow-visible scrollbar-hide">
        {cats.map((c, i) => (
          <motion.button
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={`min-w-[180px] md:min-w-0 glass rounded-2xl p-5 text-left hover-lift hover:border-primary/40 hover:glow-green transition-all bg-gradient-to-br ${c.color}`}
          >
            <c.icon className="h-7 w-7 text-foreground mb-3" />
            <div className="font-semibold text-sm">{c.name}</div>
            <div className="text-xs text-muted-foreground mt-1 tabular-nums">
              {c.count.toLocaleString()} tasks
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
    {
      quote: "I earned my first $50 in just 3 days labeling images. McKWork changed my life.",
      name: "Ahmad",
      country: "Indonesia 🇮🇩",
      earned: "$50",
      initials: "AH",
    },
    {
      quote: "Perfect for students like me. I earn $10–15 daily between classes.",
      name: "Maria",
      country: "Philippines 🇵🇭",
      earned: "$320",
      initials: "MA",
    },
    {
      quote: "Finally a microtask platform that pays instantly in crypto!",
      name: "John",
      country: "Nigeria 🇳🇬",
      earned: "$127",
      initials: "JO",
    },
  ];
  return (
    <Section
      eyebrow="Success Stories"
      title={<>Real workers, <span className="text-gradient-brand">real earnings</span></>}
      subtitle="Stories from our global community of earners."
    >
      <div className="grid md:grid-cols-3 gap-5">
        {items.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="glass rounded-2xl p-6 hover-lift relative overflow-hidden"
          >
            <div className="absolute -top-6 -right-6 text-8xl text-primary/10 font-serif select-none">"</div>
            <p className="relative text-foreground/90 leading-relaxed">{t.quote}</p>
            <div className="mt-6 flex items-center gap-3">
              <Avatar className="h-11 w-11 border border-primary/30">
                <AvatarFallback className="bg-gradient-brand text-background font-bold">
                  {t.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.country}</div>
              </div>
              <Badge className="bg-primary/15 text-primary border border-primary/30 rounded-full">
                {t.earned} earned
              </Badge>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- LEADERBOARD ---------- */
function Leaderboard() {
  const top = [
    { rank: 1, addr: "8x7K...3pL9", sol: "12.84", verified: true },
    { rank: 2, addr: "Bn4P...vQ2x", sol: "10.12", verified: true },
    { rank: 3, addr: "Cz9M...kR8w", sol: "8.47", verified: true },
  ];
  const medals = ["🥇", "🥈", "🥉"];
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-12">
      <div className="glass rounded-3xl p-6 md:p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-brand opacity-50 pointer-events-none" />
        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Badge className="glass border-primary/30 text-primary rounded-full">
              <Trophy className="h-3 w-3 mr-1.5" /> Top Earners
            </Badge>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold">
              This week's <span className="text-gradient-brand">top earners</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Rise the ranks. Earn badges. Get featured. The more you work, the more you earn.
            </p>
            <Button className="mt-6 bg-gradient-brand text-background font-semibold rounded-xl">
              View Full Leaderboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            {top.map((t, i) => (
              <motion.div
                key={t.rank}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-strong rounded-2xl p-4 flex items-center gap-4 hover:border-primary/40 transition-colors"
              >
                <div className="text-2xl w-8 text-center">{medals[i]}</div>
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-elevated text-primary text-xs font-bold">
                    {t.addr.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-sm flex items-center gap-1.5">
                    {t.addr}
                    {t.verified && <ShieldCheck className="h-3.5 w-3.5 text-primary" />}
                  </div>
                  <div className="text-xs text-muted-foreground">Rank #{t.rank}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary tabular-nums">{t.sol} ◎</div>
                  <div className="text-xs text-muted-foreground">SOL</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const faqs = [
    {
      q: "How do I get paid?",
      a: "Instantly to your Solana wallet after your task is verified. Most payments arrive in 2–5 minutes.",
    },
    {
      q: "What kind of tasks can I do?",
      a: "AI training, image labeling, surveys, transcription, content moderation, and data validation. New categories added regularly.",
    },
    {
      q: "Do I need experience?",
      a: "No. Every task includes clear step-by-step instructions and examples. If you can use a smartphone, you can earn.",
    },
    {
      q: "How are tasks verified?",
      a: "We use a consensus method (3 workers agree) or AI validation. This keeps quality high and ensures fair payments.",
    },
    {
      q: "What does it cost to use McKWork?",
      a: "Nothing for workers. Clients pay a 2% platform fee on tasks they post.",
    },
  ];
  return (
    <Section
      eyebrow="FAQ"
      title={<>Questions? <span className="text-gradient-brand">We've got answers</span></>}
      subtitle="Everything you need to know before you start."
    >
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="glass rounded-2xl px-5 border-border data-[state=open]:border-primary/30 data-[state=open]:glow-green"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
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
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-16">
      <div className="relative overflow-hidden rounded-3xl glass-strong p-10 md:p-16 text-center">
        <div className="absolute inset-0 bg-radial-brand opacity-80 pointer-events-none" />
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="relative">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Ready to <span className="text-gradient-brand">start earning?</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Join McKWork today and turn your spare time into crypto. Every task brings you closer to your goal.
          </p>
          <Button
            size="lg"
            className="mt-8 h-14 px-10 rounded-xl bg-gradient-brand text-background font-semibold text-base hover:glow-green-strong"
          >
            <Wallet className="h-5 w-5 mr-2" />
            Create Free Account
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">
            No email required. Just connect your Solana wallet.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- SECTION HELPER ---------- */
function Section({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <Badge className="glass border-primary/30 text-primary rounded-full">{eyebrow}</Badge>
        <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">{title}</h2>
        {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
