import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  const { email, itinerario, pdfBase64 } = await req.json();

  if (!email || !itinerario) {
    return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
  }

  // Generar tabla HTML del itinerario
  let tablaHtml = '';
  if (Array.isArray(itinerario)) {
    tablaHtml = `<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:15px;">
      <thead style="background:#2563eb;color:#fff;">
        <tr>
          <th>Día</th>
          <th>Actividad</th>
          <th>Lugar</th>
          <th>Descripción</th>
          <th>Tiempo</th>
          <th>Distancia</th>
          <th>Transporte</th>
          <th>Restaurante</th>
        </tr>
      </thead>
      <tbody>`;
    itinerario.forEach(dia => {
      if (Array.isArray(dia.actividades)) {
        dia.actividades.forEach((act, idx) => {
          tablaHtml += `<tr>
            <td>${idx === 0 ? `Día ${dia.dia}` : ''}</td>
            <td>${act.actividad || ''}</td>
            <td>${act.lugar || ''}</td>
            <td>${act.descripcion || ''}</td>
            <td>${act.tiempo_estimado || ''} min</td>
            <td>${act.distancia || ''} km</td>
            <td>${act.transporte || ''}</td>
            <td>${act.restaurante_cercano || ''}</td>
          </tr>`;
        });
      }
      if (dia.recomendacion) {
        tablaHtml += `<tr>
          <td colspan="8" style="background:#e0f7fa;color:#2563eb;font-style:italic;">
            💡 Recomendación: ${dia.recomendacion}
          </td>
        </tr>`;
      }
    });
    tablaHtml += '</tbody></table>';
  }

  // HTML del correo
  const html = `
    <div style="font-family:sans-serif;">
      <h2 style="color:#2563eb;">¡Este ha sido tu itinerario generado por el sistema web de Turismo Inteligente de Itour Sololá!</h2>
      <p style="font-size:16px;">A continuación te presentamos tu itinerario en formato tabla:</p>
      ${tablaHtml}
      <p style="margin-top:2rem;font-size:15px;">Adjuntamos también tu itinerario en PDF para que lo descargues y lleves contigo.</p>
      <p style="color:#2563eb;font-weight:bold;">¡Buen viaje!<br/>Equipo Itour Sololá</p>
    </div>
  `;

  // Configuración de nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Adjuntos (PDF)
  const attachments = pdfBase64
    ? [{
        filename: 'itinerario.pdf',
        content: Buffer.from(pdfBase64, 'base64'),
        contentType: 'application/pdf'
      }]
    : [];

  try {
    await transporter.sendMail({
      from: `"Itour Sololá" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Tu itinerario personalizado - Itour Sololá',
      html,
      attachments
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return NextResponse.json({ error: 'Error al enviar el correo' }, { status: 500 });
  }
}
