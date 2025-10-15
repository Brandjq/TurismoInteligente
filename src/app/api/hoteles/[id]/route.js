import { PrismaClient } from '@prisma/client';

export async function DELETE(request, { params }) {
  const prisma = new PrismaClient();
  const id = Number(params.id);
  try {
    await prisma.hotel.delete({ where: { id } });
    await prisma.$disconnect();
    return new Response(null, { status: 204 });
  } catch (err) {
    await prisma.$disconnect();
    return new Response(JSON.stringify({ error: 'Error al eliminar hotel' }), { status: 500 });
  }
}
