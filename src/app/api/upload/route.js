import { writeFile } from 'fs/promises';
import path from 'path';
import cloudinary from '../../../../lib/cloudinary';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('image');

  if (!file) {
    return new Response(JSON.stringify({ error: 'No se subió ninguna imagen' }), {
      status: 400,
    });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Subir a Cloudinary
  try {
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: 'turismo' }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }).end(buffer);
    });
    return new Response(JSON.stringify({ imageUrl: uploadResponse.secure_url }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Error al subir a Cloudinary', details: err.message }), {
      status: 500,
    });
  }
}
