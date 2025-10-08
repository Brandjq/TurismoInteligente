'use client';
import { useEffect, useState } from 'react';

export default function FavoritosPage() {
  const [favoritos, setFavoritos] = useState([]);
  const [itinerarioSeleccionado, setItinerarioSeleccionado] = useState(null);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('itinerarios_favoritos') || '[]');
    setFavoritos(favs);
  }, []);

  if (itinerarioSeleccionado) {
    // Mostrar el itinerario seleccionado en detalle
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
            marginBottom: '2rem',
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.7rem 1.5rem',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            cursor: 'pointer'
          }}
        >
          ← Volver a favoritos
        </button>
        <h2 style={{color:'#22c55e', fontSize:'2.2rem', marginBottom:'2rem'}}>Itinerario Favorito</h2>
        {Array.isArray(itinerarioSeleccionado) ? (
          itinerarioSeleccionado.map((dia, idx) => (
            <section key={idx} style={{
              marginBottom: '3.5rem',
              padding: '2.2rem 2rem',
              background: idx % 2 === 0 ? '#f8fafc' : '#e0e7ff',
              borderRadius: '18px',
              boxShadow: '0 2px 16px #2563eb11',
              border: '1.5px solid #e0e7ff'
            }}>
              <header style={{
                marginBottom:'2rem',
                borderBottom:'2px solid #2563eb22',
                paddingBottom:'1rem'
              }}>
                <h2 style={{
                  color:'#22c55e',
                  fontSize:'2.2rem',
                  marginBottom:'0.7rem',
                  fontWeight:'bold'
                }}>
                  Día {dia.dia}
                </h2>
              </header>
              <div>
                {Array.isArray(dia.actividades) && dia.actividades.length > 0 ? dia.actividades.map((act, i) => (
                  <article key={i} style={{
                    marginBottom:'2.5rem',
                    background:'#fff',
                    borderRadius:'14px',
                    boxShadow:'0 2px 12px #2563eb11',
                    padding:'2rem 1.5rem',
                    fontSize:'1.18rem',
                    border: '1px solid #e0e7ff'
                  }}>
                    <div style={{display:'flex', alignItems:'center', gap:'1.2rem', marginBottom:'1rem'}}>
                      <span style={{fontSize:'2rem', color:'#2563eb'}}>📍</span>
                      <strong style={{color:'#2563eb', fontSize:'1.45rem'}}>{act.actividad}</strong>
                      <span style={{color:'#475569', fontWeight:'bold'}}>en</span>
                      <strong style={{color:'#22c55e', fontSize:'1.25rem'}}>{act.lugar}</strong>
                    </div>
                    <div style={{marginBottom:'1rem', color:'#475569', fontSize:'1.15rem', lineHeight:'1.7'}}>{act.descripcion}</div>
                    <div style={{display:'flex', flexWrap:'wrap', gap:'2.2rem', marginBottom:'1rem'}}>
                      <span style={{color:'#2563eb', fontWeight:'bold', fontSize:'1.1rem'}}>⏱️ {act.tiempo_estimado} min</span>
                      <span style={{color:'#64748b', fontSize:'1.1rem'}}>🚗 {act.distancia} km</span>
                      <span style={{color:'#a21caf', fontSize:'1.1rem'}}>🛣️ {act.transporte}</span>
                    </div>
                    <div style={{color:'#f59e42', fontWeight:'bold', marginBottom:'1rem', fontSize:'1.1rem'}}>
                      🍽️ Restaurante cercano: <span style={{fontWeight:'normal'}}>{act.restaurante_cercano}</span>
                    </div>
                    {act.mapa ? (
                      <div style={{marginTop:'1rem'}}>
                        <a
                          href={act.mapa}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-block',
                            color: '#3182ce',
                            fontWeight: 'bold',
                            textDecoration: 'underline',
                            fontSize: '1.15rem',
                            padding: '0.5rem 1rem',
                            background: '#e0f2fe',
                            borderRadius: '8px'
                          }}
                        >
                          📍 Ver ubicación en Google Maps
                        </a>
                      </div>
                    ) : (
                      <div style={{marginTop:'1rem', color:'#64748b', fontSize:'1rem'}}>
                        <span>Sin link de Google Maps disponible.</span>
                      </div>
                    )}
                  </article>
                )) : (
                  <div style={{color:'#e11d48', fontSize:'1.15rem', marginBottom:'2rem'}}>No hay actividades para este día.</div>
                )}
              </div>
              {dia.recomendacion && (
                <footer style={{
                  color:'#2563eb',
                  fontStyle:'italic',
                  marginTop:'1.2rem',
                  background:'#e0f7fa',
                  borderRadius:'10px',
                  padding:'1rem 1.5rem',
                  fontSize:'1.15rem',
                  border: '1px solid #e0e7ff'
                }}>
                  💡 {dia.recomendacion}
                </footer>
              )}
            </section>
          ))
        ) : (
          <div style={{background:'#fff', padding:'1.5rem', borderRadius:'14px', color:'#222', fontSize:'1.15rem'}}>
            <pre style={{whiteSpace:'pre-wrap', wordBreak:'break-word'}}>{JSON.stringify(itinerarioSeleccionado, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: 700,
      margin: '3rem auto',
      padding: '2.5rem 1.5rem',
      background: '#f8fafc',
      borderRadius: '18px',
      boxShadow: '0 4px 16px #2563eb22',
      fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif"
    }}>
      <h1 style={{color:'#2563eb', fontSize:'2.2rem', marginBottom:'2rem', textAlign:'center'}}>Tus rutas favoritas</h1>
      {favoritos.length === 0 ? (
        <div style={{textAlign:'center', color:'#64748b', fontSize:'1.15rem'}}>No tienes rutas guardadas como favoritas.</div>
      ) : (
        <ul style={{listStyle:'none', padding:0, margin:0}}>
          {favoritos.map((fav, idx) => (
            <li key={idx} style={{
              background:'#fff',
              borderRadius:'12px',
              boxShadow:'0 2px 12px #2563eb11',
              marginBottom:'1.5rem',
              padding:'1.5rem 1.2rem',
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between',
              cursor:'pointer',
              border: '1px solid #e0e7ff'
            }}
            onClick={() => setItinerarioSeleccionado(fav.itinerario)}
            >
              <span style={{fontWeight:'bold', color:'#2563eb', fontSize:'1.15rem'}}>
                Ruta {idx + 1} guardada
              </span>
              <span style={{fontSize:'1.7rem', color:'#eab308', marginLeft:'1rem'}}>★</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
