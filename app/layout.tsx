import type { Metadata } from "next";
import { portfolioData } from "@/lib/portfolio-data";
import "./globals.css";

export const metadata: Metadata = {
  title: `${portfolioData.profile.name} - Portfolio`,
  description: portfolioData.profile.headline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
