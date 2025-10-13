import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();
  const { usuarioId, nombre, itinerario } = body;
  if (!usuarioId || !itinerario) {
    return NextResponse.json({ error: 'usuarioId e itinerario son requeridos' }, { status: 400 });
  }
  const ruta = await prisma.rutaGenerada.create({
    data: {
      usuarioId: Number(usuarioId),
      nombre,
      itinerario,
    }
  });
  return NextResponse.json({ ruta }, { status: 201 });
}

// GET: Devuelve todas las rutas generadas (solo admin) o solo las del usuario si se pasa usuarioId
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const usuarioId = searchParams.get('usuarioId');

  if (usuarioId) {
    const rutas = await prisma.rutaGenerada.findMany({
      where: { usuarioId: Number(usuarioId) },
      orderBy: { creadoEn: 'desc' },
      include: { usuario: { select: { email: true } } }
    });
    return NextResponse.json(rutas, { status: 200 });
  }

  // Todas las rutas (para admin/reportes), incluye el email del usuario
  const rutas = await prisma.rutaGenerada.findMany({
    orderBy: { creadoEn: 'desc' },
    include: { usuario: { select: { email: true } } }
  });
  return NextResponse.json(rutas, { status: 200 });
}

// Todo correcto, no se requieren cambios aquí.
