import type { Metadata } from "next";
import { Providers } from "@/components/providers/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Music Player",
  description: "A modern music player built with Next.js",
};

export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background min-h-screen text-white">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
