import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const actividad = searchParams.get('actividad');

  let where = {};
  if (actividad) {
    // Filtra por nombre si no tienes categorías
    where.name = { contains: actividad, mode: 'insensitive' };
  }

  // Si no hay filtro, devuelve todos los lugares
  const lugares =
    Object.keys(where).length === 0
      ? await prisma.attractions.findMany()
      : await prisma.attractions.findMany({ where });

  return Response.json(lugares);
}