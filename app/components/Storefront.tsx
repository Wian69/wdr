'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from './CartContext';

type Product = { id: string; name: string; price: number; image: string; region: string };

const allProducts: Product[] = [
  { id: '1', name: 'Levitating Moon Lamp', price: 89.99, image: 'Home Decor', region: 'US' },
  { id: '2', name: 'Smart Posture Corrector', price: 45.00, image: 'Health & Wellness', region: 'Global' },
  { id: '3', name: 'Minimalist Titanium Watch', price: 120.00, image: 'Fashion', region: 'UK' },
  { id: '4', name: 'Portable Espresso Maker', price: 65.00, image: 'Kitchen', region: 'EU' },
  { id: '5', name: 'LED Gaming Desk Mat', price: 29.99, image: 'Tech', region: 'Global' },
  { id: '6', name: 'Noise-Cancelling Earbuds', price: 55.00, image: 'Audio', region: 'ZA' },
];

export default function Storefront({ initialCountry }: { initialCountry: string }) {
  const { addToCart } = useCart();
  const [country, setCountry] = useState(initialCountry);

  // Sort products: Prioritize matching region, then 'Global', then others
  const sortedProducts = [...allProducts].sort((a, b) => {
    if (a.region === country && b.region !== country) return -1;
    if (b.region === country && a.region !== country) return 1;
    if (a.region === 'Global' && b.region !== 'Global') return -1;
    if (b.region === 'Global' && a.region !== 'Global') return 1;
    return 0;
  });

  const getCountryName = (code: string) => {
    const names: Record<string, string> = { 'US': 'the United States', 'UK': 'the United Kingdom', 'ZA': 'South Africa', 'EU': 'Europe' };
    return names[code] || code;
  };

  return (
    <main className="main-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content animate-fade-up">
          <h1 className="hero-title">Discover the World's Best Kept Secrets.</h1>
          <p className="hero-subtitle">Unique, high-quality products sourced globally and delivered directly to your door.</p>
          <button className="btn-primary">Shop Collection</button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 className="section-title" style={{ marginBottom: '0.5rem', textAlign: 'left' }}>Trending in {getCountryName(country)}</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Based on your detected location</p>
          </div>
          
          {/* Dev mock toggle to test the geo-location UI */}
          <select 
            value={country} 
            onChange={(e) => setCountry(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '8px', background: 'var(--card-bg)', color: 'white', border: '1px solid var(--border-color)', outline: 'none' }}
          >
            <option value="US">Simulate US IP Address</option>
            <option value="UK">Simulate UK IP Address</option>
            <option value="ZA">Simulate South Africa IP Address</option>
            <option value="EU">Simulate European IP Address</option>
          </select>
        </div>

        <div className="product-grid">
          {sortedProducts.map((p) => (
            <div key={p.id} className="product-card glass" style={{ borderColor: p.region === country ? 'var(--accent-color)' : 'var(--border-color)' }}>
              <Link href={`/product/${p.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div className="product-image">{p.image}</div>
                <div className="product-info">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3>{p.name}</h3>
                    {p.region === country && <span style={{ background: 'var(--accent-color)', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 600 }}>Hot Locally</span>}
                  </div>
                  <p className="price">${p.price.toFixed(2)}</p>
                </div>
              </Link>
              <div style={{ padding: '0 1.5rem 1.5rem' }}>
                <button className="btn-primary" style={{width: '100%'}} onClick={() => addToCart(p)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
