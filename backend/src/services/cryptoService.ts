import { Pool } from 'pg';
import axios from 'axios';
import { addCryptoToDB, deleteCryptoFromDB, updateCryptoPrice } from '../models/Crypto';
import cron from 'node-cron';

export const addCrypto = async (id: string, name: string) => {
  // Implementation to add crypto
};

export const deleteCrypto = async (id: string) => {
  // Implementation to delete crypto
};

export const fetchCryptoPrices = async (pool: Pool) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d');
    const data = response.data;

    for (const crypto of data) {
      await updateCryptoPrice(pool, crypto.id, crypto.current_price);
    }
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
  }
};

export const scheduleCronJob = (pool: Pool) => {
  cron.schedule('* * * * *', () => {
    fetchCryptoPrices(pool);
  });
};
