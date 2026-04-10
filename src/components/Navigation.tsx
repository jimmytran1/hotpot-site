"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "@/components/MobileNav";

const NAV_LINKS = ["Menu", "About", "Gallery"] as const;

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    // Check immediately in case page loads mid-scroll
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`site-nav fixed inset-x-0 top-0 z-50 flex items-center justify-between px-8 md:px-14${scrolled ? " scrolled" : ""}`}
      style={{ height: "var(--nav-h)" }}
    >
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
          className="focus-ring btn-primary font-sans font-medium text-ui tracking-track-nav px-5 py-3 whitespace-nowrap"
        >
          RESERVE
        </a>
      </div>

      <MobileNav />
    </nav>
  );
}
