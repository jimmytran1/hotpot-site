import type { CSSProperties } from "react";
import { TextReveal } from "@/components/TextReveal";
import { Navigation } from "@/components/Navigation";

/* ─── Steam particle data ─────────────────────────────────── */
const STEAM: { left: string; delay: string; drift: string; size: number; dur: string }[] = [
  { left: "14%", delay: "0s",   drift: "14px",  size: 38, dur: "4.2s" },
  { left: "27%", delay: "1.4s", drift: "-11px", size: 22, dur: "3.6s" },
  { left: "42%", delay: "0.6s", drift: "9px",   size: 30, dur: "4.8s" },
  { left: "55%", delay: "2.2s", drift: "-14px", size: 18, dur: "3.4s" },
  { left: "68%", delay: "0.9s", drift: "16px",  size: 26, dur: "4.5s" },
  { left: "79%", delay: "2.8s", drift: "-8px",  size: 20, dur: "3.9s" },
  { left: "21%", delay: "3.3s", drift: "6px",   size: 14, dur: "3.2s" },
  { left: "61%", delay: "1.8s", drift: "-10px", size: 32, dur: "5.0s" },
  { left: "36%", delay: "3.8s", drift: "12px",  size: 16, dur: "3.7s" },
];

/* ─── Animation helper ────────────────────────────────────── */
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

function anim(name: string, duration: string, delay: string): CSSProperties {
  return {
    animationName: name,
    animationDuration: duration,
    animationDelay: delay,
    animationFillMode: "both",
    animationTimingFunction: EASE,
  };
}

/* ══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      {/* HERO */}
      <div className="relative h-svh overflow-hidden bg-hero">

        {/* Video background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hotpot-bg-poster.jpg"
        >
          <source src="/hotpot-bg.webm" type="video/webm" />
          <source src="/hotpot-bg.mp4"  type="video/mp4"  />
        </video>

        {/* Overlays */}
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 hero-vignette" />

        {/* Steam particles */}
        <div className="absolute inset-x-0 bottom-0 h-96 pointer-events-none overflow-hidden">
          {STEAM.map((p, i) => (
            <div
              key={i}
              className="absolute bottom-4 rounded-full"
              style={{
                left: p.left,
                width: p.size,
                height: p.size * 1.7,
                background: "oklch(88% 0.03 25 / 0.18)",
                filter: "blur(10px)",
                animationName: "steamRise",
                animationDuration: p.dur,
                animationDelay: p.delay,
                animationTimingFunction: "ease-out",
                animationIterationCount: "infinite",
                "--drift": p.drift,
              } as CSSProperties}
            />
          ))}
        </div>

        {/* Content layer */}
        <div className="absolute inset-0 z-10 flex flex-col">

          {/* Navigation */}
          <Navigation />

          {/* Hero copy */}
          <div className="flex-1 flex flex-col justify-end px-8 pb-14 md:px-14 md:pb-16">
            <div className="max-w-4xl">

              {/* Eyebrow label */}
              <div className="flex items-center gap-4 mb-5" style={anim("fadeInUp", "0.8s", "0.1s")}>
                <div className="w-7 h-px shrink-0 bg-brand-gold" />
                <p className="font-sans font-normal text-eyebrow tracking-track-label text-white/45">
                  DINE IN &nbsp;·&nbsp; <span className="whitespace-nowrap">HOTPOT EXPERIENCE</span>
                </p>
              </div>

              {/* Headline */}
              <h1 className="font-display mb-8">
                <TextReveal
                  text="GATHER AROUND"
                  startDelay={180}
                  stagger={22}
                  duration={480}
                  className="block text-white text-display leading-display"
                />
                <TextReveal
                  text="THE FLAME."
                  startDelay={560}
                  stagger={22}
                  duration={480}
                  className="block text-white text-display leading-display"
                />
              </h1>

              {/* Body + CTAs */}
              <div
                className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-12"
                style={anim("fadeInUp", "0.9s", "1.15s")}
              >
                <p className="font-sans font-light text-body-sm leading-body text-white/50 max-w-[36ch]">
                  Gather around our signature broths, hand-selected cuts, and
                  the time-honored ritual of cooking together. An experience
                  made for those who believe the best meals are never eaten
                  alone.
                </p>

                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7 shrink-0">
                  <a
                    href="#reservations"
                    className="focus-ring btn-primary font-sans font-semibold whitespace-nowrap px-7 py-3.5 text-ui tracking-track-btn w-auto"
                  >
                    RESERVE A TABLE
                  </a>
                  <a
                    href="#menu"
                    className="focus-ring btn-secondary font-sans font-medium whitespace-nowrap text-ui tracking-track-btn text-white/60 hover:text-white transition-colors duration-200"
                  >
                    <span className="btn-label">VIEW MENU</span>
                    <span className="btn-arrow">→</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* TEMP — placeholder section */}
      <section
        className="min-h-screen flex items-center justify-center"
        style={{ background: "oklch(8% 0.01 25)" }}
      >
        <p className="font-sans text-ui tracking-track-label text-white/15">
          MENU — COMING SOON
        </p>
      </section>
    </>
  );
}
