// API endpoint para guardar favoritos en la base de datos con Prisma

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
