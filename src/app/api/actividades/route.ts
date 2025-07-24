import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const actividades = await prisma.actividad.findMany({
    orderBy: { id: 'asc' },
  });
  return NextResponse.json(actividades);
}
