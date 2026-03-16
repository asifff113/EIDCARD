import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Amiri, Libre_Baskerville, Jost, Italiana, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
});

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: ["400"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Eid Mubarak — Share Beautiful Eid Cards",
  description:
    "Choose, customize, and share stunning Eid greeting cards with your loved ones. Add personal messages, Eidi QR codes, and more.",
  openGraph: {
    title: "Eid Mubarak — Share Beautiful Eid Cards",
    description: "Choose, customize, and share stunning Eid greeting cards.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${playfair.variable} ${amiri.variable} ${libreBaskerville.variable} ${jost.variable} ${italiana.variable} ${cormorant.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
