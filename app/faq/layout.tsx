import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | COCO&CO",
  description:
    "Find answers to common questions about COCO&CO natural soaps, shipping, returns, and more.",
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
