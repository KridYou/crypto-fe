import { useEffect, useState } from 'react';
import axios from 'axios';

interface Crypto {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export default function CryptoList() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);

  useEffect(() => {
    const fetchCryptos = async () => {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: 'btc',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
          },
        }
      );
      setCryptos(response.data);
    };
    fetchCryptos();
  }, []);

  return (
    <div>
      <h2>Your Cryptocurrencies</h2>
      <ul>
        {cryptos.map((crypto) => (
          <li key={crypto.id}>
            <img src={crypto.image} alt={crypto.name} width="25" />
            {crypto.name} ({crypto.symbol.toUpperCase()}) - {crypto.current_price} BTC
            <span style={{ color: crypto.price_change_percentage_24h >= 0 ? 'green' : 'red' }}>
              {crypto.price_change_percentage_24h.toFixed(2)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
