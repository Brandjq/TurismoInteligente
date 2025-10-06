import prisma from '../../../../lib/prisma';
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Asegúrate de configurar las variables de entorno antes de usar cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
