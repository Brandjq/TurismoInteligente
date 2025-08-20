import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const reviews = await prisma.review.findMany({
    orderBy: { fecha: 'desc' }
  });
  return Response.json(reviews);
}

export async function POST(req) {
  const { nombre, lugar, comentario, calificacion } = await req.json();
  if (!nombre || !lugar || !comentario || !calificacion) {
    return Response.json({ error: 'Faltan datos' }, { status: 400 });
  }
  const review = await prisma.review.create({
    data: { nombre, lugar, comentario, calificacion }
  });
  return Response.json(review);
}
