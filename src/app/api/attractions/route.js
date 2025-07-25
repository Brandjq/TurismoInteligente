import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM attractions');
    client.release();

    return NextResponse.json(result.rows);
  } catch (err) {
    console.error('Error fetching attractions:', err);
    return NextResponse.json({ error: 'Error fetching attractions' }, { status: 500 });
  }
}
