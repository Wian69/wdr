'use client';
import React from 'react';
import Link from 'next/link';
import { useCart } from './CartContext';

export default function Navbar() {
  const { items, setIsCartOpen } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar glass">
      <Link href="/" className="logo" style={{ color: 'inherit', textDecoration: 'none' }}>WDR.</Link>
      <div className="nav-links">
        <Link href="/">Trending</Link>
        <Link href="/categories">Categories</Link>
        <button className="cart-nav-btn" onClick={() => setIsCartOpen(true)}>Cart ({itemCount})</button>
      </div>
    </nav>
  );
}
