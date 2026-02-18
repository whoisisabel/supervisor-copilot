import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Supervisor Copilot",
  description:
    "We explore how Generative AI can responsibly amplify Supervisor capacity by summarizing sessions, evaluating protocol adherence and flagging potential safety risks — without replacing human judgment.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
