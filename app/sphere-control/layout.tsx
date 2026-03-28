import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { sphereControlContent } from "@/constants/content";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const { meta } = sphereControlContent;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default function SphereControlLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${inter.className} min-h-dvh bg-zinc-50 text-zinc-900 antialiased`}
    >
      {children}
    </div>
  );
}
