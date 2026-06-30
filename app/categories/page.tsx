import React from 'react';
import Link from 'next/link';

const categories = [
  { name: 'Tech & Electronics', slug: 'tech', emoji: '💻' },
  { name: 'Home Decor', slug: 'home-decor', emoji: '🏡' },
  { name: 'Health & Wellness', slug: 'health', emoji: '🧘‍♂️' },
  { name: 'Fashion & Accessories', slug: 'fashion', emoji: '⌚' },
  { name: 'Kitchen & Dining', slug: 'kitchen', emoji: '☕' },
  { name: 'Audio', slug: 'audio', emoji: '🎧' },
];

export default function CategoriesPage() {
  return (
    <main className="main-container" style={{ paddingTop: '120px', minHeight: '100vh', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '120px 2rem 2rem' }}>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', textAlign: 'center' }}>Browse Categories</h1>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '4rem', fontSize: '1.2rem' }}>Find the perfect niche products for your region.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', width: '100%' }}>
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/?category=${cat.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="glass" style={{ padding: '3rem 2rem', borderRadius: '16px', textAlign: 'center', transition: 'transform 0.3s ease, border-color 0.3s ease', cursor: 'pointer' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{cat.emoji}</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{cat.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
