// Endpoint para iniciar el flujo OAuth con Google y manejar el callback

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';

// 1. Redirige al usuario a Google OAuth
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    // Paso 1: Redirigir a Google
    const redirect_uri = `${BASE_URL}/api/auth/google`;
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'consent'
    });
    return NextResponse.redirect(
      `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
    );
  }

  // Paso 2: Intercambiar el código por un token
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${BASE_URL}/api/auth/google`,
      grant_type: 'authorization_code'
    })
  });
  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) {
    return NextResponse.redirect(`${BASE_URL}/login?error=google`);
  }

  // Paso 3: Obtener datos del usuario
  const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${tokenData.access_token}` }
  });
  const user = await userRes.json();

  // Buscar o crear usuario en la base de datos
  let dbUser = await prisma.user.findUnique({
    where: { email: user.email }
  });

  // Si el usuario existe pero no tiene password (fue creado por Google), lo dejamos igual.
  // Si el usuario existe y tiene password (manual), lo usamos tal cual.
  // Si NO existe, lo creamos.
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        email: user.email,
        password: "", // Google user, sin password real
        // nombre: user.name, // Si tienes el campo nombre en tu modelo User, descomenta esta línea
        // foto: user.picture, // Si tienes el campo foto en tu modelo User, descomenta esta línea
      }
    });
  }

  const session = {
    email: dbUser.email,
    nombre: dbUser.nombre || user.name || dbUser.email,
    mostrar: dbUser.nombre || user.name || dbUser.email, // Mostrar nombre si existe, si no email
    // foto: dbUser.foto || user.picture, // Si tienes el campo foto
    isAdmin: dbUser.isAdmin || false,
    id: dbUser.id // <-- Asegúrate de que el id esté en la cookie de sesión
  };

  // Guarda el usuario en la cookie y también en localStorage si lo necesitas en el frontend
  // Si tu frontend espera un campo específico para mostrar el usuario, asegúrate de usarlo

  // Redirige al home con la cookie de sesión
  const redirectUrl = `${BASE_URL}/`;
  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set('session', encodeURIComponent(JSON.stringify(session)), {
    path: '/',
    httpOnly: false,
    sameSite: 'lax'
  });
  return response;
}
