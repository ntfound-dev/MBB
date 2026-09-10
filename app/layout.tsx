import type { Metadata } from "next";
import "./globals.css";
import "./podh.css";

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
      <body>{children}</body>
    </html>
  );
}
