import { Link } from "@tanstack/react-router";
import { Diamond, Twitter, Github, MessageCircle, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-[rgba(197,165,63,0.15)] mt-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-[rgba(197,165,63,0.4)] text-gold">
                <Diamond className="h-3.5 w-3.5" strokeWidth={1.5} />
              </span>
              <span className="serif text-2xl font-medium text-gold">McKWork</span>
            </Link>
            <p className="accent-italic mt-6 text-lg text-foreground/85 max-w-sm leading-snug">
              Earn with integrity. Work with purpose.
            </p>
            <p className="mt-4 text-sm text-silver max-w-sm leading-relaxed">
              The considered platform for global microwork on Solana. Restraint, reliability, and instant payment.
            </p>
            <div className="mt-8 flex gap-3 max-w-sm">
              <input
                placeholder="your@email.com"
                className="flex-1 bg-surface border border-[rgba(74,112,139,0.4)] rounded-full px-5 py-3 text-sm placeholder:text-silver/60 focus:outline-none focus:border-[oklch(0.74_0.13_88)] transition-colors"
              />
              <button className="btn-gold rounded-full px-5 py-3 text-xs uppercase tracking-[0.12em] font-medium">
                Subscribe
              </button>
            </div>
          </div>

          <FooterCol title="Platform" links={["Tasks", "Post a Task", "Leaderboard", "Pricing"]} />
          <FooterCol title="Resources" links={["How It Works", "FAQ", "Journal", "Help Centre"]} />
          <FooterCol title="Office" links={["Terms", "Privacy", "Cookies", "Contact"]} />
        </div>

        <div className="divider-gold mt-16" />

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-silver tracking-wide">
            © 2026 McKWork &nbsp;·&nbsp; Built on Solana &nbsp;·&nbsp; Trusted by 10,000+ workers worldwide
          </p>
          <div className="flex gap-2">
            {[Twitter, MessageCircle, Send, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 rounded-full border border-[rgba(197,165,63,0.2)] flex items-center justify-center text-silver hover:text-gold hover:border-[rgba(197,165,63,0.5)] transition-all"
              >
                <Icon className="h-3.5 w-3.5" />
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
      <h4 className="label-classic text-gold mb-5">{title}</h4>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-sm text-silver hover:text-gold transition-colors">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
