import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Método no permitido');
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Faltan datos');
  }
  try {
    const user = await prisma.User.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }
    const hashed = await hash(password, 10);
    await prisma.User.update({ where: { email }, data: { password: hashed } });
    return res.status(200).send('Contraseña actualizada');
  } catch (err) {
    return res.status(500).send('Error en el servidor');
  }
}
