import { PrismaClient } from '@prisma/client';

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV === 'development') global.prisma = prisma;

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
