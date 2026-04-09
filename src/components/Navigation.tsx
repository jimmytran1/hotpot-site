import { MobileNav } from "@/components/MobileNav";

const NAV_LINKS = ["Menu", "About", "Gallery"] as const;

export function Navigation() {
  return (
    <nav className="shrink-0 flex items-center justify-between px-8 pt-7 pb-4 md:px-14">
      <span className="font-display text-xl tracking-track-btn text-white">
        HOTPOT
      </span>

      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="focus-ring font-sans font-medium text-ui tracking-track-nav text-white/70 hover:text-white transition-colors duration-200"
          >
            {link.toUpperCase()}
          </a>
        ))}
        <a
          href="#reservations"
          className="focus-ring font-sans font-medium text-ui tracking-track-nav px-5 py-3 border border-white/30 text-white/80 hover:border-white/60 hover:text-white transition-all duration-200 whitespace-nowrap"
        >
          RESERVE
        </a>
      </div>

      <MobileNav />
    </nav>
  );
}
