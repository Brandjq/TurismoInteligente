import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    const hoteles = await prisma.hotel.findMany();
    for (let i = 0; i < hoteles.length; i++) {
      const nombreImagen = `hotel${i + 1}.jpg`;
      await prisma.hotel.update({
        where: { id: hoteles[i].id },
        data: { imagen: nombreImagen }
      });
      console.log(`Hotel ${hoteles[i].nombre} actualizado a imagen: ${nombreImagen}`);
    }
  } catch (e) {
    console.error('Error al actualizar imágenes:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
