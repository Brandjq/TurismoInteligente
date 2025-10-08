import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { usuarioId, nombre, itinerario } = req.body;
    if (!usuarioId || !itinerario) {
      return res.status(400).json({ error: 'usuarioId e itinerario son requeridos' });
    }
    const ruta = await prisma.rutaGenerada.create({
      data: {
        usuarioId: Number(usuarioId),
        nombre,
        itinerario,
      }
    });
    return res.status(201).json({ ruta });
  }
  if (req.method === 'GET') {
    const { usuarioId } = req.query;
    if (!usuarioId) return res.status(400).json({ error: 'usuarioId requerido' });
    const rutas = await prisma.rutaGenerada.findMany({
      where: { usuarioId: Number(usuarioId) },
      orderBy: { creadoEn: 'desc' }
    });
    return res.status(200).json({ rutas });
  }
  res.status(405).json({ error: 'Método no permitido' });
}
