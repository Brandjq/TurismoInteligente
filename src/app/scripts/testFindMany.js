import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const actividades = await prisma.actividad.findMany();
  console.log('Actividades encontradas:', actividades);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
