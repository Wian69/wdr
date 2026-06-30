import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./components/CartContext";
import { CurrencyProvider } from './components/CurrencyContext';
import CartDrawer from "./components/CartDrawer";
import Navbar from "./components/Navbar";
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: "WDR | Worldwide Finds",
  description: "Curated niche products from around the world.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const country = cookieStore.get('user-country')?.value || 'US';

  return (
    <html lang="en">
      <body>
        <CurrencyProvider initialCountry={country}>
          <CartProvider>
            <Navbar />
            {children}
            <CartDrawer />
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
