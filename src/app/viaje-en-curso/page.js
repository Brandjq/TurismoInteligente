'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function ViajeEnCurso() {
  const [itinerario, setItinerario] = useState([]);
  const [checklist, setChecklist] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false); // Controla si se muestra la encuesta
  const [rating, setRating] = useState(0); // Calificación de 1 a 5
  const [recommend, setRecommend] = useState(null); // Si recomendaría el sistema
  const [showThankYou, setShowThankYou] = useState(false); // Controla si se muestra el agradecimiento
  const router = useRouter();
  const confettiRef = useRef(null);

  useEffect(() => {
    const data = localStorage.getItem('itinerario_final');
    if (data) setItinerario(JSON.parse(data));
    // Marca que hay una ruta en curso
    localStorage.setItem('ruta_en_curso', 'true');
    // Cargar checklist guardado si existe
    const checklistGuardado = localStorage.getItem('checklist_ruta');
    if (checklistGuardado) {
      setChecklist(JSON.parse(checklistGuardado));
    }

    // Mostrar la encuesta después de 5 segundos en la página
    const surveyTimer = setTimeout(() => {
      setShowSurvey(true);
    }, 5000);

    return () => clearTimeout(surveyTimer);
  }, []);

  const handleSurveySubmit = () => {
    // Aquí puedes enviar los datos de la encuesta a tu backend si es necesario
    console.log('Calificación:', rating);
    console.log('¿Recomendaría el sistema?:', recommend ? 'Sí' : 'No');
    setShowSurvey(false); // Cierra el modal de encuesta
    setShowThankYou(true); // Muestra el mensaje de agradecimiento

    // Oculta el mensaje de agradecimiento después de 3 segundos
    setTimeout(() => {
      setShowThankYou(false);
    }, 3000);
  };

  const handleCheck = (diaIdx, actIdx) => {
    setChecklist(prev => {
      const updated = {
        ...prev,
        [`${diaIdx}-${actIdx}`]: !prev[`${diaIdx}-${actIdx}`]
      };
      // Guarda el checklist actualizado en localStorage para persistencia
      localStorage.setItem('checklist_ruta', JSON.stringify(updated));
      return updated;
    });
  };

  const finalizarRuta = () => {
    localStorage.removeItem('itinerario_final');
    localStorage.removeItem('ruta_en_curso');
    localStorage.removeItem('checklist_ruta'); // Limpia el checklist al finalizar
    setItinerario([]);
    setChecklist({});
    router.push('/rutas/crear');
  };

  // Calcular progreso
  let totalActividades = 0;
  let completadas = 0;
  if (Array.isArray(itinerario)) {
    itinerario.forEach((dia, diaIdx) => {
      if (Array.isArray(dia.actividades)) {
        dia.actividades.forEach((_, actIdx) => {
          totalActividades += 1;
          if (checklist[`${diaIdx}-${actIdx}`]) completadas += 1;
        });
      }
    });
  }
  const progreso = totalActividades > 0 ? Math.round((completadas / totalActividades) * 100) : 0;

  // Función para elegir emoji según el progreso
  function getProgressEmoji(p) {
    if (p === 100) return "🏆";
    if (p >= 80) return "😃";
    if (p >= 60) return "😊";
    if (p >= 40) return "🙂";
    if (p >= 20) return "🚶";
    if (p > 0) return "🌱";
    return "🗺️";
  }

  // Mostrar mensaje de éxito si completa todo y animación de confeti
  useEffect(() => {
    if (totalActividades > 0 && completadas === totalActividades) {
      setShowSuccess(true);
      // Confetti animación extra (más visible)
      if (confettiRef.current) {
        confettiRef.current.classList.add('show-confetti');
        setTimeout(() => confettiRef.current.classList.remove('show-confetti'), 4000);
      }
      // Enviar correo de agradecimiento (si hay correo guardado)
      const correo = localStorage.getItem('usuario_email');
      if (correo) {
        fetch('/api/enviar-agradecimiento', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: correo })
        }).catch(() => {});
      }
      // Redirige a la pantalla de agradecimiento después de la animación
      setTimeout(() => {
        setShowSuccess(false);
        router.push('/viaje-finalizado');
      }, 4200);
    }
  }, [completadas, totalActividades]);

  return (
    <div style={{
      maxWidth: 900,
      margin: '3rem auto',
      padding: '3rem 2.5rem',
      background: 'linear-gradient(120deg,#e0e7ff 60%,#fff 100%)',
      borderRadius: '28px',
      boxShadow: '0 8px 40px rgba(52,152,219,0.15)',
      fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
      position: 'relative'
    }}>
      {/* Confetti animation */}
      <div ref={confettiRef} className="confetti-container" />
      <style>{`
        .confetti-container {
          pointer-events: none;
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          z-index: 9999;
          display: none;
        }
        .show-confetti {
          display: block !important;
          animation: confetti-fall 4s linear;
          background-image:
            repeating-linear-gradient(120deg, #22c55e 0 10px, transparent 10px 20px),
            repeating-linear-gradient(60deg, #2563eb 0 10px, transparent 10px 20px),
            repeating-linear-gradient(90deg, #fbbf24 0 10px, transparent 10px 20px),
            repeating-linear-gradient(45deg, #e11d48 0 10px, transparent 10px 20px);
          background-size: 100vw 100vh;
          opacity: 0.85;
        }
        @keyframes confetti-fall {
          0% { opacity: 0.85; }
          100% { opacity: 0; }
        }
      `}</style>
      {/* Encuesta de satisfacción */}
      {showSurvey && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: '#fff',
            padding: '20px 30px',
            borderRadius: '10px',
            textAlign: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h2 style={{ color: '#2563eb', marginBottom: '10px' }}>Encuesta de Satisfacción</h2>
            <p style={{ marginBottom: '20px', fontSize: '1rem', color: '#555' }}>¿Qué tan satisfecho estás con la ruta?</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  onClick={() => setRating(num)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: rating === num ? '#2563eb' : '#e0e7ff',
                    color: rating === num ? '#fff' : '#2563eb',
                    border: 'none',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'background 0.3s, color 0.3s'
                  }}
                >
                  {num}
                </button>
              ))}
            </div>
            <p style={{ marginBottom: '20px', fontSize: '1rem', color: '#555' }}>¿Recomendarías este sistema de turismo?</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
              <button
                onClick={() => setRecommend(true)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  background: recommend === true ? '#22c55e' : '#e0e7ff',
                  color: recommend === true ? '#fff' : '#2563eb',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background 0.3s, color 0.3s'
                }}
              >
                Sí
              </button>
              <button
                onClick={() => setRecommend(false)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  background: recommend === false ? '#e11d48' : '#e0e7ff',
                  color: recommend === false ? '#fff' : '#2563eb',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background 0.3s, color 0.3s'
                }}
              >
                No
              </button>
            </div>
            <button
              onClick={handleSurveySubmit}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '10px'
              }}
              disabled={rating === 0 || recommend === null}
            >
              Enviar
            </button>
          </div>
        </div>
      )}
      {/* Mensaje de agradecimiento */}
      {showThankYou && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: '#22c55e',
            padding: '20px 30px',
            borderRadius: '10px',
            textAlign: 'center',
            color: '#fff',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h2 style={{ marginBottom: '10px' }}>¡Gracias por tu opinión!</h2>
            <p style={{ fontSize: '1rem' }}>Tu respuesta nos ayuda a mejorar nuestro sistema de turismo.</p>
          </div>
        </div>
      )}
      {/* Barra de progreso mejorada */}
      <div style={{
        marginBottom: '2.2rem',
        marginTop: '-1.2rem',
        position: 'relative'
      }}>
        <div style={{
          width: '100%',
          background: '#e0e7ff',
          borderRadius: '16px',
          height: '32px',
          boxShadow: '0 2px 8px #2563eb11',
          overflow: 'hidden',
          position: 'relative',
          border: '2px solid #2563eb'
        }}>
          <div style={{
            width: `${progreso}%`,
            background: progreso === 100
              ? 'linear-gradient(90deg,#fbbf24 0%,#22c55e 100%)'
              : 'linear-gradient(90deg,#22c55e 0%,#2563eb 100%)',
            height: '100%',
            borderRadius: '16px',
            transition: 'width 0.6s cubic-bezier(.4,2,.6,1), background 0.4s',
            boxShadow: progreso === 100 ? '0 0 16px #fbbf24cc' : '0 2px 8px #2563eb22'
          }} />
        </div>
        {/* Porcentaje y emoji fuera de la barra */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '1.25rem',
          letterSpacing: '1px',
          textShadow: '0 2px 8px #222, 0 1px 2px #2563eb88',
          display: 'flex',
          alignItems: 'center',
          gap: '0.7em',
          pointerEvents: 'none'
        }}>
          {progreso}% completado
          <span style={{fontSize:'1.4em', marginLeft:'0.5em'}}>{getProgressEmoji(progreso)}</span>
        </div>
      </div>
      {/* Mensaje de éxito */}
      {showSuccess && (
        <div style={{
          margin: '2rem auto 1.5rem auto',
          maxWidth: 600,
          background: 'linear-gradient(120deg,#fbbf24 0%,#22c55e 100%)',
          color: '#fff',
          borderRadius: '28px',
          padding: '3rem 2.5rem',
          fontWeight: 'bold',
          fontSize: '2rem',
          textAlign: 'center',
          boxShadow: '0 8px 40px #22c55e33',
          letterSpacing: '1px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          position: 'relative',
          zIndex: 10000
        }}>
          <img src="/logo.jpg" alt="Itour Sololá" style={{
            width: '180px',
            marginBottom: '1.2rem',
            borderRadius: '18px',
            boxShadow: '0 2px 12px #2563eb22'
          }} />
          <span style={{fontSize:'2.7rem'}}>🎉🎊</span>
          <div>
            <div>¡Felicidades! Has completado todas las actividades de tu viaje.</div>
            <div style={{fontSize:'1.25rem', fontWeight:400, marginTop:'1.2rem'}}>
              Gracias por usar <span style={{color:'#2563eb'}}>Itour Sololá</span>.<br />
              Te hemos enviado un mensaje de agradecimiento a tu correo.<br />
              ¡Sigue explorando y generando nuevas rutas!
            </div>
          </div>
          <style>{`
            .show-confetti {
              display: block !important;
              animation: confetti-fall 4s linear;
              background-image:
                repeating-linear-gradient(120deg, #22c55e 0 10px, transparent 10px 20px),
                repeating-linear-gradient(60deg, #2563eb 0 10px, transparent 10px 20px),
                repeating-linear-gradient(90deg, #fbbf24 0 10px, transparent 10px 20px),
                repeating-linear-gradient(45deg, #e11d48 0 10px, transparent 10px 20px);
              background-size: 100vw 100vh;
              opacity: 0.85;
            }
            @keyframes confetti-fall {
              0% { opacity: 0.85; }
              100% { opacity: 0; }
            }
          `}</style>
        </div>
      )}
      <div style={{textAlign:'center', marginBottom:'2.5rem'}}>
        <h2 style={{color:'#22c55e', fontSize:'2.2rem', marginBottom:'1.2rem'}}>¡Gracias por usar Itour Sololá!</h2>
        <p style={{fontSize:'1.25rem', color:'#2563eb', marginBottom:'1.5rem'}}>Disfruta tu viaje y marca los lugares que vayas visitando.</p>
      </div>
      {/* Recordatorio de dejar reseña */}
      <div style={{
        maxWidth: 600,
        margin: '0 auto 2.5rem auto',
        background: 'linear-gradient(90deg,#fef9c3 60%,#e0e7ff 100%)',
        borderRadius: '16px',
        padding: '1.7rem 2rem',
        boxShadow: '0 2px 12px #fbbf2433',
        textAlign: 'center',
        color: '#b45309',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.2rem'
      }}>
        <span style={{fontSize:'2rem'}}>⭐</span>
        <div style={{fontSize:'1.15rem', fontWeight:500}}>
          ¿Ya terminaste alguna actividad o visitaste un lugar?<br />
          <span style={{color:'#2563eb'}}>¡Déjanos tu reseña y comentario sobre cada experiencia!</span>
        </div>
        <button
          onClick={() => router.push('/contacto')}
          style={{
            background: 'linear-gradient(90deg,#22c55e 0%,#2563eb 100%)',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            border: 'none',
            borderRadius: '10px',
            padding: '0.9rem 2.2rem',
            cursor: 'pointer',
            boxShadow: '0 2px 12px #2563eb33'
          }}
        >
          Dejar mi reseña
        </button>
      </div>
      <div>
        {Array.isArray(itinerario) ? (
          itinerario.map((dia, diaIdx) => (
            <section key={diaIdx} style={{
              marginBottom: '2.5rem',
              padding: '2rem 1.5rem',
              background: '#fff',
              borderRadius: '16px',
              boxShadow: '0 2px 12px #2563eb11',
              border: '1px solid #e0e7ff'
            }}>
              <h3 style={{color:'#22c55e', fontSize:'1.5rem', marginBottom:'1rem'}}>Día {dia.dia}</h3>
              {Array.isArray(dia.actividades) && dia.actividades.length > 0 ? (
                dia.actividades.map((act, actIdx) => {
                  const checked = !!checklist[`${diaIdx}-${actIdx}`];
                  return (
                    <div key={actIdx} style={{
                      display:'flex',
                      alignItems:'center',
                      gap:'1.2rem',
                      marginBottom:'1.2rem',
                      background: checked ? 'linear-gradient(90deg,#bbf7d0 60%,#e0e7ff 100%)' : '#f8fafc',
                      borderRadius:'12px',
                      padding:'1.1rem 1.5rem',
                      boxShadow: checked ? '0 2px 12px #22c55e33' : '0 2px 8px #2563eb11',
                      border: checked ? '2px solid #22c55e' : '1px solid #e0e7ff',
                      transition: 'background 0.3s, border 0.3s, box-shadow 0.3s'
                    }}>
                      <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        cursor: 'pointer',
                        width: '100%'
                      }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '2.1em',
                          height: '2.1em',
                          borderRadius: '50%',
                          border: checked ? '2.5px solid #22c55e' : '2.5px solid #2563eb',
                          background: checked ? '#22c55e' : '#fff',
                          transition: 'background 0.3s, border 0.3s',
                          marginRight: '0.7em',
                          boxShadow: checked ? '0 0 0 4px #bbf7d055' : 'none'
                        }}>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleCheck(diaIdx, actIdx)}
                            style={{
                              width: '1.5em',
                              height: '1.5em',
                              accentColor: checked ? '#22c55e' : '#2563eb',
                              cursor: 'pointer',
                              opacity: 0,
                              position: 'absolute'
                            }}
                          />
                          {checked ? (
                            <svg width="22" height="22" viewBox="0 0 22 22" style={{display:'block'}}>
                              <circle cx="11" cy="11" r="10" fill="#22c55e" />
                              <polyline points="6,12 10,16 16,8" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ) : (
                            <svg width="22" height="22" viewBox="0 0 22 22" style={{display:'block'}}>
                              <circle cx="11" cy="11" r="10" fill="#fff" stroke="#2563eb" strokeWidth="2"/>
                            </svg>
                          )}
                        </span>
                        <span style={{
                          fontSize:'1.18rem',
                          color: checked ? '#22c55e' : '#2563eb',
                          textDecoration: checked ? 'line-through' : 'none',
                          fontWeight:'bold',
                          letterSpacing: '0.5px',
                          transition: 'color 0.3s, text-decoration 0.3s'
                        }}>
                          {act.actividad} <span style={{color:'#475569', fontWeight:400}}>en</span> <span style={{color:'#22c55e', fontWeight:600}}>{act.lugar}</span>
                        </span>
                      </label>
                    </div>
                  );
                })
              ) : (
                <div style={{color:'#e11d48', fontSize:'1.1rem'}}>No hay actividades para este día.</div>
              )}
            </section>
          ))
        ) : (
          <div style={{background:'#fff', padding:'1.5rem', borderRadius:'14px', color:'#222', fontSize:'1.15rem'}}>
            <pre style={{whiteSpace:'pre-wrap', wordBreak:'break-word'}}>{JSON.stringify(itinerario, null, 2)}</pre>
          </div>
        )}
      </div>
      <div style={{textAlign:'center', marginTop:'2.5rem'}}>
        <button
          onClick={() => router.push('/')}
          style={{
            background: '#2563eb',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.15rem',
            border: 'none',
            borderRadius: '10px',
            padding: '1rem 2.2rem',
            cursor: 'pointer',
            boxShadow: '0 2px 12px #2563eb33',
            marginRight: '1rem'
          }}
        >
          Volver al inicio
        </button>
        <button
          onClick={finalizarRuta}
          style={{
            background: '#e11d48',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.15rem',
            border: 'none',
            borderRadius: '10px',
            padding: '1rem 2.2rem',
            cursor: 'pointer',
            boxShadow: '0 2px 12px #e11d4833'
          }}
        >
          Finalizar ruta
        </button>
      </div>
    </div>
  );
}
