'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ViajeEnCurso() {
  const [itinerario, setItinerario] = useState([]);
  const [checklist, setChecklist] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem('itinerario_final');
    if (data) setItinerario(JSON.parse(data));
  }, []);

  const handleCheck = (diaIdx, actIdx) => {
    setChecklist(prev => ({
      ...prev,
      [`${diaIdx}-${actIdx}`]: !prev[`${diaIdx}-${actIdx}`]
    }));
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

  // Mostrar mensaje de éxito si completa todo
  useEffect(() => {
    if (totalActividades > 0 && completadas === totalActividades) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
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
      fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif"
    }}>
      {/* Barra de progreso */}
      <div style={{
        marginBottom: '2.2rem',
        marginTop: '-1.2rem'
      }}>
        <div style={{
          width: '100%',
          background: '#e0e7ff',
          borderRadius: '12px',
          height: '22px',
          boxShadow: '0 2px 8px #2563eb11',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            width: `${progreso}%`,
            background: 'linear-gradient(90deg,#22c55e 0%,#2563eb 100%)',
            height: '100%',
            borderRadius: '12px',
            transition: 'width 0.4s'
          }} />
          <span style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            transform: 'translateX(-50%)',
            color: '#2563eb',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            lineHeight: '22px'
          }}>
            {progreso}% completado
          </span>
        </div>
      </div>
      {/* Mensaje de éxito */}
      {showSuccess && (
        <div style={{
          margin: '2rem auto 1.5rem auto',
          maxWidth: 500,
          background: 'linear-gradient(90deg,#22c55e 0%,#2563eb 100%)',
          color: '#fff',
          borderRadius: '18px',
          padding: '2rem 2rem',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          textAlign: 'center',
          boxShadow: '0 2px 16px #22c55e33',
          letterSpacing: '1px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <span style={{fontSize:'2.5rem'}}>🎉</span>
          ¡Felicidades! Has completado todas las actividades de tu viaje.<br />
          <span style={{fontSize:'1.1rem', fontWeight:400}}>Gracias por usar <span style={{color:'#fbbf24'}}>Itour Sololá</span>. ¡Esperamos que hayas disfrutado tu experiencia!</span>
        </div>
      )}
      <div style={{textAlign:'center', marginBottom:'2.5rem'}}>
        <h2 style={{color:'#22c55e', fontSize:'2.2rem', marginBottom:'1.2rem'}}>¡Gracias por usar Itour Sololá!</h2>
        <p style={{fontSize:'1.25rem', color:'#2563eb', marginBottom:'1.5rem'}}>Disfruta tu viaje y marca los lugares que vayas visitando.</p>
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
                dia.actividades.map((act, actIdx) => (
                  <div key={actIdx} style={{
                    display:'flex',
                    alignItems:'center',
                    gap:'1rem',
                    marginBottom:'1.2rem',
                    background:'#f8fafc',
                    borderRadius:'10px',
                    padding:'1rem 1.2rem'
                  }}>
                    <input
                      type="checkbox"
                      checked={!!checklist[`${diaIdx}-${actIdx}`]}
                      onChange={() => handleCheck(diaIdx, actIdx)}
                      style={{width:'1.3em', height:'1.3em'}}
                    />
                    <span style={{
                      fontSize:'1.15rem',
                      color: checklist[`${diaIdx}-${actIdx}`] ? '#22c55e' : '#2563eb',
                      textDecoration: checklist[`${diaIdx}-${actIdx}`] ? 'line-through' : 'none',
                      fontWeight:'bold'
                    }}>
                      {act.actividad} en {act.lugar}
                    </span>
                  </div>
                ))
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
            boxShadow: '0 2px 12px #2563eb33'
          }}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
