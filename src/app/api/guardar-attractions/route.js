// src/app/api/guardar-attractions/route.js
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req) {
  const data = await req.json();

  try {
    const client = await pool.connect();

    await client.query(
      `INSERT INTO attractions (name, description, map_link)
       VALUES ($1, $2, $3)
       ON CONFLICT (name) DO NOTHING`,
      [data.name, data.description, data.mapLink || null]
    );

    client.release();

    return NextResponse.json({ message: 'Registro insertado exitosamente' });
  } catch (error) {
    console.error('Error al insertar en BD:', error);
    return NextResponse.json({ error: 'Error al insertar en la BD' }, { status: 500 });
  }
}
