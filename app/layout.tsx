import type { Metadata } from "next";
import { Geist_Mono, Libre_Baskerville, Karla } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { WalletConnect } from "@/components/wallet-connect";

const fontSans = Karla({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const fontSerif = Libre_Baskerville({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
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
        className={`${fontSans.variable} ${fontSerif.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <div className="min-h-screen flex flex-col bg-background">
          <header className="border-b border-border/40 bg-background">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="font-serif font-semibold flex items-center gap-2"
                >
                  <img src="/hero.png" alt="DeepGov Wiki" className="w-9 h-9" />
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-medium text-primary">
                      DeepGov Wiki
                    </h2>
                  </div>
                </Link>
              </div>
              <WalletConnect />
            </div>
          </header>
          <main className="container w-full py-6 flex-grow px-3 sm:px-4">
            {children}
          </main>
          <footer className="border-t border-wiki-border py-6 mt-auto w-full">
            <div className="container w-full text-center text-sm text-wiki-muted px-4">
              <p>© {new Date().getFullYear()} DeepGov by Eval.Science</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
