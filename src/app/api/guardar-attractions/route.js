import prisma from '../../../../lib/prisma';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { mkdirSync, existsSync } from 'fs';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const data = await request.formData();

    const name = data.get('name');
    const description = data.get('description');
    const map_link = data.get('mapLink'); // debe mapear a map_link
    const imageFile = data.get('image');

    if (!imageFile || typeof imageFile === 'string') {
      return NextResponse.json({ error: 'Imagen inválida' }, { status: 400 });
    }

    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadsDir)) mkdirSync(uploadsDir, { recursive: true });

    const filename = `${Date.now()}-${imageFile.name}`;
    const filepath = path.join(uploadsDir, filename);

    await writeFile(filepath, buffer);

    const nuevaAtraccion = await prisma.attractions.create({
      data: {
        name,
        description,
        map_link,    // usa map_link aquí, no mapLink ni map_Link
        image_url: `/uploads/${filename}`,  // igual image_url
      },
    });

    return NextResponse.json(nuevaAtraccion, { status: 201 });
  } catch (error) {
    console.error('Error al guardar:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
