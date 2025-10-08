'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const actividades = [
  { nombre: 'Lagos', icon: '🌊' },
  { nombre: 'Senderismo', icon: '🥾' },
  { nombre: 'Artesanías', icon: '🧵' },
  { nombre: 'Gastronomía', icon: '🍲' },
  { nombre: 'Cultura', icon: '🏛️' },
  { nombre: 'Aventura', icon: '🚣' },
  { nombre: 'Fotografía', icon: '📸' },
  { nombre: 'Kayak', icon: '🛶' },
  { nombre: 'Ciclismo', icon: '🚴' },
  { nombre: 'Pesca', icon: '🎣' },
  { nombre: 'Avistamiento de aves', icon: '🦜' },
  { nombre: 'Museos', icon: '🏺' },
  { nombre: 'Mercados', icon: '🛒' },
  { nombre: 'Pueblos indígenas', icon: '🧑‍🌾' },
  { nombre: 'Relax', icon: '🧘' },
  { nombre: 'Café', icon: '☕' },
  { nombre: 'Miradores', icon: '🔭' },
  { nombre: 'Historia', icon: '📚' },
  { nombre: 'Parques', icon: '🏞️' },
  { nombre: 'Navegación', icon: '⛵' }
];

export default function CrearRuta() {
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [dias, setDias] = useState(0); // inicia en 0
  const [itinerario, setItinerario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmRegenerar, setShowConfirmRegenerar] = useState(false);
  const router = useRouter();

  const toggleActividad = (nombre) => {
    setSeleccionadas(prev =>
      prev.includes(nombre)
        ? prev.filter(a => a !== nombre)
        : [...prev, nombre]
    );
  };

  const handleSiguiente = async () => {
    setLoading(true);
    const payload = { actividades: seleccionadas, dias };
    const res = await fetch('/api/ruta-llm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    // Debug: muestra la respuesta completa en consola para depuración
    console.log('Respuesta LLM:', data);
    // Si el itinerario está vacío pero hay texto crudo, muestra el texto crudo para depuración
    if (Array.isArray(data.itinerario) && data.itinerario.length === 0 && data.raw) {
      setItinerario(data.raw);
    } else if (Array.isArray(data.itinerario) && data.itinerario.length > 0) {
      setItinerario(data.itinerario);
    } else if (Array.isArray(data.itinerario)) {
      // Muestra el contenido crudo si los días están vacíos
      setItinerario(data.raw || []);
    } else {
      setItinerario([]);
    }
    setLoading(false);
  };

  // Nuevo: para guardar el itinerario y navegar a la página de itinerario final
  const handleAceptarRuta = () => {
    // Guarda el itinerario en localStorage para pasarlo a la otra página
    localStorage.setItem('itinerario_final', JSON.stringify(itinerario));
    // Guarda el usuario actual (si tienes lógica de usuario, aquí puedes obtenerlo)
    const match = document.cookie.match(/session=([^;]+)/);
    let usuario = 'Usuario';
    if (match) {
      try {
        const session = JSON.parse(decodeURIComponent(match[1]));
        usuario = session.nombre || 'Usuario';
      } catch {}
    }
    localStorage.setItem('usuario_nombre', usuario);
    // Redirige a la página final
    router.push('/rutas/itinerario-final');
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
          {[
  '/mirador-atitlan.jpg',
  '/cerro.jpg',
  '/azul.jpg',
  '/lacustre.jpg',
  '/mapa.jpg',
  '/nahuala.jpg',
].map((img, idx) => (
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
      background: '#fff',
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
      <h2 style={{
        fontSize: '2rem',
        color: '#2563eb',
        fontWeight: 'bold',
        marginBottom: '2rem'
      }}>
        ¿Cuáles son tus actividades favoritas?
      </h2>
      <div style={{
        maxWidth: 540,
        margin: '0 auto 1.5rem auto',
        color: '#1e293b',
        fontSize: '1.13rem',
        background: 'linear-gradient(90deg,#e0e7ff 60%,#f0fdfa 100%)',
        borderRadius: '14px',
        padding: '1.3rem 1.4rem',
        boxShadow: '0 2px 12px #2563eb18',
        textAlign: 'center',
        fontWeight: 500,
        border: '1.5px solid #22c55e'
      }}>
        <span>
          <span style={{fontWeight:'bold', color:'#2563eb', fontSize:'1.15rem'}}>Instrucciones:</span><br />
          <span style={{color:'#334155'}}>
            Selecciona tus <b style={{color:'#22c55e'}}>actividades favoritas</b> y te generaremos una <b style={{color:'#22c55e'}}>ruta inteligente y personalizada</b> en Sololá.<br />
            <span style={{display:'inline-block', marginTop:'0.6rem', color:'#f59e42', fontWeight:'bold'}}>
              🛈 Recomendación: <span style={{fontWeight:'normal', color:'#b45309'}}>Mientras más actividades selecciones, más completo y variado será tu itinerario.</span>
            </span>
          </span>
        </span>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
        gap: '1.5rem',
        justifyContent: 'center',
        marginBottom: '2.5rem',
        padding: '0.5rem 0.5rem'
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
              border: seleccionadas.includes(act.nombre) ? '2px solid #22c55e' : '2px solid #e0e7ff',
              borderRadius: '16px',
              padding: '1.5rem 0.5rem',
              fontSize: '1.15rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: seleccionadas.includes(act.nombre)
                ? '0 2px 16px #2563eb33'
                : '0 2px 8px #2563eb11',
              transition: 'background 0.2s, border 0.2s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minHeight: '110px'
            }}
          >
            <span style={{fontSize:'2.2rem', marginBottom:'0.7rem'}}>{act.icon}</span>
            <span>{act.nombre}</span>
          </button>
        ))}
      </div>
      <div style={{
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem'
      }}>
        <label htmlFor="dias" style={{
          fontWeight:'bold',
          color:'#2563eb',
          fontSize:'1.15rem',
          marginRight: '1rem'
        }}>
          ¿Cuántos días vas?
        </label>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: '#e0e7ff',
          borderRadius: '14px',
          padding: '0.7rem 1.5rem',
          boxShadow: '0 2px 12px #2563eb22'
        }}>
          <button
            onClick={() => setDias(d => Math.max(0, d - 1))}
            style={{
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '2.5rem',
              height: '2.5rem',
              fontSize: '1.5rem',
              cursor: dias === 0 ? 'not-allowed' : 'pointer',
              opacity: dias === 0 ? 0.5 : 1,
              transition: 'background 0.2s'
            }}
            disabled={dias === 0}
            aria-label="Restar día"
          >&#8592;</button>
          <span style={{
            fontSize: '1.7rem',
            fontWeight: 'bold',
            color: '#2563eb',
            minWidth: '2.5rem',
            textAlign: 'center'
          }}>{dias}</span>
          <button
            onClick={() => setDias(d => Math.min(20, d + 1))}
            style={{
              background: '#22c55e',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '2.5rem',
              height: '2.5rem',
              fontSize: '1.5rem',
              cursor: dias === 20 ? 'not-allowed' : 'pointer',
              opacity: dias === 20 ? 0.5 : 1,
              transition: 'background 0.2s'
            }}
            disabled={dias === 20}
            aria-label="Sumar día"
          >&#8594;</button>
        </div>
      </div>
      <button
        onClick={handleSiguiente}
        disabled={seleccionadas.length < 3 || dias === 0 || loading}
        style={{
          background: 'linear-gradient(90deg,#22c55e 0%,#2563eb 100%)',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          border: 'none',
          borderRadius: '10px',
          padding: '0.8rem 2.2rem',
          cursor: seleccionadas.length < 3 || dias === 0 || loading ? 'not-allowed' : 'pointer',
          boxShadow: '0 2px 12px #2563eb22',
          transition: 'background 0.2s'
        }}
      >
        {loading ? (
          <span>
            <span style={{fontSize:'1.5rem', marginRight:'0.7rem'}}>🧭</span>
            Generando tu itinerario inteligente en Sololá...
          </span>
        ) : (
          'Crear ruta inteligente'
        )}
      </button>
      {loading && (
        <div style={{
          marginTop:'2rem',
          color:'#2563eb',
          fontWeight:'bold',
          fontSize:'1.25rem',
          textAlign:'center',
          display:'flex',
          flexDirection:'column',
          alignItems:'center'
        }}>
          <span style={{
            fontSize:'2.8rem',
            marginBottom:'0.7rem',
            animation: 'spin 1.2s linear infinite',
            display: 'inline-block'
          }}>
            <svg width="48" height="48" viewBox="0 0 48 48" style={{verticalAlign:'middle'}}>
              <circle cx="24" cy="24" r="20" stroke="#2563eb" strokeWidth="5" fill="none" opacity="0.2"/>
              <path d="M44 24a20 20 0 0 1-20 20" stroke="#22c55e" strokeWidth="5" fill="none" strokeLinecap="round"/>
            </svg>
          </span>
          <span>Estamos preparando la mejor ruta para ti. ¡Un momento por favor!</span>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg);}
              100% { transform: rotate(360deg);}
            }
          `}</style>
        </div>
      )}
      {itinerario && (
        <div style={{
          marginTop: '2.5rem',
          background: 'linear-gradient(120deg,#e0e7ff 60%,#fff 100%)',
          borderRadius: '24px',
          padding: '3rem 3.5rem',
          boxShadow: '0 8px 40px rgba(52,152,219,0.15)',
          fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
          textAlign: 'left',
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <h3 style={{
            color:'#2563eb',
            fontSize:'2.5rem',
            marginBottom:'2.5rem',
            fontWeight:'900',
            letterSpacing:'1px',
            textAlign:'center',
            fontFamily: "'Poppins', sans-serif"
          }}>
            🗺️ Itinerario Formal
          </h3>
          {Array.isArray(itinerario) && itinerario.length === 0 ? (
            <p style={{fontSize:'1.3rem', color:'#e11d48', textAlign:'center'}}>No se pudo generar un itinerario. Intenta con otras actividades.</p>
          ) : Array.isArray(itinerario) ? (
            <div>
              {itinerario.map((dia, idx) => (
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
                    <h4 style={{
                      color:'#22c55e',
                      fontSize:'2rem',
                      marginBottom:'0.7rem',
                      fontWeight:'bold',
                      fontFamily: "'Poppins', sans-serif"
                    }}>
                      Día {dia.dia}
                    </h4>
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
                        fontFamily: "'Poppins', sans-serif",
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
              ))}
            </div>
          ) : (
            <div style={{background:'#fff', padding:'1.5rem', borderRadius:'14px', color:'#222', fontSize:'1.15rem'}}>
              <pre style={{whiteSpace:'pre-wrap', wordBreak:'break-word'}}>{itinerario}</pre>
            </div>
          )}
          {/* Botones de aceptar y regenerar */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginTop: '2.5rem'
          }}>
            <button
              style={{
                background: 'linear-gradient(90deg,#22c55e 0%,#2563eb 100%)',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1.15rem',
                border: 'none',
                borderRadius: '10px',
                padding: '0.8rem 2.2rem',
                cursor: 'pointer',
                boxShadow: '0 2px 12px #2563eb22',
                transition: 'background 0.2s'
              }}
              onClick={handleAceptarRuta}
            >
              ✅ Aceptar ruta
            </button>
            <button
              style={{
                background: 'linear-gradient(90deg,#e11d48 0%,#fbbf24 100%)',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1.15rem',
                border: 'none',
                borderRadius: '10px',
                padding: '0.8rem 2.2rem',
                cursor: 'pointer',
                boxShadow: '0 2px 12px #e11d4822',
                transition: 'background 0.2s'
              }}
              onClick={() => setShowConfirmRegenerar(true)}
            >
              🔄 Regenerar otra ruta
            </button>
          </div>
          {/* Modal de confirmación para regenerar */}
          {showConfirmRegenerar && (
            <div style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(30,41,59,0.25)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                background: '#fff',
                borderRadius: '18px',
                boxShadow: '0 8px 40px #2563eb33',
                padding: '2.5rem 2.2rem',
                minWidth: '320px',
                textAlign: 'center',
                border: '2px solid #22c55e'
              }}>
                <div style={{fontSize:'2.2rem', marginBottom:'1rem'}}>❓</div>
                <div style={{fontWeight:'bold', color:'#2563eb', fontSize:'1.18rem', marginBottom:'1.2rem'}}>
                  ¿Estás seguro que quieres regenerar otra ruta?
                </div>
                <div style={{display:'flex', justifyContent:'center', gap:'1.5rem'}}>
                  <button
                    style={{
                      background: 'linear-gradient(90deg,#22c55e 0%,#2563eb 100%)',
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.7rem 1.7rem',
                      cursor: 'pointer'
                    }}
                    onClick={async () => {
                      setShowConfirmRegenerar(false);
                      setLoading(true);
                      setItinerario(null);
                      await handleSiguiente();
                    }}
                  >
                    Sí, regenerar
                  </button>
                  <button
                    style={{
                      background: '#e11d48',
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.7rem 1.7rem',
                      cursor: 'pointer'
                    }}
                    onClick={() => setShowConfirmRegenerar(false)}
                  >
                    No, cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}