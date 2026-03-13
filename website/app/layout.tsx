import type { Metadata } from "next";
import { Inter, Playfair_Display, DM_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  weight: ["400", "600", "700"],
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CALL'VANTAGE — Rendez-vous qualifiés pour courtiers en énergie",
  description:
    "Centre d'appels B2B à Marrakech spécialisé dans la génération de rendez-vous qualifiés pour les courtiers et fournisseurs d'énergie ciblant le marché français. Vérification de l'échéance du contrat garantie.",
  keywords: [
    "call center énergie",
    "rendez-vous qualifiés",
    "courtiers énergie",
    "prospection téléphonique",
    "Marrakech",
    "marché français",
  ],
  openGraph: {
    title: "CALL'VANTAGE — Rendez-vous qualifiés pour courtiers en énergie",
    description:
      "Si le RDV n'est pas qualifié, il n'est pas facturé. Découvrez notre offre.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfairDisplay.variable} ${dmMono.variable}`}>
      <body className="antialiased" style={{ background: '#0A1628', color: '#F8F9FA' }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
