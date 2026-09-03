import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VEIL — Private transport for Ethereum",
  description: "Metadata-private Ethereum access for people and agents.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
