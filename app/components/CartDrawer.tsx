'use client';
import React from 'react';
import { useCart } from './CartContext';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, removeFromCart, total } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>
      <div className="cart-drawer animate-slide-left glass">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>&times;</button>
        </div>
        <div className="cart-items">
          {items.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p className="cart-item-price">${item.price.toFixed(2)} <span className="cart-qty">x {item.quantity}</span></p>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="btn-primary checkout-btn">Checkout with Stripe</button>
          </div>
        )}
      </div>
    </>
  );
}
