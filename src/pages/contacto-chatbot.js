"use client"; // Marca este archivo como un componente del lado del cliente

import { useState } from 'react';

export default function ContactoChatbot() {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        console.error('Error al enviar el formulario.');
        alert('Hubo un problema al enviar tu solicitud. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Hubo un problema al enviar tu solicitud. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '2rem auto',
      padding: '2rem',
      background: '#f9fafb',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h1 style={{
        fontSize: '2rem',
        color: '#2563eb',
        marginBottom: '1rem',
        textAlign: 'center',
      }}>
        Contáctanos
      </h1>
      <p style={{
        fontSize: '1.2rem',
        color: '#475569',
        marginBottom: '1.5rem',
        textAlign: 'center',
      }}>
        Si tienes dudas o necesitas soporte, por favor completa el formulario a continuación. Nuestro equipo de administración se pondrá en contacto contigo lo antes posible.
      </p>
      {!submitted ? (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            required
            style={{
              padding: '0.8rem',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              outline: 'none',
            }}
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Escribe tu solicitud o mensaje aquí..."
            required
            style={{
              padding: '0.8rem',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              outline: 'none',
              minHeight: '120px',
            }}
          />
          <button
            type="submit"
            style={{
              background: '#2563eb',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 'bold',
              padding: '0.8rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.3s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#1e40af'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#2563eb'}
          >
            Enviar
          </button>
        </form>
      ) : (
        <div style={{
          textAlign: 'center',
          color: '#2563eb',
          fontSize: '1.2rem',
          fontWeight: 'bold',
        }}>
          ¡Gracias por contactarnos! Tu solicitud ha sido enviada y nuestro equipo se pondrá en contacto contigo pronto.
        </div>
      )}
    </div>
  );
}
