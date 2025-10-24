import prisma from '../../../../lib/prisma';
import { NextResponse } from 'next/server';
import cloudinary from '../../../../lib/cloudinary';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const data = await request.formData();

    const name = data.get('name');
    const description = data.get('description');
    const map_link = data.get('mapLink');
    const imageFile = data.get('image');

    let imageUrl = '';
    if (imageFile && typeof imageFile !== 'string') {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      // Subir a Cloudinary
      const uploadPromise = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'atractivos' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(buffer);
        });
      const uploadResult = await uploadPromise();
      imageUrl = uploadResult.secure_url;
    }

    const nuevaAtraccion = await prisma.attractions.create({
      data: {
        name,
        description,
        map_link,
        image_url: imageUrl,
      },
    });

    return NextResponse.json(nuevaAtraccion, { status: 201 });
  } catch (error) {
    console.error('Error al guardar:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    // Validar que el ID esté presente
    if (!id) {
      return NextResponse.json({ error: 'El ID es obligatorio para eliminar una atracción' }, { status: 400 });
    }

    // Eliminar la atracción de la base de datos
    const deletedAttraction = await prisma.attractions.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json(deletedAttraction, { status: 200 });
  } catch (error) {
    console.error('Error al eliminar la atracción:', error);

    // Manejo de errores específicos
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'La atracción no existe o ya fue eliminada' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}