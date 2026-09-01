import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CustomerProvider } from "@/context/CustomerContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "OldVint — Premium Fashion Store",
    template: "%s | OldVint",
  },
  description:
    "Shop premium fashion, clothing, gadgets & accessories at OldVint. Free shipping, easy returns, and secure checkout.",
  keywords: ["fashion", "clothing", "accessories", "online shopping", "OldVint"],
  openGraph: {
    type: "website",
    siteName: "OldVint",
    title: "OldVint — Premium Fashion Store",
    description:
      "Shop premium fashion, clothing, gadgets & accessories at OldVint.",
  },
  twitter: {
    card: "summary_large_image",
    title: "OldVint — Premium Fashion Store",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-bg-primary text-text-primary font-sans">
        <CustomerProvider>
          <CartProvider>
            <WishlistProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </CustomerProvider>
      </body>
    </html>
  );
}
