'use client';
import { useEffect, useState } from "react";

export default function RutasGeneradasPage() {
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itinerarioSeleccionado, setItinerarioSeleccionado] = useState(null);

  useEffect(() => {
    async function fetchRutas() {
      setLoading(true);
      try {
        let usuarioId = null;
        if (typeof document !== "undefined") {
          const match = document.cookie.match(/session=([^;]+)/);
          if (match) {
            try {
              const session = JSON.parse(decodeURIComponent(match[1]));
              if (session.id) usuarioId = session.id;
            } catch {}
          }
          if (!usuarioId) {
            const idLocal = localStorage.getItem('usuario_id');
            if (idLocal) usuarioId = parseInt(idLocal, 10);
          }
        }
        if (!usuarioId) {
          setRutas([]);
          setLoading(false);
          return;
        }
        let url = '/api/rutas-generadas';
        url += `?usuarioId=${usuarioId}`;
        const res = await fetch(url, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setRutas(Array.isArray(data) ? data : (data.rutas || []));
        } else {
          setRutas([]);
        }
      } catch {
        setRutas([]);
      }
      setLoading(false);
    }
    fetchRutas();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <span style={{ fontSize: '1.5rem', color: '#2563eb' }}>🔄</span>
        <p style={{ color: '#475569', fontSize: '1.2rem' }}>Cargando rutas generadas...</p>
      </div>
    );
  }

  if (itinerarioSeleccionado) {
    return (
      <div style={{
        maxWidth: 900,
        margin: '3rem auto',
        padding: '3rem 2.5rem',
        background: 'linear-gradient(120deg,#e0e7ff 60%,#fff 100%)',
        borderRadius: '28px',
        boxShadow: '0 8px 40px rgba(52,152,219,0.15)',
        fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif"
      }}>
        <button
          onClick={() => setItinerarioSeleccionado(null)}
          style={{
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.7rem 1.5rem',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            marginBottom: '2rem',
            cursor: 'pointer'
          }}
        >
          ← Volver a rutas generadas
        </button>
        <pre style={{background:'#fff', padding:'1.5rem', borderRadius:'14px', color:'#222', fontSize:'1.15rem', whiteSpace:'pre-wrap', wordBreak:'break-word'}}>
          {JSON.stringify(itinerarioSeleccionado, null, 2)}
        </pre>
      </div>
    );
  }

  if (rutas.length === 0) {
    return (
      <div style={{
        maxWidth: 700,
        margin: '3rem auto',
        padding: '2.5rem 1.5rem',
        background: '#f8fafc',
        borderRadius: '18px',
        boxShadow: '0 4px 16px #2563eb22',
        fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#2563eb', fontSize: '2.2rem', marginBottom: '1.5rem' }}>Tus rutas generadas</h1>
        <p style={{ color: '#64748b', fontSize: '1.15rem', marginBottom: '2rem' }}>
          No tienes rutas generadas.
        </p>
        <a
          href="/rutas"
          style={{
            display: 'inline-block',
            padding: '0.7rem 1.5rem',
            background: '#2563eb',
            color: '#fff',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(37,99,235,0.3)',
          }}
        >
          Generar una ruta
        </a>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: 900,
      margin: '3rem auto',
      padding: '3rem 2.5rem',
      background: 'linear-gradient(120deg,#e0e7ff 60%,#fff 100%)',
      borderRadius: '28px',
      boxShadow: '0 8px 40px rgba(52,152,219,0.15)',
      fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif"
    }}>
      <h1 style={{color:'#2563eb', fontSize:'2.2rem', marginBottom:'2rem', textAlign:'center'}}>Tus rutas generadas</h1>
      <ul style={{listStyle:'none', padding:0, margin:0}}>
        {rutas.map((ruta, idx) => (
          <li key={ruta.id || idx} style={{
            background:'#fff',
            borderRadius:'12px',
            boxShadow:'0 2px 12px #2563eb11',
            marginBottom:'1.5rem',
            padding:'1.5rem 1.2rem',
            display:'flex',
            alignItems:'center',
            justifyContent:'space-between',
            cursor:'pointer',
            border: '1px solid #e0e7ff',
            position: 'relative'
          }}>
            <span
              style={{fontWeight:'bold', color:'#2563eb', fontSize:'1.15rem'}}
              onClick={() => setItinerarioSeleccionado(ruta.itinerario)}
            >
              Ruta generada {idx + 1}
            </span>
            <span style={{fontSize:'1.7rem', color:'#2563eb', marginLeft:'1rem'}}>🧭</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// No hay cambios en este archivo, pero el error indica que tu endpoint no existe en la ruta esperada.
// Asegúrate de tener el archivo API en la ruta correcta:

// Debes crear el archivo:
// c:\Users\brand\turismo\turismointeligente\src\app\api\rutas-generadas\route.js

// Si usas Next.js 13+ con app router, el endpoint debe estar en:
// src/app/api/rutas-generadas/route.js

// Ejemplo de endpoint compatible con app router:
