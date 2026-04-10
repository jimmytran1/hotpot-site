"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ─── Data ────────────────────────────────────────────────── */

const PRICING = [
  { label: "Lunch Special", price: "$27.99", note: "Mon–Fri" },
  { label: "Adult",         price: "$31.99", note: "Dinner / Weekend" },
  { label: "Kids 6–12",     price: "$16.99", note: "" },
  { label: "Kids 3–5",      price: "$10.99", note: "" },
] as const;

const BROTHS = [
  { name: "Spicy",      img: "/spicy-broth.png" },
  { name: "Pho",        img: "/pho-broth.png" },
  { name: "Pork",       img: "/pork-broth.png" },
  { name: "Seafood",    img: "/seafood-broth.png" },
  { name: "Miso",       img: "/miso-broth.png" },
  { name: "Spicy Miso", img: "/spicymiso-broth.png" },
  { name: "Vegetable",  img: "/vegetable-broth.png" },
  { name: "Tomyum",     img: "/tomyum-broth.png" },
] as const;

const CATEGORIES = [
  {
    id: "meats",
    label: "Meats",
    items: [
      "Fatty Beef", "Fatty Lamb", "Pork Belly",
      "Beef Eye Round", "Ribeye", "Brisket",
      "Tripe", "Spam",
    ],
  },
  {
    id: "seafood",
    label: "Seafood",
    items: [
      "Blue Crab", "Swai Fillet", "Mussel",
      "Shrimp", "Squid Rings", "Oyster",
      "Clam", "Baby Clam", "Baby Octopus",
    ],
  },
  {
    id: "meatballs",
    label: "Meatballs",
    items: [
      "Meatball", "Lobster Ball", "Fish Ball",
      "Shrimp Ball", "Vegetable Ball", "Mini Sausage",
      "Fish Tofu", "Imitation Crab", "Quail Egg", "Rice Cake",
    ],
  },
  {
    id: "vegetables",
    label: "Vegetables",
    items: [
      "Napa Cabbage", "Watercress", "Tong Ho",
      "Spinach", "Mustard Greens", "Baby Bok Choy",
      "Potato", "Lotus Root", "Sliced Pumpkin",
      "Enoki Mushroom", "King Oyster Mushroom", "Seafood Mushroom",
      "Tofu",
    ],
  },
  {
    id: "noodles",
    label: "Noodles & Dumplings",
    items: ["Ramen", "Pho Noodles", "Udon", "Bean Thread Noodles"],
  },
] as const;

const NAV_TABS = [
  { id: "broths",     label: "Broths" },
  { id: "meats",      label: "Meats" },
  { id: "seafood",    label: "Seafood" },
  { id: "meatballs",  label: "Meatballs" },
  { id: "vegetables", label: "Vegetables" },
  { id: "noodles",    label: "Noodles" },
] as const;

/* ─── Tokens ──────────────────────────────────────────────── */
const SURFACE = "oklch(97% 0.005 30)";
const DARK    = "oklch(14% 0.015 30)";
const MID     = "oklch(38% 0.010 30)";
const MUTED   = "oklch(58% 0.008 30)";
const BORDER  = "oklch(84% 0.008 30)";
const GOLD    = "oklch(72% 0.13 55)";
const RED     = "oklch(42% 0.19 25)";

/*
  Combined sticky height used for scroll offsets:
  --nav-h (72px) + menu sub-nav (~48px) + 4px breathing room = ~124px
*/
const SCROLL_MARGIN = "124px";

