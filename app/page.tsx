import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: "牟成露｜视觉设计作品集",
  description:
    "牟成露的视觉设计作品集，收录品牌视觉、文化海报、公益设计与手绘创作。",
  openGraph: {
    title: "牟成露｜视觉设计作品集",
    description: "品牌视觉、文化海报与手绘创作。",
    images: ["/og.png"],
    type: "website",
    locale: "zh_CN",
  },
};

export default function Home() {
  return <PortfolioClient />;
}
