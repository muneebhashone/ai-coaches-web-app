import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat - AI Coach",
  description: "Chat with your AI coach",
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
