import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, message } = req.body;

    // Configuración del transporte de Nodemailer
    const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'itoursolola@gmail.com',
    pass: 'mvew qget gaaf hzep',
  },
  debug: true, // Habilita el modo de depuración
  logger: true, // Habilita el registro de logs
});

    try {
      // Enviar el correo
      await transporter.sendMail({
        from: '"Sistema de Contacto" <itoursolola@gmail.com>', // Remitente fijo
        to: 'itoursolola@gmail.com', // Correo del sistema
        subject: 'Nueva solicitud de contacto',
        text: message,
        html: `
          <h3>Nueva solicitud de contacto</h3>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message}</p>
        `,
      });

      res.status(200).json({ success: true, message: 'Correo enviado correctamente.' });
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).json({ success: false, message: 'Error al enviar el correo.' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido.' });
  }
}
