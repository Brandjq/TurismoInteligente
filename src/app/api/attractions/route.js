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
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'Falta el id' }, { status: 400 });
    const client = await pool.connect();
    await client.query('DELETE FROM attractions WHERE id = $1', [id]);
    client.release();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error deleting attraction:', err);
    return NextResponse.json({ error: 'Error deleting attraction' }, { status: 500 });
  }
}
