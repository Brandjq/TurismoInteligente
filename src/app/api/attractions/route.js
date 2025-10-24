import { PrismaClient } from '@prisma/client';

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export async function GET() {
  try {
    const attractions = await prisma.attractions.findMany();
    return Response.json(attractions);
  } catch (error) {
    console.error('Error al obtener las atracciones:', error);
    return Response.json({ error: 'Error al obtener las atracciones' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, description, map_link, image_url } = await req.json();

    // Validar los datos recibidos
    if (!name || !description) {
      return Response.json({ error: 'El nombre y la descripción son obligatorios' }, { status: 400 });
    }

    // Intentar guardar la atracción en la base de datos
    const newAttraction = await prisma.attractions.create({
      data: { name, description, map_link, image_url },
    });

    return Response.json(newAttraction, { status: 201 });
  } catch (error) {
    console.error('Error al guardar la atracción:', error);

    // Manejo de errores específicos
    if (error.code === 'P2002') {
      return Response.json({ error: 'El nombre de la atracción ya existe' }, { status: 409 });
    }

    return Response.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    // Validar el ID recibido
    if (!id) {
      return Response.json({ error: 'El ID es obligatorio para eliminar una atracción' }, { status: 400 });
    }

    // Intentar eliminar la atracción de la base de datos
    const deletedAttraction = await prisma.attractions.delete({
      where: { id },
    });

    return Response.json(deletedAttraction, { status: 200 });
  } catch (error) {
    console.error('Error al eliminar la atracción:', error);

    // Manejo de errores específicos
    if (error.code === 'P2025') {
      return Response.json({ error: 'La atracción no existe o ya fue eliminada' }, { status: 404 });
    }

    return Response.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
