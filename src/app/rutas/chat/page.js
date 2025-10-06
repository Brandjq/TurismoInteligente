'use client';
import { useState } from 'react';

export default function RutasChatBot() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: '¡Hola! Cuéntame qué te gustaría hacer y cuántos días planeas ir. Ejemplo: "Me gustan los lagos y quiero ir 3 días".' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    setLoading(true);

    // Simulación de respuesta del bot usando lógica simple (puedes conectar a tu backend/RAG aquí)
    setTimeout(() => {
      let actividades = [];
      let dias = 1;
      if (input.toLowerCase().includes('lago')) actividades.push('Lagos');
      if (input.toLowerCase().includes('senderismo')) actividades.push('Senderismo');
      if (input.toLowerCase().includes('artesanía')) actividades.push('Artesanías');
      if (input.toLowerCase().includes('gastronomía')) actividades.push('Gastronomía');
      if (input.toLowerCase().includes('cultura')) actividades.push('Cultura');
      if (input.toLowerCase().includes('aventura')) actividades.push('Aventura');
      if (input.toLowerCase().includes('fotografía')) actividades.push('Fotografía');
      const diasMatch = input.match(/(\d+)\s*d[ií]as?/i);
      if (diasMatch) dias = parseInt(diasMatch[1]);

      let respuesta = '';
      if (actividades.length === 0) {
        respuesta = 'Por favor dime qué actividades te interesan (ejemplo: lagos, senderismo, gastronomía).';
      } else {
        respuesta = `¡Perfecto! Te recomiendo una ruta de ${dias} día${dias > 1 ? 's' : ''} con actividades: ${actividades.join(', ')}.`;
        respuesta += '\n\nItinerario sugerido:\n';
        actividades.forEach((act, idx) => {
          respuesta += `Día ${idx + 1}: Visita lugares relacionados con ${act}.\n`;
        });
        respuesta += '\n(La generación inteligente se puede mejorar con RAG y tu base de datos)';
      }

      setMessages(msgs => [...msgs, { from: 'bot', text: respuesta }]);
      setLoading(false);
      setInput('');
    }, 1200);
  };

  return (
    <div style={{
      maxWidth: 600,
      margin: '4rem auto',
      padding: '2.5rem 2rem',
      background: 'linear-gradient(120deg,#e0f7fa 60%,#fff 100%)',
      borderRadius: '18px',
      boxShadow: '0 4px 24px rgba(52,152,219,0.12)',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '70vh'
    }}>
      <h2 style={{
        fontSize: '2rem',
        color: '#2563eb',
        fontWeight: 'bold',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        Asistente de rutas inteligentes
      </h2>
      <div style={{
        flex: 1,
        overflowY: 'auto',
        marginBottom: '1.5rem',
        background: '#e0e7ff',
        borderRadius: '12px',
        padding: '1rem'
      }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            textAlign: msg.from === 'bot' ? 'left' : 'right',
            marginBottom: '1rem'
          }}>
            <span style={{
              display: 'inline-block',
              background: msg.from === 'bot' ? '#2563eb22' : '#22c55e22',
              color: '#222',
              borderRadius: '10px',
              padding: '0.7rem 1.2rem',
              fontWeight: msg.from === 'bot' ? '500' : 'bold',
              maxWidth: '90%',
              whiteSpace: 'pre-line'
            }}>
              {msg.text}
            </span>
          </div>
        ))}
        {loading && (
          <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
            <span style={{
              display: 'inline-block',
              background: '#2563eb22',
              color: '#222',
              borderRadius: '10px',
              padding: '0.7rem 1.2rem',
              fontWeight: '500'
            }}>
              Generando ruta...
            </span>
          </div>
        )}
      </div>
      <form
        onSubmit={e => { e.preventDefault(); handleSend(); }}
        style={{ display: 'flex', gap: '1rem' }}
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Escribe tus intereses y días..."
          style={{
            flex: 1,
            fontSize: '1.15rem',
            padding: '0.7rem 1.2rem',
            borderRadius: '10px',
            border: '1px solid #2563eb'
          }}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            background: 'linear-gradient(90deg,#22c55e 0%,#2563eb 100%)',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.15rem',
            border: 'none',
            borderRadius: '10px',
            padding: '0.7rem 2rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 12px #2563eb22',
            transition: 'background 0.2s'
          }}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
