"use client";

import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Menu", "About", "Gallery"] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape; manage focus on open/close
  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    } else {
      hamburgerRef.current?.focus();
    }
  }, [open]);

  return (
    <>
      {/* Hamburger — 44×44px touch target */}
      <button
        ref={hamburgerRef}
        className="focus-ring md:hidden flex items-center justify-center w-11 h-11 -mr-2"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="flex flex-col gap-[5px]" aria-hidden="true">
          <span className="block w-6 h-px bg-white/80" />
          <span className="block w-4 h-px bg-white/80" />
        </span>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer — inert when hidden so keyboard can't reach it */}
      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        inert={open ? undefined : true}
        className="fixed inset-y-0 right-0 z-50 w-72 flex flex-col backdrop-blur-xl border-l border-white/7 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          background: "oklch(var(--hero-dark) / 0.97)",
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-7 pt-7 pb-4">
          <span className="font-display text-xl tracking-track-btn text-white">
            HOTPOT
          </span>
          <button
            ref={closeButtonRef}
            className="focus-ring flex items-center justify-center w-11 h-11 -mr-2 text-white/60 hover:text-white transition-colors"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="16" y1="2" x2="2" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="mx-7 h-px bg-white/7" />

        {/* Nav links — each row ≥44px tall */}
        <nav className="flex-1 flex flex-col px-7 pt-4 gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="focus-ring flex items-center min-h-11 font-sans font-medium text-ui tracking-track-nav text-white/60 hover:text-white transition-colors duration-200"
              onClick={() => setOpen(false)}
            >
              {link.toUpperCase()}
            </a>
          ))}
        </nav>

        {/* Reserve CTA */}
        <div className="px-7 pb-10 pt-4">
          <a
            href="#reservations"
            className="focus-ring flex items-center justify-center min-h-11 w-full font-sans font-medium text-ui tracking-track-nav border border-white/30 text-white/80 hover:border-white/60 hover:text-white transition-all duration-200"
            onClick={() => setOpen(false)}
          >
            RESERVE A TABLE
          </a>
        </div>
      </div>
    </>
  );
}
