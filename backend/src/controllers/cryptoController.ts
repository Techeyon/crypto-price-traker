import { Request, Response } from 'express';
import pool from '../utils/db';

export const addCrypto = async (req: Request, res: Response) => {
  const { id, name, symbol } = req.body;

  try {
    const query = 'INSERT INTO cryptos (id, name, symbol) VALUES ($1, $2, $3) RETURNING *';
    const values = [id, name, symbol];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteCrypto = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const query = 'DELETE FROM cryptos WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Crypto not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCryptoList = async (req: Request, res: Response) => {
  try {
    const query = 'SELECT * FROM cryptos';
    const result = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
