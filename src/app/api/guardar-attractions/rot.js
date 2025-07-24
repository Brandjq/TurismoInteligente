import { NextResponse } from 'next/server';

// Aquí debes importar o crear la conexión a tu BD
import { getAttractionsFromDB } from '../../../lib/db'; // ejemplo, crea esta función en lib/db.js

export async function GET() {
  try {
    const attractions = await getAttractionsFromDB();
    return NextResponse.json(attractions);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al obtener datos' }, { status: 500 });
  }
}
