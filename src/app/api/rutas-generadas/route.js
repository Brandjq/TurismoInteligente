import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();
  const { usuarioId, nombre, itinerario } = body;
  if (!usuarioId || !itinerario) {
    return NextResponse.json({ error: 'usuarioId e itinerario son requeridos' }, { status: 400 });
  }
  const ruta = await prisma.rutaGenerada.create({
    data: {
      usuarioId: Number(usuarioId),
      nombre,
      itinerario,
    }
  });
  return NextResponse.json({ ruta }, { status: 201 });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const usuarioId = searchParams.get('usuarioId');
  if (!usuarioId) {
    return NextResponse.json({ error: 'usuarioId requerido' }, { status: 400 });
  }
  const rutas = await prisma.rutaGenerada.findMany({
    where: { usuarioId: Number(usuarioId) },
    orderBy: { creadoEn: 'desc' }
  });
  return NextResponse.json({ rutas });
}
