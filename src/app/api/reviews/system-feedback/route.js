import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const feedbacks = await prisma.systemFeedback.findMany({
      orderBy: { fecha: 'desc' },
    });
    return Response.json(feedbacks);
  } catch (error) {
    console.error('Error al obtener las opiniones:', error);
    return Response.json({ error: 'Error al obtener las opiniones del sistema' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { nombre, calificacion, comentario } = await req.json();

    if (!nombre || !calificacion || !comentario) {
      return Response.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
    }

    const newFeedback = await prisma.systemFeedback.create({
      data: { nombre, calificacion, comentario },
    });

    return Response.json(newFeedback, { status: 201 });
  } catch (error) {
    console.error('Error al guardar la opinión:', error);
    return Response.json({ error: 'Error al guardar la opinión' }, { status: 500 });
  }
}
