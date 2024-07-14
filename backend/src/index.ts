import express from 'express';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import cryptoRoutes from './routes/cryptoRoutes';
import { scheduleCronJob } from './services/cryptoService';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/api/crypto', cryptoRoutes);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

pool.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Error connecting to the database', err));

// Schedule the cron job to fetch and save prices
scheduleCronJob(pool);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
