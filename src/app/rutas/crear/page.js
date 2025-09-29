'use client';
import { useState } from 'react';

const actividades = [
  { nombre: 'Lagos', icon: '🌊' },
  { nombre: 'Senderismo', icon: '🥾' },
  { nombre: 'Artesanías', icon: '🧵' },
  { nombre: 'Gastronomía', icon: '🍲' },
  { nombre: 'Cultura', icon: '🏛️' },
  { nombre: 'Aventura', icon: '🚣' },
  { nombre: 'Fotografía', icon: '📸' },
];

export default function CrearRuta() {
  const [seleccionadas, setSeleccionadas] = useState([]);

  const toggleActividad = (nombre) => {
    setSeleccionadas(prev =>
      prev.includes(nombre)
        ? prev.filter(a => a !== nombre)
        : [...prev, nombre]
    );
  };

  const handleSiguiente = () => {
    // Aquí podrías guardar la selección y navegar a la siguiente etapa
    alert('Seleccionaste: ' + seleccionadas.join(', '));
    // Ejemplo: router.push('/rutas/generar') si tienes la siguiente página
  };

  return (
    <div style={{
      maxWidth: 600,
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
        ¿Cuáles son tus actividades favoritas?
      </h2>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.2rem',
        justifyContent: 'center',
        marginBottom: '2.5rem'
      }}>
        {actividades.map(act => (
          <button
            key={act.nombre}
            onClick={() => toggleActividad(act.nombre)}
            style={{
              background: seleccionadas.includes(act.nombre)
                ? 'linear-gradient(90deg,#2563eb 0%,#22c55e 100%)'
                : '#e0e7ff',
              color: seleccionadas.includes(act.nombre) ? '#fff' : '#2563eb',
              border: 'none',
              borderRadius: '12px',
              padding: '1.2rem 2rem',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: seleccionadas.includes(act.nombre)
                ? '0 2px 12px #2563eb55'
                : '0 2px 12px #2563eb22',
              transition: 'background 0.2s'
            }}
          >
            <span style={{fontSize:'2rem', marginRight:'0.7rem'}}>{act.icon}</span>
            {act.nombre}
          </button>
        ))}
      </div>
      <button
        onClick={handleSiguiente}
        disabled={seleccionadas.length === 0}
        style={{
          background: 'linear-gradient(90deg,#22c55e 0%,#2563eb 100%)',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          border: 'none',
          borderRadius: '10px',
          padding: '0.8rem 2.2rem',
          cursor: seleccionadas.length === 0 ? 'not-allowed' : 'pointer',
          boxShadow: '0 2px 12px #2563eb22',
          transition: 'background 0.2s'
        }}
      >
        Siguiente
      </button>
    </div>
  );
}
