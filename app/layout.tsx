import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Devil He — Senior UX & Digital Experience Designer",
  description:
    "Luxury commerce, Global-to-China localization, UX leadership and digital experience strategy.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
