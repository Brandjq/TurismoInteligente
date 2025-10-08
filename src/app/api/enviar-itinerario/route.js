// Endpoint API para enviar el itinerario por correo

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  const { email, itinerario } = await req.json();

  if (!email || !itinerario) {
    return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
  }

  // Construir resumen del itinerario en HTML
  let resumen = `<h2>¡Este ha sido tu itinerario generado por el sistema web de Turismo Inteligente de Itour Sololá!</h2>`;
  if (Array.isArray(itinerario)) {
    itinerario.forEach((dia, idx) => {
      resumen += `<h3>Día ${dia.dia}</h3><ul>`;
      if (Array.isArray(dia.actividades)) {
        dia.actividades.forEach(act => {
          resumen += `<li><b>${act.actividad}</b> en <b>${act.lugar}</b><br/>${act.descripcion}<br/>Tiempo estimado: ${act.tiempo_estimado} min, Distancia: ${act.distancia} km, Transporte: ${act.transporte}<br/>Restaurante cercano: ${act.restaurante_cercano}</li>`;
        });
      }
      if (dia.recomendacion) {
        resumen += `<li><i>Recomendación: ${dia.recomendacion}</i></li>`;
      }
      resumen += `</ul>`;
    });
  } else {
    resumen += `<pre>${JSON.stringify(itinerario, null, 2)}</pre>`;
  }

  // Configura tu transportador de nodemailer (ajusta con tus credenciales)
  const transporter = nodemailer.createTransport({
    service: 'gmail', // o el servicio que uses
    auth: {
      user: process.env.EMAIL_USER, // tu correo
      pass: process.env.EMAIL_PASS  // tu contraseña o app password
    }
  });

  try {
    await transporter.sendMail({
      from: `"Itour Sololá" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Tu itinerario personalizado - Itour Sololá',
      html: resumen
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: 'Error al enviar el correo' }, { status: 500 });
  }
}
