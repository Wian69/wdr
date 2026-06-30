'use client';
import React from 'react';
import { useCart } from './CartContext';

export default function Navbar() {
  const { items, setIsCartOpen } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar glass">
      <div className="logo">WDR.</div>
      <div className="nav-links">
        <a href="#">Trending</a>
        <a href="#">Categories</a>
        <button className="cart-nav-btn" onClick={() => setIsCartOpen(true)}>Cart ({itemCount})</button>
      </div>
    </nav>
  );
}
