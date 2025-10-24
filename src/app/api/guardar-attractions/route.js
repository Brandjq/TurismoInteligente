import { PrismaClient } from '@prisma/client';

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export async function POST(req) {
  try {
    const { name, description, map_link, image_url } = await req.json();

    console.log('Datos recibidos:', { name, description, map_link, image_url }); // Log para verificar los datos recibidos

    // Validar los datos recibidos
    if (!name || !description) {
      console.error('Validación fallida: El nombre y la descripción son obligatorios');
      return Response.json({ error: 'El nombre y la descripción son obligatorios' }, { status: 400 });
    }

    // Intentar guardar la atracción en la base de datos
    const newAttraction = await prisma.attractions.create({
      data: { name, description, map_link, image_url },
    });

    console.log('Atracción guardada exitosamente:', newAttraction); // Log para verificar el éxito
    return Response.json(newAttraction, { status: 201 });
  } catch (error) {
    console.error('Error al guardar la atracción:', error);

    // Manejo de errores específicos
    if (error.code === 'P2002') {
      console.error('Error de duplicado: El nombre de la atracción ya existe');
      return Response.json({ error: 'El nombre de la atracción ya existe' }, { status: 409 });
    }

    return Response.json({ error: 'Error interno del servidor', details: error.message }, { status: 500 });
  }
}
