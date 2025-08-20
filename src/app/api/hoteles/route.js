import { PrismaClient } from '@prisma/client';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  const prisma = new PrismaClient();
  const hoteles = await prisma.hotel.findMany({ orderBy: { id: 'asc' } });
  await prisma.$disconnect();
  return Response.json(hoteles);
}

export async function POST(req) {
  const formData = await req.formData();
  const nombre = formData.get('nombre');
  const direccion = formData.get('direccion');
  const descripcion = formData.get('descripcion');
  const precio = formData.get('precio');
  const url = formData.get('url');
  const imagenFile = formData.get('imagen');

  let imagen = '';
  if (imagenFile && typeof imagenFile.name === 'string') {
    const ext = path.extname(imagenFile.name) || '.jpg';
    const fileName = `hotel_${Date.now()}${ext}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });
    const arrayBuffer = await imagenFile.arrayBuffer();
    await fs.writeFile(path.join(uploadDir, fileName), Buffer.from(arrayBuffer));
    imagen = fileName;
  }

  const prisma = new PrismaClient();
  const hotel = await prisma.hotel.create({
    data: { nombre, direccion, descripcion, precio, url, imagen }
  });
  await prisma.$disconnect();
  return Response.json(hotel);
}
export async function DELETE(req) {
  const prisma = new PrismaClient();
  try {
    const { id } = await req.json();
    if (!id) return Response.json({ error: 'Falta el id' }, { status: 400 });
    await prisma.hotel.delete({ where: { id } });
    await prisma.$disconnect();
    return Response.json({ success: true });
  } catch (err) {
    await prisma.$disconnect();
    return Response.json({ error: 'Error al eliminar hotel' }, { status: 500 });
  }
}
