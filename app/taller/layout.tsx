import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cursor Workshop Quito · Taller",
  description:
    "Taller práctico en Quito: aprende Cursor, crea y publica tu landing page. Presentado por Cursor Community.",
};

export default function TallerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
