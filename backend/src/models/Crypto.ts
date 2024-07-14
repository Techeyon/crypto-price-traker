import { Pool } from 'pg';

export interface Crypto {
  id: string;
  name: string;
}

export const createCryptoTable = async (pool: Pool) => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS cryptos (
      id SERIAL PRIMARY KEY,
      crypto_id VARCHAR(50) UNIQUE NOT NULL,
      name VARCHAR(100) NOT NULL,
      price DECIMAL(20, 10) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

export const addCryptoToDB = async (pool: Pool, crypto: Crypto) => {
  const { id, name } = crypto;
  await pool.query('INSERT INTO cryptos (crypto_id, name) VALUES ($1, $2) ON CONFLICT (crypto_id) DO NOTHING', [id, name]);
};

export const deleteCryptoFromDB = async (pool: Pool, id: string) => {
  await pool.query('DELETE FROM cryptos WHERE crypto_id = $1', [id]);
};

export const updateCryptoPrice = async (pool: Pool, id: string, price: number) => {
  await pool.query('UPDATE cryptos SET price = $1, created_at = NOW() WHERE crypto_id = $2', [price, id]);
};
