import { connectDB } from '../configs/db.js';
import { v4 as uuidv4 } from 'uuid';

export const createUser = async (user) => {
  console.log(user);
  const conn = await connectDB();
  const id = uuidv4(); // Generate a unique ID
  const { name, email, image_url } = user;
  try {
    await conn.execute(
      `INSERT INTO users (id, name, email, image_url) VALUES (?, ?, ?, ?)`,
      [id, name, email, image_url]
    );
    return { id, name, email, image_url };
  } catch (error) {
    throw new Error('Failed to create user: ' + error.message);
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

export const getAllUsers = async () => {
  const conn = await connectDB();
  try {
    const [rows] = await conn.execute('SELECT * FROM users');
    return rows;
  } catch (error) {
    console.error('Failed to fetch users:', error.message);
    return [];
  } finally {
    await conn.end();
  }
};

