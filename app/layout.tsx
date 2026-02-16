import type { Metadata } from "next";
import { Urbanist, Work_Sans } from "next/font/google";
import "./globals.css";

const urbanist_font = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  fallback: ["system-ui", "Arial", "sans-serif"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  fallback: ["system-ui", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Supervisor Copilot",
  description: "We explore how Generative AI can responsibly amplify Supervisor capacity by summarizing sessions, evaluating protocol adherence and flagging potential safety risks — without replacing human judgment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${urbanist_font.variable} ${workSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
