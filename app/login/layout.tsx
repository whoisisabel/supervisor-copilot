import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Supervisor Copilot",
  description: "Sign in to access your Supervisor Copilot dashboard",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}