'use client';
import React, { useState } from 'react';
import { useCart } from '../components/CartContext';
import { useCurrency } from '../components/CurrencyContext';
import Link from 'next/link';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function CheckoutClient() {
  const { items, total } = useCart();
  const { formatPrice, currency, rate } = useCurrency();
  const [isProcessing, setIsProcessing] = useState(false);

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Your cart is empty</h2>
        <Link href="/" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>Return to Store</Link>
      </div>
    );
  }

  // Calculate the total in the local currency properly for the PayPal API
  const localTotal = (total * rate).toFixed(2);

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
              <p style={{ fontWeight: 600 }}>{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          <span>Subtotal</span>
          <span>{formatPrice(total)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
          <span>Global Shipping</span>
          <span style={{ color: '#10b981' }}>Free</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.8rem', fontWeight: 800, marginBottom: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <span>Total</span>
          <span style={{ color: 'var(--accent-color)' }}>{formatPrice(total)}</span>
        </div>

        {/* Real PayPal Integration */}
        <PayPalScriptProvider options={{ "clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test", currency: currency }}>
          <PayPalButtons 
            style={{ layout: "vertical", color: "gold", shape: "rect", label: "paypal" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [{
                  amount: {
                    currency_code: currency,
                    value: localTotal
                  }
                }]
              });
            }}
            onApprove={(data, actions) => {
              return actions.order!.capture().then((details) => {
                alert(`Transaction successfully completed by ${details.payer?.name?.given_name}!`);
                window.location.href = '/';
              });
            }}
          />
        </PayPalScriptProvider>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '1.5rem', fontSize: '0.9rem' }}>
          Secure, encrypted checkout powered directly by PayPal. Withdrawals natively support South African banks via FNB.
        </p>
      </div>
    </div>
  );
}
