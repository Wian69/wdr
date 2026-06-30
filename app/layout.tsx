import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./components/CartContext";
import CartDrawer from "./components/CartDrawer";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "WDR | Worldwide Finds",
  description: "Curated niche products from around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
