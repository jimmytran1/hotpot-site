"use client";

import { useState } from "react";

const CONTACT_INFO = [
  { label: "LOCATION", lines: ["2847 Larimer Street", "Denver, CO 80205"] },
  { label: "PHONE",    lines: ["(720) 555-0182"] },
  { label: "EMAIL",    lines: ["hello@hotpot.com"] },
] as const;

const MUTED  = "oklch(58% 0.008 30)";
const MID    = "oklch(38% 0.010 30)";
const DARK   = "oklch(14% 0.015 30)";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(_formData: FormData) {
    setSubmitted(true);
  }

  return (
    <section style={{ background: "oklch(97% 0.005 30)" }}>
      <div className="max-w-6xl mx-auto px-8 md:px-14 py-24 md:py-32">

        {/* ── Two-column: info + form ──────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 items-start">

          {/* Left: Info */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-7 h-px shrink-0 bg-brand-gold" />
              <p className="font-sans font-normal text-eyebrow tracking-track-label" style={{ color: MUTED }}>
                RESERVATIONS & CONTACT
              </p>
            </div>

            <h2 className="font-display text-display leading-display mb-14" style={{ color: DARK }}>
              COME<br />FIND US.
            </h2>

            <div className="flex flex-col gap-8">
              {CONTACT_INFO.map(({ label, lines }) => (
                <div key={label}>
                  <p className="font-sans font-normal text-eyebrow tracking-track-label mb-1.5" style={{ color: MUTED }}>
                    {label}
                  </p>
                  {lines.map((line) => (
                    <p key={line} className="font-sans font-light text-body-sm leading-body" style={{ color: MID }}>
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="md:pt-18">
            {submitted ? (
              <div>
                <div className="w-7 h-px bg-brand-gold mb-8" />
                <p className="font-display text-3xl mb-4" style={{ color: DARK }}>
                  Thank you.
                </p>
                <p className="font-sans font-light text-body-sm leading-body" style={{ color: MID }}>
                  We'll be in touch soon. See you around the table.
                </p>
              </div>
            ) : (
              <form action={handleSubmit} noValidate className="flex flex-col gap-8">

                <div className="flex flex-col gap-2">
                  <label className="font-sans font-normal text-eyebrow tracking-track-label" style={{ color: MUTED }}>
                    NAME
                  </label>
                  <div className="contact-field">
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Jordan Kim"
                      required
                      className="focus-ring font-sans font-light text-body-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-sans font-normal text-eyebrow tracking-track-label" style={{ color: MUTED }}>
                    EMAIL
                  </label>
                  <div className="contact-field">
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. jordan@email.com"
                      required
                      className="focus-ring font-sans font-light text-body-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-sans font-normal text-eyebrow tracking-track-label" style={{ color: MUTED }}>
                    MESSAGE
                  </label>
                  <div className="contact-field">
                    <textarea
                      name="message"
                      placeholder="e.g. We'd love a table for 6 on Friday evening — any availability?"
                      rows={4}
                      required
                      className="focus-ring font-sans font-light text-body-sm leading-body resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="focus-ring btn-primary font-sans font-semibold text-ui tracking-track-btn px-7 py-3.5 self-start"
                >
                  SEND MESSAGE
                </button>

              </form>
            )}
          </div>
        </div>

        {/* ── Map embed ───────────────────────────────── */}
        <div className="mt-20" style={{ borderTop: "1px solid oklch(84% 0.008 30)" }}>
          <iframe
            title="Hotpot Denver location"
            src="https://maps.google.com/maps?q=2847+Larimer+St,+Denver,+CO+80205&output=embed"
            width="100%"
            height="400"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block w-full mt-10"
            style={{ border: "none", filter: "saturate(0.8) contrast(0.95)" }}
          />
        </div>

      </div>
    </section>
  );
}
