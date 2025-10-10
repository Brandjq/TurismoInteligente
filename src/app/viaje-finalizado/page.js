'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ViajeFinalizado() {
  const router = useRouter();

  useEffect(() => {
    // Limpia el estado de ruta en curso y checklist al finalizar
    localStorage.removeItem('itinerario_final');
    localStorage.removeItem('ruta_en_curso');
    localStorage.removeItem('checklist_ruta');
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(120deg,#e0e7ff 60%,#fff 100%)'
    }}>
      <img
        src="/logo.jpg"
        alt="Itour Sololá"
        style={{
          width: '320px',
          maxWidth: '90vw',
          borderRadius: '32px',
          boxShadow: '0 8px 40px #2563eb33',
          marginBottom: '2.5rem'
        }}
      />
      <h1 style={{
        color: '#22c55e',
        fontSize: '2.7rem',
        fontWeight: 'bold',
        marginBottom: '1.2rem',
        textAlign: 'center'
      }}>
        ¡Gracias por vivir tu experiencia con Itour Sololá!
      </h1>
      <p style={{
        color: '#2563eb',
        fontSize: '1.35rem',
        marginBottom: '2.5rem',
        textAlign: 'center',
        maxWidth: 600
      }}>
        Esperamos que hayas disfrutado tu viaje.<br />
        ¿Quieres seguir explorando o generar una nueva ruta personalizada?
      </p>
      <button
        onClick={() => router.push('/rutas/crear')}
        style={{
          background: 'linear-gradient(90deg,#22c55e 0%,#2563eb 100%)',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '1.25rem',
          border: 'none',
          borderRadius: '14px',
          padding: '1.2rem 2.7rem',
          cursor: 'pointer',
          boxShadow: '0 2px 16px #2563eb33'
        }}
      >
        🌄 Generar otra ruta
      </button>
    </div>
  );
}
