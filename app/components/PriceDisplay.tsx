'use client';
import React from 'react';
import { useCurrency } from './CurrencyContext';

export default function PriceDisplay({ priceInUSD, className, style }: { priceInUSD: number, className?: string, style?: React.CSSProperties }) {
  const { formatPrice } = useCurrency();
  return <span className={className} style={style}>{formatPrice(priceInUSD)}</span>;
}
