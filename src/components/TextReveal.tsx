"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

type Props = {
  text: string;
  startDelay?: number;
  stagger?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
};

export function TextReveal({
  text,
  startDelay = 200,
  stagger = 30,
  duration = 500,
  className,
  style,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 16);
    return () => clearTimeout(t);
  }, []);

  const words = text.split(" ");
  let charIndex = 0;

  return (
    <span className={className} style={style} aria-label={text}>
      {words.map((word, wi) => {
        const wordStart = charIndex;
        charIndex += word.length + 1; // +1 for the space

        return (
          <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {word.split("").map((char, ci) => (
              <span
                key={ci}
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  transform: visible ? "translateX(0)" : "translateX(-18px)",
                  opacity: visible ? 1 : 0,
                  transition: `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${duration * 0.6}ms ease`,
                  transitionDelay: `${startDelay + (wordStart + ci) * stagger}ms`,
                }}
              >
                {char}
              </span>
            ))}
            {wi < words.length - 1 && (
              <span aria-hidden="true" style={{ display: "inline-block" }}>&nbsp;</span>
            )}
          </span>
        );
      })}
    </span>
  );
}
