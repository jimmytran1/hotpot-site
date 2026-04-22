"use client";

import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Menu"] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

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
        className="focus-ring md:hidden flex items-center justify-center w-11 h-11"
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

      {/* Drawer */}
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
        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-7 pb-4">
          <span className="font-display text-xl tracking-track-btn text-white">
            HOTPOT DEN
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
        <div className="mx-7 h-px bg-white/10" />

        {/* Nav links */}
        <nav className="flex-1 flex flex-col px-7 pt-5 gap-0">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="focus-ring flex items-center min-h-12 font-sans font-normal text-sm tracking-widest text-white/65 hover:text-white transition-colors duration-200"
              onClick={() => setOpen(false)}
            >
              {link.toUpperCase()}
            </a>
          ))}
        </nav>

        {/* Contact + CTA */}
        <div className="px-7 pb-10 pt-2 flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <p className="font-sans font-normal text-eyebrow tracking-track-label" style={{ color: "oklch(100% 0 0 / 0.28)" }}>
              CONTACT
            </p>
            <a
              href="tel:+17208262572"
              className="focus-ring font-sans font-light text-sm text-white/55 hover:text-white/80 transition-colors"
              onClick={() => setOpen(false)}
            >
              (720) 826-2572
            </a>
            <a
              href="https://maps.google.com/maps?q=Hotpot+Den+5934+S+Kipling+Pkwy+Ste+E+Littleton+CO+80127"
              target="_blank"
              rel="noreferrer"
              className="focus-ring font-sans font-light text-sm text-white/55 hover:text-white/80 transition-colors"
              onClick={() => setOpen(false)}
            >
              5934 S Kipling Pkwy, Littleton
            </a>
          </div>
          <a
            href="tel:+17208262572"
            className="focus-ring flex items-center justify-center min-h-11 w-full font-sans font-medium text-ui tracking-track-nav border border-white/30 text-white/80 hover:border-white/60 hover:text-white transition-all duration-200"
            onClick={() => setOpen(false)}
          >
            CALL TO RESERVE
          </a>
        </div>
      </div>
    </>
  );
}
