// Prueba rápida para ver si tienes datos en la tabla Favorito usando Prisma

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function testFavoritos() {
  const favoritos = await prisma.favorito.findMany();
  console.log('Favoritos en la BD:', favoritos);
}

testFavoritos();
