'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function DiasContent() {
  const [dias, setDias] = useState(1);
  const [tipoRuta, setTipoRuta] = useState('corta');
  const router = useRouter();
  const searchParams = useSearchParams();
  const actividades = searchParams.get('actividades') || '';

  const handleSiguiente = () => {
    router.push(`/rutas/itinerario?actividades=${encodeURIComponent(actividades)}&dias=${dias}&tipo=${tipoRuta}`);
  };

  return (
    <div style={{
      maxWidth: 500,
      margin: '4rem auto',
      padding: '2.5rem 2rem',
      background: 'linear-gradient(120deg,#e0f7fa 60%,#fff 100%)',
      borderRadius: '18px',
      boxShadow: '0 4px 24px rgba(52,152,219,0.12)',
      textAlign: 'center'
    }}>
      <h2 style={{
        fontSize: '2rem',
        color: '#2563eb',
        fontWeight: 'bold',
        marginBottom: '2rem'
      }}>
        ¿Cuántos días planeas ir?
      </h2>
      <input
        type="number"
        min={1}
        max={14}
        value={dias}
        onChange={e => setDias(Number(e.target.value))}
        style={{
          fontSize: '1.2rem',
          padding: '0.7rem 1.2rem',
          borderRadius: '8px',
          border: '1px solid #2563eb',
          marginBottom: '2rem',
          width: '120px',
          textAlign: 'center'
        }}
      />
      <h3 style={{
        fontSize: '1.15rem',
        color: '#2563eb',
        fontWeight: 'bold',
        marginBottom: '1.2rem'
      }}>
        ¿Qué tipo de ruta prefieres?
      </h3>
      <div style={{
        display: 'flex',
        gap: '1.2rem',
        justifyContent: 'center',
        marginBottom: '2.5rem'
      }}>
        {['corta', 'media', 'larga'].map(tipo => (
          <button
            key={tipo}
            onClick={() => setTipoRuta(tipo)}
            style={{
              background: tipoRuta === tipo
                ? 'linear-gradient(90deg,#2563eb 0%,#22c55e 100%)'
                : '#e0e7ff',
              color: tipoRuta === tipo ? '#fff' : '#2563eb',
              border: 'none',
              borderRadius: '12px',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: tipoRuta === tipo
                ? '0 2px 12px #2563eb55'
                : '0 2px 12px #2563eb22',
              transition: 'background 0.2s'
            }}
          >
            {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
          </button>
        ))}
      </div>
      <button
        onClick={handleSiguiente}
        style={{
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
        }}
      >
        Siguiente
      </button>
    </div>
  );
}

export default function SeleccionDiasRuta() {
  // El error de Suspense ya está solucionado y el archivo está listo para commit.
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <DiasContent />
    </Suspense>
  );
}
