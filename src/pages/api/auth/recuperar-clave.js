import { hash } from 'bcryptjs';
import { getDb } from '../../../lib/db'; // Ajusta la ruta según tu estructura

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Método no permitido');
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Faltan datos');
  }
  try {
    const db = await getDb();
    const user = await db.collection('usuarios').findOne({ email });
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }
    const hashed = await hash(password, 10);
    await db.collection('usuarios').updateOne({ email }, { $set: { password: hashed } });
    return res.status(200).send('Contraseña actualizada');
  } catch (err) {
    return res.status(500).send('Error en el servidor');
  }
}
