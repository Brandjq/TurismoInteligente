// API endpoint para guardar y mostrar favoritos en la base de datos con Prisma

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req) {
  const data = await req.json();
  const { usuarioId, nombre, itinerario } = data;
  if (!usuarioId || !nombre || !itinerario) {
    return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
  }
  try {
    const favorito = await prisma.favorito.create({
      data: {
        usuarioId,
        nombre,
        itinerario
      }
    });
    return NextResponse.json(favorito, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Error al guardar favorito' }, { status: 500 });
  }
}

// NUEVO: Solo mostrar favoritos del usuario autenticado
export async function GET(req) {
  // Obtener el id del usuario desde la cookie de sesión
  const cookie = req.headers.get('cookie') || '';
  let usuarioId = null;
  const match = cookie.match(/session=([^;]+)/);
  if (match) {
    try {
      const session = JSON.parse(decodeURIComponent(match[1]));
      if (session.id) usuarioId = session.id;
    } catch {}
  }
  if (!usuarioId) {
    return NextResponse.json([], { status: 200 });
  }
  try {
    const favoritos = await prisma.favorito.findMany({
      where: { usuarioId },
      orderBy: { creadoEn: 'desc' }
    });
    return NextResponse.json(favoritos, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: 'Error al obtener favoritos' }, { status: 500 });
  }
}
