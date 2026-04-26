import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/tasks", label: "Tasks" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/post-task", label: "Post Task" },
  { to: "/leaderboard", label: "Leaderboard" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-strong border-b border-border">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand glow-green">
              <Sparkles className="h-5 w-5 text-background" strokeWidth={2.5} />
            </span>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-gradient-brand">McK</span>
              <span className="text-foreground">Work</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-2 text-sm text-muted-foreground rounded-lg hover:text-foreground hover:bg-white/5 transition-colors"
                activeProps={{ className: "text-foreground bg-white/5" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button
              size="sm"
              className="bg-gradient-brand text-background font-semibold hover:opacity-90 hover:glow-green-strong rounded-xl"
            >
              <Wallet className="h-4 w-4 mr-2" />
              Connect Wallet
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/5 text-foreground"
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
              className="md:hidden overflow-hidden border-t border-border"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {navLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="px-3 py-3 text-base rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5"
                    activeProps={{ className: "text-foreground bg-white/5" }}
                    activeOptions={{ exact: l.to === "/" }}
                  >
                    {l.label}
                  </Link>
                ))}
                <Button className="mt-3 bg-gradient-brand text-background font-semibold rounded-xl h-12">
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
