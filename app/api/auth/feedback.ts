import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool(); // uses env vars

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { name, email, feedback } = req.body;

  if (!name || !email || !feedback) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    await pool.query(
      'INSERT INTO feedbacks (name, email, message) VALUES ($1, $2, $3)',
      [name, email, feedback]
    );
    res.status(200).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('DB Insert Error:', error);
    res.status(500).json({ error: 'Database error' });
  }
}
