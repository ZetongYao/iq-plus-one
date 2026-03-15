import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
