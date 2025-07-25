import { writeFile } from 'fs/promises';
import path from 'path';

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
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(process.cwd(), 'public', 'images', fileName);

  await writeFile(filePath, buffer);

  return new Response(JSON.stringify({ imageUrl: `/images/${fileName}` }), {
    status: 200,
  });
}
