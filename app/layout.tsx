import type { Metadata } from "next";
import { Urbanist, Work_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
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
  title: "Supervisor Copilot | Shamiri Health",
  description:
    "We explore how Generative AI can responsibly amplify Supervisor capacity by summarizing sessions, evaluating protocol adherence and flagging potential safety risks — without replacing human judgment.",
  openGraph: {
    title: "Supervisor Copilot",
    description: "AI-powered session analysis for mental health supervisors.",
    url: "https://supervisor-copilot.vercel.app/",
    siteName: "Shamiri Health",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Supervisor Copilot Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Supervisor Copilot",
    description: "AI-powered session analysis for mental health supervisors.",
    images: ["/og-image.png"],
  },
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
        <Toaster
          position="bottom-left"
          toastOptions={{
            removeDelay: 3000,
            success: {
              style: {
                background: "green",
              },
            },
            error: {
              style: {
                background: "var(--brand--color--red)",
              },
            },
            style: {
              color: "white",
              borderRadius: "12px",
              marginBottom: "1rem",
            },
          }}
        />
      </body>
    </html>
  );
}
