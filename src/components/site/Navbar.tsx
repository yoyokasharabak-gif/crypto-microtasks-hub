import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { PixelEmblem } from "./PixelEmblem";

const navLinks = [
  { to: "/", label: "Hangar" },
  { to: "/tasks", label: "Bounty Board" },
  { to: "/dashboard", label: "Crew Manifest" },
  { to: "/post-task", label: "Admiralty" },
  { to: "/leaderboard", label: "Contract" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className={`transition-colors duration-300 ${
          scrolled
            ? "bg-[rgba(13,13,13,0.85)] backdrop-blur-sm"
            : "bg-transparent"
        }`}
        style={{
          borderBottom: scrolled
            ? "1px solid rgba(201,168,124,0.4)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 2px 0 #000" : undefined,
        }}
      >
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-4 md:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <PixelEmblem size={26} />
            <span className="font-mono text-bronze text-xl md:text-2xl tracking-[0.16em] leading-none">
              McKWORK
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="font-mono text-[13px] xl:text-sm tracking-[0.18em] uppercase text-bronze-dim hover:text-bronze transition-colors group whitespace-nowrap"
                activeProps={{ className: "text-bronze" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                <span className="inline-block">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">▸ </span>
                  {l.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="hidden xl:flex items-center shrink-0">
            <button className="btn-pixel !py-2 !px-4 !text-sm">
              <span className="text-bronze">⛁</span>
              <span>Connect</span>
            </button>
          </div>

          <button
            className="md:hidden p-2 text-bronze"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Elegant marquee — slow drift signature */}
        <div
          className="hidden md:block overflow-hidden"
          style={{
            borderTop: scrolled ? "1px solid rgba(201,168,124,0.15)" : "1px solid rgba(201,168,124,0.1)",
            background: "rgba(10,10,15,0.55)",
          }}
          aria-hidden="true"
        >
          <div className="marquee-track py-1.5">
            <MarqueeContent />
            <MarqueeContent />
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden bg-[rgba(13,13,13,0.95)]"
              style={{ borderTop: "1px solid rgba(201,168,124,0.3)" }}
            >
              <div className="px-6 py-5 flex flex-col">
                {navLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="font-mono text-lg tracking-[0.2em] uppercase text-bronze-dim hover:text-bronze py-3"
                    activeProps={{ className: "text-bronze" }}
                    activeOptions={{ exact: l.to === "/" }}
                  >
                    ▸ {l.label}
                  </Link>
                ))}
                <button className="btn-pixel mt-4">
                  <span>⛁ Connect Wallet</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

const MARQUEE_ITEMS = [
  "⟡ Claim Your Bounty",
  "✦ Sail the Digital Seven Seas",
  "⛁ Instant Solana Payouts",
  "◈ 50,000+ Contracts Cleared",
  "⚔ Verified by Consensus",
  "✧ 12,000+ Active Privateers",
  "⌬ The Galaxy's Most Elegant Guild",
];

function MarqueeContent() {
  return (
    <div className="marquee-content">
      {MARQUEE_ITEMS.map((t, i) => (
        <span key={i} className="marquee-item">
          <span className="text-bronze">{t.slice(0, 1)}</span>
          <span className="text-bronze-dim">{t.slice(1)}</span>
          <span className="text-bronze/40 mx-6">·</span>
        </span>
      ))}
    </div>
  );
}
