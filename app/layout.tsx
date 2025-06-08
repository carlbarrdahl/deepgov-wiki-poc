import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeepGov Wiki",
  description: "Crowdsourced knowledge base for projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="border-b">
          <Link href="/">
            <div className=" h-16 max-w-screen-lg mx-auto  flex items-center">
              <h1 className="text-sm font-bold">DeepGov Wiki</h1>
            </div>
          </Link>
        </header>
        <main className="mx-auto max-w-screen-lg pt-8">{children}</main>
      </body>
    </html>
  );
}
