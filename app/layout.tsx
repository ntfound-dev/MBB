import type { Metadata } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import "./globals.css";
import "./podh.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-podh-sans",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-podh-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PODH — Persatuan Operator, Driver, Helper",
    template: "%s | PODH",
  },
  description:
    "PODH adalah organisasi pengembangan kompetensi tenaga kerja lapangan dan industri dengan program Welder, K3, Operator Crane, dan Rigger.",
  metadataBase: new URL("https://muara-badak-bersatu.vercel.app"),
  openGraph: {
    title: "PODH — Persatuan Operator, Driver, Helper",
    description:
      "Pelatihan kompetensi tenaga kerja lapangan dan industri.",
    type: "website",
    locale: "id_ID",
  },
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="id">
      <body className={`${manrope.variable} ${barlowCondensed.variable}`}>{children}</body>
    </html>
  );
}
