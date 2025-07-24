import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';



export async function GET() {
  try {
    const recomendaciones = await prisma.recomendacion.findMany({
      orderBy: { id: 'asc' },
    });
    return NextResponse.json(recomendaciones);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener recomendaciones' }, { status: 500 });
  }
}
