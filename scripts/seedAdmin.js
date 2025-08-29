
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('admin', 10);
  await prisma.user.upsert({
    where: { email: 'admin@turismo.com' },
    update: {},
    create: {
      email: 'admin@turismo.com',
      password,
      isAdmin: true,
    },
  });
  console.log('Usuario admin creado o actualizado');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
