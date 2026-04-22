"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "@/components/MobileNav";

const NAV_LINKS = ["Menu"] as const;

function PhoneIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16.5 12.9v2.1a1.4 1.4 0 01-1.533 1.4A13.85 13.85 0 012.1 4.033 1.4 1.4 0 013.5 2.5h2.1c.35 0 .65.245.7.582.105.7.35 1.4.665 2.063.14.28.07.63-.175.84L5.74 6.985a11.2 11.2 0 005.25 5.25l1-.052c.21-.245.56-.315.84-.175.663.315 1.363.56 2.063.665.337.052.582.352.607.727z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="15" height="17" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 1.5A5.25 5.25 0 0114.25 6.75c0 3.694-5.25 9.75-5.25 9.75S3.75 10.444 3.75 6.75A5.25 5.25 0 019 1.5z" />
      <circle cx="9" cy="6.75" r="1.5" />
    </svg>
  );
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
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
        HOTPOT DEN
      </span>

      {/* Desktop: subtle info + nav links + reserve */}
      <div className="hidden md:flex items-center gap-7">
        <div className="flex items-center gap-3 whitespace-nowrap" style={{ fontSize: "0.6875rem", letterSpacing: "0.12em" }}>
          <a
            href="tel:+17208262572"
            className="focus-ring font-sans font-normal text-white/60 hover:text-white/80 transition-colors duration-200"
          >
            (720) 826-2572
          </a>
          <span className="text-white/25">·</span>
          <a
            href="https://maps.google.com/maps?q=Hotpot+Den+5934+S+Kipling+Pkwy+Ste+E+Littleton+CO+80127"
            target="_blank"
            rel="noreferrer"
            className="focus-ring font-sans font-normal text-white/60 hover:text-white/80 transition-colors duration-200"
          >
            5934 S Kipling Pkwy
          </a>
        </div>
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
          href="tel:+17208262572"
          className="focus-ring btn-primary font-sans font-medium text-ui tracking-track-nav px-5 py-3 whitespace-nowrap"
        >
          CALL TO RESERVE
        </a>
      </div>

      {/* Mobile: phone icon + location icon + hamburger */}
      <div className="flex md:hidden items-center -mr-1">
        <a
          href="tel:+17208262572"
          aria-label="Call us at (720) 826-2572"
          className="focus-ring flex items-center justify-center w-10 h-10 text-white/60 hover:text-white transition-colors duration-200"
        >
          <PhoneIcon />
        </a>
        <a
          href="https://maps.google.com/maps?q=Hotpot+Den+Littleton+CO"
          target="_blank"
          rel="noreferrer"
          aria-label="Get directions to Hotpot Den"
          className="focus-ring flex items-center justify-center w-10 h-10 text-white/60 hover:text-white transition-colors duration-200"
        >
          <MapPinIcon />
        </a>
        <MobileNav />
      </div>
    </nav>
  );
}
