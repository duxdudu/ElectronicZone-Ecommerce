import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/Footer";
import { Manrope } from "next/font/google";
import { CartProvider } from "./context/CartContext";

import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "EletronicZone",
  description: "Created with Next.js and Tailwind CSS",
  generator: "EletronicZone",
};

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.className}>
      <body>
        
          <CartProvider>
            <Toaster />
            {children}
          </CartProvider>
    
      </body>
    </html>
  );
}
