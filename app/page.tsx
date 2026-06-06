import type { Metadata } from "next";
import { portfolioData } from "@/lib/portfolio-data";
import TerminalPortfolio from "./terminal-portfolio";

export const metadata: Metadata = {
  title: `${portfolioData.profile.name} - Portfolio`,
  description: portfolioData.profile.bio,
};

export default function Page() {
  return <TerminalPortfolio />;
}
