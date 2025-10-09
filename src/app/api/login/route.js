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

// Este endpoint solo maneja login tradicional.
// Para login con Google, debes usar una solución de autenticación OAuth, como NextAuth.js.

// PASOS RECOMENDADOS:
// 1. Instala NextAuth.js:
//    npm install next-auth

// 2. Crea el archivo de configuración en:
//    src/app/api/auth/[...nextauth]/route.js

// 3. Configura el proveedor de Google en ese archivo.
//    Ejemplo básico:

/*
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // Puedes agregar callbacks para guardar el usuario en tu BD si lo deseas
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
*/

// 4. En tu frontend, agrega un botón "Continuar con Google" que haga:
//    import { signIn } from "next-auth/react";
//    <button onClick={() => signIn("google")}>Continuar con Google</button>

// 5. NextAuth manejará la sesión y el login con Google automáticamente.
