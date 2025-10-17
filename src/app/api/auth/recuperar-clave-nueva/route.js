import { NextResponse } from 'next/server';
import db from '../../../../lib/db'; // Ruta relativa
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Correo y contraseña son requeridos.' }, { status: 400 });
    }

    // Verifica si el usuario existe
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado.' }, { status: 404 });
    }

    // Hashea la nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Actualiza la contraseña en la base de datos
    await db.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: 'Contraseña actualizada correctamente.' }, { status: 200 });
  } catch (error) {
    console.error('Error en el servidor:', error);

    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}
