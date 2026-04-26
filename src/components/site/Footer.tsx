import { Link } from "@tanstack/react-router";
import { Twitter, Github, MessageCircle, Send } from "lucide-react";
import { PixelEmblem } from "./PixelEmblem";

export function Footer() {
  return (
    <footer className="relative mt-24" style={{ borderTop: "1px solid rgba(201,168,124,0.25)" }}>
      <div className="mx-auto max-w-[1280px] px-4 md:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-3">
              <PixelEmblem size={28} />
              <span className="font-mono text-bronze text-2xl tracking-[0.18em]">McKWORK</span>
            </Link>
            <p className="accent-italic mt-6 text-lg text-parchment max-w-sm leading-snug">
              The realm's most elegant work-for-crypto guild.
            </p>
            <p className="mt-3 text-sm text-bronze-dim max-w-sm leading-relaxed">
              Accept microtasks. Validate data. Collect your bounty. Built on Solana.
            </p>
            <div className="mt-7 flex gap-2 max-w-sm">
              <input
                placeholder="your@scroll.com"
                className="flex-1 bg-black/40 px-4 py-3 font-mono text-sm text-parchment placeholder:text-bronze-dim/60 focus:outline-none"
                style={{ border: "2px solid rgba(201,168,124,0.45)", boxShadow: "inset 2px 2px 0 #000" }}
              />
              <button className="btn-pixel-solid !text-sm !py-2 !px-4">Join</button>
            </div>
          </div>

          <FooterCol title="Hall" links={["Quests", "Post Quest", "Register", "Tariffs"]} />
          <FooterCol title="Scrolls" links={["How It Works", "FAQ", "Codex", "Help"]} />
          <FooterCol title="Office" links={["Terms", "Privacy", "Cookies", "Contact"]} />
        </div>

        <div className="quest-rule mt-14">
          <span>End of Page</span>
        </div>

        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-sm text-bronze-dim tracking-wider">
            © 2026 McKWork Guild · All rights reserved · Built on Solana
          </p>
          <div className="flex gap-2">
            {[Twitter, MessageCircle, Send, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 flex items-center justify-center text-bronze-dim hover:text-bronze transition-colors"
                style={{ border: "2px solid rgba(201,168,124,0.4)", boxShadow: "2px 2px 0 #000" }}
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
      <h4 className="label-pixel mb-5">{title}</h4>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="font-mono text-base text-bronze-dim hover:text-bronze tracking-wider transition-colors">
              ▸ {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
