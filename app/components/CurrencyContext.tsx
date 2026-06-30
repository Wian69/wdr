'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

type CurrencyContextType = {
  currency: string;
  symbol: string;
  rate: number;
  formatPrice: (priceInUSD: number) => string;
};

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'USD',
  symbol: '$',
  rate: 1,
  formatPrice: (p) => `$${p.toFixed(2)}`,
});

export function CurrencyProvider({ children, initialCountry }: { children: React.ReactNode, initialCountry: string }) {
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');
  const [rate, setRate] = useState(1);

  useEffect(() => {
    const currencyMap: Record<string, { code: string, symbol: string }> = {
      'US': { code: 'USD', symbol: '$' },
      'UK': { code: 'GBP', symbol: '£' },
      'GB': { code: 'GBP', symbol: '£' },
      'ZA': { code: 'ZAR', symbol: 'R' },
      'EU': { code: 'EUR', symbol: '€' },
      'DE': { code: 'EUR', symbol: '€' },
      'FR': { code: 'EUR', symbol: '€' },
      'IT': { code: 'EUR', symbol: '€' },
      'ES': { code: 'EUR', symbol: '€' },
      'AU': { code: 'AUD', symbol: 'A$' },
      'CA': { code: 'CAD', symbol: 'C$' },
    };

    const localCurrency = currencyMap[initialCountry] || { code: 'USD', symbol: '$' };
    setCurrency(localCurrency.code);
    setSymbol(localCurrency.symbol);

    if (localCurrency.code !== 'USD') {
      fetch('https://open.er-api.com/v6/latest/USD')
        .then(res => res.json())
        .then(data => {
          if (data && data.rates && data.rates[localCurrency.code]) {
            setRate(data.rates[localCurrency.code]);
          }
        })
        .catch(err => console.error("Failed to fetch exchange rates:", err));
    }
  }, [initialCountry]);

  const formatPrice = (priceInUSD: number) => {
    return `${symbol}${(priceInUSD * rate).toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, symbol, rate, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
