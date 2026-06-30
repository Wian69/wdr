'use client';
import React from 'react';
import { useCart } from '../../components/CartContext';

export default function ProductActions({ product }: { product: any }) {
  const { addToCart } = useCart();
  
  return (
    <button className="btn-primary" style={{ width: '100%', fontSize: '1.2rem', padding: '1rem' }} onClick={() => addToCart(product)}>
      Add to Cart - ${product.price.toFixed(2)}
    </button>
  );
}
