import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Diamond } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/tasks", label: "Tasks" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/post-task", label: "Post Task" },
  { to: "/leaderboard", label: "Leaderboard" },
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
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-[rgba(197,165,63,0.15)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-6 md:px-10">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-[rgba(197,165,63,0.4)] text-gold">
              <Diamond className="h-3.5 w-3.5" strokeWidth={1.5} />
            </span>
            <span className="serif text-2xl font-medium tracking-tight text-gold">
              McKWork
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="label-classic gold-underline text-silver hover:text-gold transition-colors"
                activeProps={{ className: "is-active text-gold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button className="btn-gold-outline rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.12em] font-medium">
              Connect Wallet
            </button>
          </div>

          <button
            className="md:hidden p-2 text-gold"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-[rgba(197,165,63,0.15)] bg-background/95 backdrop-blur-md"
            >
              <div className="px-6 py-6 flex flex-col gap-1">
                {navLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="label-classic py-4 text-silver hover:text-gold border-b border-[rgba(197,165,63,0.08)]"
                    activeProps={{ className: "text-gold" }}
                    activeOptions={{ exact: l.to === "/" }}
                  >
                    {l.label}
                  </Link>
                ))}
                <button className="btn-gold-outline rounded-full px-5 py-3 mt-6 text-xs uppercase tracking-[0.12em] font-medium">
                  Connect Wallet
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
