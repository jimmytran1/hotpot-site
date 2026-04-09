import type { Metadata } from "next";
import { Rozha_One, Jost } from "next/font/google";
import "./globals.css";

const rozhaOne = Rozha_One({
  variable: "--font-rozha",
  subsets: ["latin"],
  weight: "400",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Hotpot — Dine-In Experience",
  description:
    "Family-style hotpot dining with rich broths, fresh ingredients, and the joy of sharing.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${rozhaOne.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
