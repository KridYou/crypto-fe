// src/components/CryptoPrice.tsx

import React, { useState } from 'react';
import axios from 'axios';

const CryptoPrice = () => {
    const [cryptoId, setCryptoId] = useState('');
    const [useCoinMarketCap, setUseCoinMarketCap] = useState(false);
    const [price, setPrice] = useState<number | null>(null);

    const fetchPrice = async () => {
        try {
            const response = await axios.get(`/api/crypto/price`, {
                params: {
                    id: cryptoId,
                    useCoinMarketCap: useCoinMarketCap,
                },
            });
            setPrice(response.data.price);
        } catch (error) {
            console.error('Error fetching price', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={cryptoId}
                onChange={(e) => setCryptoId(e.target.value)}
                placeholder="Enter crypto ID"
            />
            <label>
                <input
                    type="checkbox"
                    checked={useCoinMarketCap}
                    onChange={(e) => setUseCoinMarketCap(e.target.checked)}
                />
                Use CoinMarketCap
            </label>
            <button onClick={fetchPrice}>Get Price</button>
            {price !== null && <p>Price in BTC: {price}</p>}
        </div>
    );
};

export default CryptoPrice;
