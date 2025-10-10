'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const cintaImages = [
  '/mirador-atitlan.jpg',
  '/cerro.jpg',
  '/azul.jpg',
  '/lacustre.jpg',
  '/mapa.jpg',
  '/nahuala.jpg',
];

export default function RutasBienvenida() {
  const [usuarioId, setUsuarioId] = useState(null);
  const [rutaEnCurso, setRutaEnCurso] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let id = null;
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/session=([^;]+)/);
      if (match) {
        try {
          const session = JSON.parse(decodeURIComponent(match[1]));
          if (session.id) id = session.id;
        } catch {}
      }
      if (!id) {
        const idLocal = localStorage.getItem('usuario_id');
        if (idLocal) id = parseInt(idLocal, 10);
      }
    }
    setUsuarioId(id);

    setRutaEnCurso(localStorage.getItem('ruta_en_curso') === 'true');
  }, []);

  const handleAceptarRuta = async (ruta) => {
    if (usuarioId) {
      await fetch('/api/rutas-generadas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuarioId,
          nombre: ruta.nombre || 'Ruta generada',
          itinerario: ruta.itinerario
        })
      });
    }
    let rutasLocal = [];
    const local = localStorage.getItem('rutas_generadas');
    if (local) rutasLocal = JSON.parse(local);
    rutasLocal.push({
      usuarioId,
      nombre: ruta.nombre || 'Ruta generada',
      itinerario: ruta.itinerario,
      creadoEn: new Date().toISOString()
    });
    localStorage.setItem('rutas_generadas', JSON.stringify(rutasLocal));
  };

  if (rutaEnCurso) {
    return (
      <div style={{
        maxWidth: 600,
        margin: '4rem auto',
        padding: '2.5rem 2rem',
        background: 'linear-gradient(120deg,#fef9c3 60%,#fff 100%)',
        borderRadius: '18px',
        boxShadow: '0 4px 24px #fbbf2433',
        textAlign: 'center',
        color: '#b45309'
      }}>
        <span style={{fontSize:'2.2rem', display:'block', marginBottom:'1rem'}}>⚠️</span>
        <h2 style={{color:'#eab308', fontWeight:'bold', fontSize:'2rem', marginBottom:'1rem'}}>¡Ya tienes una ruta en curso!</h2>
        <p style={{fontSize:'1.15rem', marginBottom:'2rem'}}>
          Debes finalizar tu ruta actual antes de crear una nueva.<br />
          <span style={{color:'#2563eb', fontWeight:'bold'}}>Haz click en el banner azul para continuar tu ruta en curso.</span>
        </p>
        <button
          onClick={() => router.push('/viaje-en-curso')}
          style={{
            background: 'linear-gradient(90deg,#22c55e 0%,#2563eb 100%)',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            border: 'none',
            borderRadius: '10px',
            padding: '1rem 2.2rem',
            cursor: 'pointer',
            boxShadow: '0 2px 12px #2563eb33'
          }}
        >
          Ir a mi ruta en curso
        </button>
      </div>
    );
  }


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