/* ══════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════ */
export function MenuSection() {
  const [activeTab, setActiveTab] = useState<string>("broths");
  const [hoveredBroth, setHoveredBroth] = useState<number | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const navRef      = useRef<HTMLDivElement>(null);
  const isMounted   = useRef(false);

  /* ── Intersection observer for active tab ─────────────── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_TABS.forEach(({ id }) => {
      const el = sectionRefs.current.get(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveTab(id); },
        /*
          Detection window: 10%–25% from viewport top.
          After scrollIntoView with SCROLL_MARGIN (124px), a section
          lands at ~124px from the top. On an 800px viewport that's
          15.5% — squarely in the 10–25% detection band.
        */
        { rootMargin: "-10% 0px -75% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ── Keep active tab in view on mobile (skip mount) ────── */
  useEffect(() => {
    if (!isMounted.current) { isMounted.current = true; return; }
    if (!navRef.current) return;
    const activeEl = navRef.current.querySelector(`[data-tab="${activeTab}"]`);
    if (!activeEl) return;
    activeEl.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [activeTab]);

  function setRef(id: string) {
    return (el: HTMLElement | null) => {
      if (el) sectionRefs.current.set(id, el);
    };
  }

  function handleTabClick(id: string) {
    sectionRefs.current.get(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section id="menu" style={{ background: SURFACE }}>

      {/* ── Header ──────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-8 md:px-14 pt-24 md:pt-32 pb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-7 h-px shrink-0" style={{ background: GOLD }} />
          <p className="font-sans font-normal text-eyebrow tracking-track-label" style={{ color: MUTED }}>
            ALL YOU CAN EAT · 2 HOUR LIMIT
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <h2
            className="font-display leading-display"
            style={{ color: DARK, fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            THE MENU.
          </h2>

          {/* Pricing */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-px"
            style={{ background: BORDER }}
          >
            {PRICING.map(({ label, price, note }) => (
              <dl key={label} className="flex flex-col gap-1 px-5 py-4" style={{ background: SURFACE }}>
                <dt className="font-sans font-normal text-eyebrow tracking-track-label" style={{ color: MUTED }}>
                  {label.toUpperCase()}
                </dt>
                <dd
                  className="font-display"
                  style={{ color: RED, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", lineHeight: 1 }}
                >
                  {price}
                </dd>
                {note && (
                  <dd className="font-sans font-light text-eyebrow tracking-track-label" style={{ color: MUTED }}>
                    {note}
                  </dd>
                )}
              </dl>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sticky sub-nav — sits below the fixed site nav ── */}
      <div
        className="sticky z-40"
        style={{
          top: "var(--nav-h)",
          background: SURFACE,
          borderBottom: `1px solid ${BORDER}`,
          overflowX: "clip", /* clip prevents sticky from creating a scroll container that traps page scroll */
        }}
      >
        <div
          ref={navRef}
          className="max-w-6xl mx-auto px-8 md:px-14 flex overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
          role="tablist"
        >
          {NAV_TABS.map(({ id, label }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={isActive}
                data-tab={id}
                onClick={() => handleTabClick(id)}
                className="focus-ring relative shrink-0 font-sans font-medium text-ui tracking-track-nav py-4 px-5 transition-colors duration-200"
                style={{ color: isActive ? DARK : MUTED }}
                onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = MID; }}
                onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = MUTED; }}
              >
                {label.toUpperCase()}
                <span
                  className="absolute bottom-0 left-5 right-5 transition-opacity duration-300"
                  style={{ height: "1.5px", background: RED, opacity: isActive ? 1 : 0 }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-8 md:px-14 pb-24 md:pb-32">

        {/* Broths */}
        <div
          ref={setRef("broths")}
          id="menu-broths"
          className="mt-16"
          style={{ scrollMarginTop: SCROLL_MARGIN }}
        >
          <CategoryLabel>Broths</CategoryLabel>

          {/* Mobile: 2 rows of 4, circles span full row width */}
          <div className="md:hidden mt-8 flex flex-col gap-5">
            {[0, 4].map((start) => (
              <div key={start} className="flex items-start">
                {BROTHS.slice(start, start + 4).map(({ name, img }, i) => (
                  <div
                    key={name}
                    className="relative"
                    style={{ flex: "1 0 0", marginLeft: i === 0 ? 0 : "-10px", zIndex: i }}
                  >
                    <div
                      className="relative overflow-hidden rounded-full"
                      style={{
                        width: "100%",
                        aspectRatio: "1",
                        outline: `3px solid ${SURFACE}`,
                        outlineOffset: "-1px",
                        background: BORDER,
                      }}
                    >
                      <Image src={img} alt={`${name} broth`} fill sizes="30vw" className="object-cover" />
                    </div>
                    <span
                      className="mt-2 block font-sans font-medium tracking-track-label text-center overflow-hidden"
                      style={{ color: MID, fontSize: "0.6875rem", lineHeight: 1.3, maxWidth: "calc(100% - 10px)" }}
                    >
                      {name.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Desktop: single overlapping row spanning full content width */}
          <div className="hidden md:flex items-start mt-8">
            {BROTHS.map(({ name, img }, i) => (
              <div
                key={name}
                className="relative"
                style={{
                  flex: "1 0 0",
                  marginLeft: i === 0 ? 0 : "-24px",
                  zIndex: hoveredBroth === i ? BROTHS.length + 1 : i,
                }}
                onMouseEnter={() => setHoveredBroth(i)}
                onMouseLeave={() => setHoveredBroth(null)}
              >
                <div
                  className="relative overflow-hidden rounded-full"
                  style={{
                    width: "100%",
                    aspectRatio: "1",
                    outline: `3px solid ${SURFACE}`,
                    outlineOffset: "-1px",
                    background: BORDER,
                    transform: hoveredBroth === i ? "scale(1.07)" : "scale(1)",
                    transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <Image src={img} alt={`${name} broth`} fill sizes="14vw" className="object-cover" />
                </div>
                <span
                  className="mt-2 block font-sans font-medium tracking-track-label text-center overflow-hidden"
                  style={{ color: MID, fontSize: "clamp(0.6875rem, 1.1vw, 0.875rem)", lineHeight: 1.3, maxWidth: "calc(100% - 24px)" }}
                >
                  {name.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* All other categories */}
        {CATEGORIES.map(({ id, label, items }) => (
          <div
            key={id}
            ref={setRef(id)}
            id={`menu-${id}`}
            className="mt-16 pt-8"
            style={{
              borderTop: `1px solid ${BORDER}`,
              scrollMarginTop: SCROLL_MARGIN,
            }}
          >
            <CategoryLabel>{label}</CategoryLabel>
            <ItemGrid items={items as readonly string[]} />
          </div>
        ))}

      </div>
    </section>
  );
}

/* ─── Sub-components ──────────────────────────────────────── */

function CategoryLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-7 h-px shrink-0" style={{ background: GOLD }} />
      <p className="font-sans font-normal text-eyebrow tracking-track-label" style={{ color: MUTED }}>
        {typeof children === "string" ? children.toUpperCase() : children}
      </p>
    </div>
  );
}

function ItemGrid({ items }: { items: readonly string[] }) {
  return (
    <ul
      className="mt-6"
      style={{
        display: "grid",
        /*
          min 160px so items stay readable on narrow screens.
          On mobile (~311px content): 160px min → 1 column.
          On tablet (~640px): 2 columns.
          On desktop (~1088px): 4–5 columns.
        */
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        columnGap: "2rem",
        rowGap: 0,
        borderTop: `1px solid ${BORDER}`,
      }}
    >
      {items.map((item) => (
        <li
          key={item}
          className="font-sans font-light py-3"
          style={{
            color: MID,
            /*
              14px on mobile (above the 14px minimum),
              scales to 13px (text-body-sm) on desktop.
            */
            fontSize: "clamp(0.875rem, 1.2vw, 0.8125rem)",
            lineHeight: 1.5,
            borderBottom: `1px solid ${BORDER}`,
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
