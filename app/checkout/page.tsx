import React from 'react';
import CheckoutClient from './CheckoutClient';

export default function CheckoutPage() {
  return (
    <main className="main-container" style={{ paddingTop: '100px', minHeight: '100vh', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '100px 2rem 2rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}>Secure Checkout</h1>
      <CheckoutClient />
    </main>
  );
}
