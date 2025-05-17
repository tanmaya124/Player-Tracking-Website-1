// lib/feedbackService.ts
import { Pool } from "pg";

const pool = new Pool({
  user: "proj4_postgres",
  host: "10.137.0.149", // or use 'redback.it.deakin.edu.au'
  database: "project_4",
  password: "RerUXWuS6D",
  port: 5432,
});

export const FeedbackService = {
  async saveFeedback(name: string, email: string, feedback: string) {
    const query = `
      INSERT INTO feedback (name, email, feedback)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [name, email, feedback];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
};
