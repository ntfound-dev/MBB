import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Muara Badak Bersatu",
    template: "%s | Muara Badak Bersatu",
  },
  description:
    "Pelatihan dan pengembangan kompetensi tenaga kerja lokal di Muara Badak, Kalimantan Timur.",
  metadataBase: new URL("https://muara-badak-bersatu.vercel.app"),
  openGraph: {
    title: "Muara Badak Bersatu",
    description:
      "Pelatihan dan pengembangan kompetensi tenaga kerja lokal di Muara Badak.",
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
      <body>{children}</body>
    </html>
  );
}
