import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "./components/navbar";
import { SiteFooter } from "./components/site-footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "IQ+1",
  description:
    "Pay $1 for a playful internet blessing and receive an entirely unserious IQ upgrade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex min-h-screen flex-col antialiased">
        <Navbar />
        <main className="flex flex-1 flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
