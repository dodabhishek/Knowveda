import { connectDB } from '../config/db.js';

export const createUser = async () => {
  const conn = await connectDB();

  if (!conn) return;

  try {
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        image_url TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Users table created or already exists.');
  } catch (error) {
    console.error(' Failed to create users table:', error.message);
  } finally {
    await conn.end();
  }
};

export const updateUser = async (id, updatedData) => {
  const conn = await connectDB();
  const { name, email, image_url } = updatedData;

  try {
    await conn.execute(
      `UPDATE users SET name = ?, email = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [name, email, image_url, id]
    );
  } catch (error) {
    console.error('Failed to update user:', error.message);
  } finally {
    await conn.end();
  }
};

export const deleteUser = async (id) => {
  const conn = await connectDB();

  try {
    await conn.execute(`DELETE FROM users WHERE id = ?`, [id]);
  } catch (error) {
    console.error(' Failed to delete user:', error.message);
  } finally {
    await conn.end();
  }
};

