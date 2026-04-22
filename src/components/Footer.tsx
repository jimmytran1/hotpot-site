"use client";

const DARK_BG  = "oklch(10% 0.02 25)";
const WHITE_70 = "oklch(100% 0 0 / 0.70)";
const WHITE_60 = "oklch(100% 0 0 / 0.60)";
const WHITE_40 = "oklch(100% 0 0 / 0.40)";
const WHITE_25 = "oklch(100% 0 0 / 0.25)";
const WHITE_10 = "oklch(100% 0 0 / 0.10)";
const RED      = "oklch(42% 0.19 25)";

export function Footer() {
  return (
    <footer style={{ background: DARK_BG }}>
      <div className="max-w-6xl mx-auto px-8 md:px-14 pt-16" style={{ paddingBottom: "calc(2.5rem + env(safe-area-inset-bottom))" }}>

        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-16">

          {/* Brand */}
          <div>
            <span className="font-display text-xl tracking-track-btn" style={{ color: WHITE_70 }}>
              HOTPOT DEN
            </span>
            <p className="mt-3 font-sans font-light text-body-sm leading-body" style={{ color: WHITE_40 }}>
              All you can eat · 2 hour limit<br />
              Littleton, CO
            </p>
            <a
              href="tel:+17208262572"
              className="focus-ring inline-flex items-center mt-6 font-sans font-medium text-ui tracking-track-btn px-5 py-3"
              style={{
                color: WHITE_60,
                border: `1px solid ${WHITE_10}`,
              }}
            >
              CALL TO RESERVE
            </a>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans font-normal text-eyebrow tracking-track-label mb-5" style={{ color: WHITE_40 }}>
              CONTACT
            </p>
            <div className="flex flex-col gap-2">
              {[
                "5934 S Kipling Pkwy Ste E",
                "Littleton, CO 80127",
                "(720) 826-2572",
                "hotpotden@gmail.com",
              ].map((line) => (
                <p key={line} className="font-sans font-light text-body-sm" style={{ color: WHITE_60 }}>
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <p className="font-sans font-normal text-eyebrow tracking-track-label mb-5" style={{ color: WHITE_40 }}>
              HOURS
            </p>
            <div className="flex flex-col gap-3">
              {[
                { days: "Sun – Thu", time: "11 am – 9 pm" },
                { days: "Fri – Sat", time: "11 am – 10 pm" },
              ].map(({ days, time }) => (
                <div key={days} className="flex justify-between gap-6">
                  <span className="font-sans font-light text-body-sm" style={{ color: WHITE_60 }}>{days}</span>
                  <span className="font-sans font-light text-body-sm" style={{ color: WHITE_60 }}>{time}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 font-sans font-light text-eyebrow leading-body" style={{ color: WHITE_40 }}>
              Walk-ins welcome for parties of 4 or fewer.<br />
              Groups of 6+ please call to reserve.
            </p>
          </div>

        </div>

        {/* Divider */}
        <div className="mt-12" style={{ height: "1px", background: WHITE_10 }} />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="font-sans font-light text-eyebrow" style={{ color: WHITE_40 }}>
            © 2026 Hotpot Den. All rights reserved.
          </p>
          <nav className="flex gap-6">
            {[
              { label: "Menu", href: "#menu" },
              { label: "Contact", href: "#reservations" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="focus-ring font-sans font-medium text-ui tracking-track-nav transition-colors duration-200"
                style={{ color: WHITE_40 }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = WHITE_70)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = WHITE_40)}
              >
                {label.toUpperCase()}
              </a>
            ))}
          </nav>
        </div>

      </div>
    </footer>
  );
}
