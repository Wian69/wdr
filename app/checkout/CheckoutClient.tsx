'use client';
import React, { useState } from 'react';
import { useCart } from '../components/CartContext';
import Link from 'next/link';

export default function CheckoutClient() {
  const { items, total } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Your cart is empty</h2>
        <Link href="/" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>Return to Store</Link>
      </div>
    );
  }

  const handleMockPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert("Success! The payment was processed via PayPal Sandbox, and the order has been routed to the dropshipping supplier API.");
      setIsProcessing(false);
      window.location.href = '/';
    }, 2000);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>
      {/* Shipping Form */}
      <div className="glass" style={{ padding: '2.5rem', borderRadius: '16px' }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Shipping Details</h2>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input type="text" placeholder="First Name" style={{ flex: 1, padding: '14px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', outline: 'none' }} />
            <input type="text" placeholder="Last Name" style={{ flex: 1, padding: '14px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', outline: 'none' }} />
          </div>
          <input type="email" placeholder="Email Address" style={{ padding: '14px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', outline: 'none' }} />
          <input type="text" placeholder="Street Address" style={{ padding: '14px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', outline: 'none' }} />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input type="text" placeholder="City" style={{ flex: 1, padding: '14px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', outline: 'none' }} />
            <input type="text" placeholder="Postal Code" style={{ flex: 1, padding: '14px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', outline: 'none' }} />
          </div>
        </form>
      </div>

      {/* Order Summary & Payment */}
      <div className="glass" style={{ padding: '2.5rem', borderRadius: '16px', height: 'fit-content' }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Order Summary</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {items.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{item.name}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Qty: {item.quantity}</p>
              </div>
              <p style={{ fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
          <span>Global Shipping</span>
          <span style={{ color: '#10b981' }}>Free</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.8rem', fontWeight: 800, marginBottom: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <span>Total</span>
          <span style={{ color: 'var(--accent-color)' }}>${total.toFixed(2)}</span>
        </div>

        {/* PayPal Mock Button */}
        <button 
          onClick={handleMockPayment}
          disabled={isProcessing}
          style={{ width: '100%', background: '#ffc439', color: '#000', padding: '1.2rem', borderRadius: '8px', textAlign: 'center', cursor: isProcessing ? 'not-allowed' : 'pointer', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', transition: 'opacity 0.3s ease', opacity: isProcessing ? 0.7 : 1 }}
        >
          {isProcessing ? (
            <span style={{ fontWeight: 600, fontSize: '1.2rem' }}>Processing Payment...</span>
          ) : (
            <>
              <span style={{ fontStyle: 'italic', color: '#003087', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>PayPal</span> 
              <span style={{ fontWeight: 600, fontSize: '1.2rem', color: '#000' }}>Checkout</span>
            </>
          )}
        </button>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '1.5rem', fontSize: '0.9rem' }}>
          This is a simulated sandbox checkout. No real money will be charged during testing.
        </p>
      </div>
    </div>
  );
}
