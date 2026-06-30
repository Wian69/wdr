'use client';
import React from 'react';
import { useCart } from '../../components/CartContext';
import { useCurrency } from '../../components/CurrencyContext';

export default function ProductActions({ product }: { product: any }) {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  
  return (
    <button className="btn-primary" style={{ width: '100%', fontSize: '1.2rem', padding: '1rem' }} onClick={() => addToCart(product)}>
      Add to Cart - {formatPrice(product.price)}
    </button>
  );
}
