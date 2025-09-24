import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

export async function POST(request) {
  const { email, password } = await request.json();
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return new Response(JSON.stringify({ error: 'El correo ya está registrado' }), { status: 400 });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hash },
  });

  // Log variables de entorno para depuración (no mostrar contraseñas en producción real)
  console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'OK' : 'NO');
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'OK' : 'NO');

  // Configura el transporte de nodemailer
  let transporter;
  try {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    // Verifica conexión con el servidor SMTP
    await transporter.verify();
    console.log('Transporte de correo verificado correctamente');
  } catch (err) {
    console.error('Error al configurar/verificar el transporte de correo:', err);
    return new Response(JSON.stringify({ error: 'Error de configuración de correo', details: err.message }), { status: 500 });
  }

  // Envía el correo de bienvenida
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: '¡Bienvenido a itour Sololá!',
      html: `
        <div style="font-family:Arial,sans-serif;background:#f7fafc;padding:2rem;border-radius:18px;max-width:520px;margin:auto;">
          <img src='https://turismointeligente.brandjq.com/logo.jpg' alt='Logo itour Sololá' style='width:120px;height:120px;border-radius:50%;margin-bottom:1.2rem;box-shadow:0 2px 12px #3182ce22;display:block;margin-left:auto;margin-right:auto;' />
          <h2 style='color:#234e70;font-size:2rem;font-weight:800;text-align:center;margin-bottom:1.2rem;'>¡Nos alegra darte la bienvenida a <span style="color:#3182ce">itour Sololá</span>!</h2>
          <p style='color:#234e70;font-size:1.15rem;text-align:left;margin-bottom:1.2rem;'>
            Hola,<br/><br/>
            Ahora formas parte de una comunidad que disfruta descubrir Sololá de una manera diferente: con rutas personalizadas, recomendaciones inteligentes y toda la información que necesitas para vivir experiencias únicas.<br/><br/>
            <b>Desde tu cuenta podrás:</b><br/>
            ✅ Explorar lugares turísticos destacados.<br/>
            ✅ Generar rutas personalizadas según tus intereses.<br/>
            ✅ Acceder a recomendaciones en tiempo real.<br/>
            ✅ Guardar tus sitios favoritos para futuras visitas.<br/><br/>
            Estamos felices de acompañarte en cada paso de tu aventura. 🚀<br/><br/>
            👉 <b>Ingresa ya a tu perfil y comienza a planificar tu próxima experiencia en Sololá.</b><br/><br/>
            Gracias por confiar en nosotros.<br/>
            El equipo de <span style="color:#3182ce;font-weight:700;">itour Sololá</span> 💙
          </p>
        </div>
      `,
    });
    console.log('Correo enviado correctamente a', email);
  } catch (err) {
    console.error('Error al enviar el correo:', err);
    return new Response(JSON.stringify({ error: 'Usuario creado pero error al enviar correo', details: err.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ message: 'Usuario registrado y correo enviado', user: { id: user.id, name: user.name, email: user.email } }), { status: 201 });
}
  } catch (err) {
    console.error('Error al enviar el correo:', err);
    return new Response(JSON.stringify({ error: 'Usuario creado pero error al enviar correo', details: err.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ message: 'Usuario registrado y correo enviado', user: { id: user.id, name: user.name, email: user.email } }), { status: 201 });
}
