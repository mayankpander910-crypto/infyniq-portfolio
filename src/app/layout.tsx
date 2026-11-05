import type { Metadata } from "next";
import {
  Caveat,
  Instrument_Serif,
  JetBrains_Mono,
  Pixelify_Sans,
  Silkscreen,
  Sora,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CursorProvider } from "@/components/providers/CursorContext";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Preloader } from "@/components/ui/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-silk",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.infyniq.in"),
  title: "Infyniq Solutions — Creative 3D & Editorial Portfolio",
  description:
    "Explore Infyniq Solutions' selected client case studies across custom web development, brand storytelling, and digital campaigns.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Our Creative Works — Infyniq Solutions Portfolio",
    description:
      "An interactive 3D and editorial showcase of real client projects crafted by Infyniq Solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${instrumentSerif.variable} ${pixelify.variable} ${silkscreen.variable} ${caveat.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-canvas font-sans text-ink antialiased">
        <ThemeProvider>
          <CursorProvider>
            <Preloader />
            <CustomCursor />
            <Navbar />
            {children}
            <Footer />
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
