import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://omkelsey.github.io"),
  title: {
    default: "牟成露｜视觉设计作品集",
    template: "%s｜牟成露",
  },
  description: "牟成露的视觉设计与手绘作品集。",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
