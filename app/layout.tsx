import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Tamil, Outfit } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import WhatsAppFab from "@/components/WhatsAppFab";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const tamil = Noto_Sans_Tamil({ variable: "--font-tamil", subsets: ["tamil"], weight: ["400", "600", "700", "800"], display: "swap" });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ozotecev.com"),
  title: { default: "Ozotec EV · Electric scooters & MUVs from Coimbatore", template: "%s · Ozotec EV" },
  description: "Book, finance or lease an Ozotec electric scooter or MUV in three taps. 21 battery options, 40 to 240 km range.",
  applicationName: "Ozotec",
  appleWebApp: { capable: true, title: "Ozotec", statusBarStyle: "black-translucent" },
  openGraph: { type: "website", siteName: "Ozotec EV", locale: "en_IN" },
};
export const viewport: Viewport = {
  width: "device-width", initialScale: 1, viewportFit: "cover",
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#01163b" }, { media: "(prefers-color-scheme: dark)", color: "#000814" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* apply the saved language before first paint */}
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem("lang")==="ta")document.documentElement.lang="ta"}catch(e){}` }} />
      </head>
      <body className={`${inter.variable} ${outfit.variable} ${tamil.variable} antialiased`}>
        <Providers>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[60] focus:rounded-lg focus:bg-card focus:px-3 focus:py-2">Skip to content</a>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFab />
        </Providers>
      </body>
    </html>
  );
}
