'use client';
import Link from 'next/link';
import Image from 'next/image';

const cintaImages = [
  '/mirador-atitlan.jpg',
  '/cerro.jpg',
  '/azul.jpg',
  '/lacustre.jpg',
  '/mapa.jpg',
  '/nahuala.jpg',
];

export default function RutasBienvenida() {
  return (
    <div style={{
      maxWidth: '700px',
      margin: '4rem auto',
      padding: '2.5rem 2rem',
      background: 'linear-gradient(120deg,#e0f7fa 60%,#fff 100%)',
      borderRadius: '18px',
      boxShadow: '0 4px 24px rgba(52,152,219,0.12)',
      textAlign: 'center',
      position: 'relative'
    }}>
      {/* Carrusel animado tipo cinta */}
      <div style={{
        width: '100%',
        overflow: 'hidden',
        marginBottom: '2.5rem',
        padding: '0.5rem 0',
        position: 'relative'
      }}>
        <div
          style={{
            display: 'flex',
            gap: '2vw',
            alignItems: 'center',
            width: 'max-content',
            animation: 'carousel-move 32s linear infinite'
          }}
        >
          {cintaImages.map((img, idx) => (
            <img
              key={img}
              src={img}
              alt={`Ruta turística ${idx + 1}`}
              style={{
                width: '220px',
                height: '140px',
                objectFit: 'cover',
                borderRadius: '2rem',
                boxShadow: '0 4px 24px #2563eb22',
                background: '#fff'
              }}
            />
          ))}
        </div>
        <style>{`
          @keyframes carousel-move {
            0% { transform: translateX(0); }
            100% { transform: translateX(-40vw); }
          }
        `}</style>
      </div>
      <h1 style={{
        fontSize: '2.8rem',
        color: '#2563eb',
        fontWeight: 'bold',
        marginBottom: '1.5rem'
      }}>
        ¡Bienvenido a Rutas Turísticas!
      </h1>
      <p style={{
        fontSize: '1.25rem',
        color: '#334155',
        marginBottom: '2rem'
      }}>
        Explora los mejores destinos, rutas y experiencias turísticas de Guatemala.<br />
        Selecciona una opción del menú para comenzar tu viaje.
      </p>
      <Link href="/rutas/crear">
        <button style={{
          background: 'linear-gradient(90deg,#22c55e 0%,#2563eb 100%)',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          border: 'none',
          borderRadius: '10px',
          padding: '0.8rem 2.2rem',
          cursor: 'pointer',
          boxShadow: '0 2px 12px #2563eb22',
          transition: 'background 0.2s'
        }}>
          Crear ruta
        </button>
      </Link>
    </div>
  );
}


