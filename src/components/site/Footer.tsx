import { Link } from "@tanstack/react-router";
import { Sparkles, Twitter, Github, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface/50 mt-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand">
                <Sparkles className="h-5 w-5 text-background" strokeWidth={2.5} />
              </span>
              <span className="text-xl font-bold">
                <span className="text-gradient-brand">McK</span>Work
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm">
              Earn crypto, one task at a time. The smartest way to earn SOL through simple microtasks.
            </p>
            <div className="mt-6 flex gap-2 max-w-sm">
              <Input
                placeholder="your@email.com"
                className="bg-elevated border-border rounded-xl h-11"
              />
              <Button className="bg-gradient-brand text-background font-semibold rounded-xl h-11">
                Subscribe
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Trusted by 10,000+ workers worldwide
            </p>
          </div>

          <FooterCol title="Product" links={["Tasks", "Post a Task", "Leaderboard", "Pricing"]} />
          <FooterCol title="Resources" links={["How it Works", "FAQ", "Blog", "Help Center"]} />
          <FooterCol title="Legal" links={["Terms", "Privacy", "Cookies", "Contact"]} />
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 McKWork. Built on Solana.
          </p>
          <div className="flex gap-2">
            {[Twitter, MessageCircle, Send, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-green transition-all"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-foreground mb-4">{title}</h4>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
