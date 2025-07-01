import mysql from 'mysql2/promise';
import 'dotenv/config';

export const connectDB = async () => {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log(`Connected to database "${process.env.DB_NAME}"`);
    return conn;
  } catch (error) {
    console.error(`Connection failed: ${error.message}`);
  }
}; 