import React from 'react';
import Link from 'next/link';
import ProductActions from './ProductActions';
import PriceDisplay from '../../components/PriceDisplay';

// Mock database to simulate an API
const allProducts = [
  { id: '1', name: 'Levitating Moon Lamp', price: 89.99, image: 'Home Decor', description: 'Bring the moon into your room. This magnetic levitating lamp spins effortlessly in mid-air.' },
  { id: '2', name: 'Smart Posture Corrector', price: 45.00, image: 'Health & Wellness', description: 'Gently trains your back muscles to maintain perfect posture all day.' },
  { id: '3', name: 'Minimalist Titanium Watch', price: 120.00, image: 'Fashion', description: 'Ultra-lightweight titanium body with a scratch-resistant sapphire crystal.' },
  { id: '4', name: 'Portable Espresso Maker', price: 65.00, image: 'Kitchen', description: 'Make barista-quality espresso anywhere in the world without electricity.' },
  { id: '5', name: 'LED Gaming Desk Mat', price: 29.99, image: 'Tech', description: 'Enhance your gaming setup with this ultra-smooth, spill-resistant RGB mat.' },
  { id: '6', name: 'Noise-Cancelling Earbuds', price: 55.00, image: 'Audio', description: 'Block out the world with active noise cancellation and 24-hour battery life.' },
];

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = allProducts.find((p) => p.id === resolvedParams.id);

  if (!product) {
    return <div className="main-container" style={{padding: '100px'}}><h2>Product not found.</h2><Link href="/">Go Back</Link></div>;
  }

  return (
    <main className="main-container" style={{ paddingTop: '100px', maxWidth: '1200px', margin: '0 auto', padding: '100px 2rem 2rem' }}>
      <div style={{ width: '100%', marginBottom: '2rem' }}>
        <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-block' }}>&larr; Back to Store</Link>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', width: '100%' }}>
        <div className="product-image glass" style={{ height: '500px', borderRadius: '16px', fontSize: '1.5rem', width: '100%' }}>
          {product.image} Placeholder
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', justifySelf: 'start', width: '100%' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', lineHeight: '1.1' }}>{product.name}</h1>
          <PriceDisplay priceInUSD={product.price} style={{ fontSize: '2.5rem', color: 'var(--accent-color)', fontWeight: '800', marginBottom: '2rem', display: 'block' }} />
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '3rem' }}>
            {product.description}
          </p>
          
          <ProductActions product={product} />
          
          <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>🌍 Global Automated Shipping</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>Fast, reliable shipping anywhere in the world. Orders are automatically routed to the warehouse closest to you.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
