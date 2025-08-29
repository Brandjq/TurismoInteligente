
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'Usuario o contraseña incorrectos' }, { status: 401 });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: 'Usuario o contraseña incorrectos' }, { status: 401 });
    }
    // Guardar cookie de sesión
    const response = NextResponse.json({ message: 'Login exitoso', user: { id: user.id, email: user.email, isAdmin: user.isAdmin } });
    response.cookies.set('session', JSON.stringify({ id: user.id, email: user.email, isAdmin: user.isAdmin }), {
      path: '/',
      sameSite: 'lax',
      // Sin expires: expira al cerrar navegador
    });
    return response;
  } catch (err) {
    return NextResponse.json({ error: 'Error inesperado en el login' }, { status: 500 });
  }
}
