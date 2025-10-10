import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function calcularProgreso(itinerario, checklist) {
  let total = 0, done = 0;
  if (Array.isArray(itinerario)) {
    itinerario.forEach((dia, diaIdx) => {
      if (Array.isArray(dia.actividades)) {
        dia.actividades.forEach((_, actIdx) => {
          total += 1;
          if (checklist && checklist[`${diaIdx}-${actIdx}`]) done += 1;
        });
      }
    });
  }
  return total > 0 ? Math.round((done / total) * 100) : 0;
}

export default function RutaEnCursoBanner() {
  const [enCurso, setEnCurso] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const router = useRouter();

  useEffect(() => {
    function checkRuta() {
      const enCurso = localStorage.getItem('ruta_en_curso') === 'true';
      setEnCurso(enCurso);
      if (enCurso) {
        try {
          const itin = JSON.parse(localStorage.getItem('itinerario_final') || '[]');
          const checklist = JSON.parse(localStorage.getItem('checklist_ruta') || '{}');
          setProgreso(calcularProgreso(itin, checklist));
        } catch {
          setProgreso(0);
        }
      }
    }
    checkRuta();
    const interval = setInterval(checkRuta, 1000);
    window.addEventListener('storage', checkRuta);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', checkRuta);
    };
  }, []);

  if (!enCurso) return null;

  return (
    <div
      onClick={() => router.push('/viaje-en-curso')}
      style={{
        position: 'fixed',
        top: 80, // Más abajo para no tapar la barra
        right: 32,
        background: 'linear-gradient(90deg,#22c55e 0%,#2563eb 100%)',
        color: '#fff',
        padding: '1.1rem 2.3rem',
        borderRadius: '16px',
        fontWeight: 'bold',
        fontSize: '1.13rem',
        boxShadow: '0 4px 24px #2563eb33',
        zIndex: 9999,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        animation: 'banner-pop 0.7s cubic-bezier(.4,2,.6,1)',
        minWidth: 320,
        flexDirection: 'column'
      }}
      title="Ir a tu ruta en curso"
    >
      <div style={{display:'flex', alignItems:'center', gap:'1rem', width:'100%'}}>
        <span style={{
          fontSize: '1.7rem',
          animation: 'banner-bounce 1.2s infinite'
        }}>🧭</span>
        <span>
          <span style={{color:'#fbbf24'}}>¡Tienes una ruta en curso!</span> <br />
          <span style={{fontWeight:400, fontSize:'1rem'}}>Haz click aquí para continuar tu viaje</span>
        </span>
      </div>
      {/* Barra de progreso */}
      <div style={{
        width: '100%',
        marginTop: '0.7rem',
        marginBottom: '-0.3rem'
      }}>
        <div style={{
          width: '100%',
          background: '#e0e7ff',
          borderRadius: '8px',
          height: '14px',
          boxShadow: '0 1px 4px #2563eb11',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            width: `${progreso}%`,
            background: progreso === 100
              ? 'linear-gradient(90deg,#fbbf24 0%,#22c55e 100%)'
              : 'linear-gradient(90deg,#22c55e 0%,#2563eb 100%)',
            height: '100%',
            borderRadius: '8px',
            transition: 'width 0.6s cubic-bezier(.4,2,.6,1), background 0.4s'
          }} />
          <span style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            transform: 'translateX(-50%)',
            color: progreso === 100 ? '#fbbf24' : '#2563eb',
            fontWeight: 'bold',
            fontSize: '0.95rem',
            lineHeight: '14px',
            letterSpacing: '1px',
            textShadow: progreso === 100 ? '0 2px 8px #fbbf24aa' : 'none',
            transition: 'color 0.4s'
          }}>
            {progreso}% completado
          </span>
        </div>
      </div>
      <style>{`
        @keyframes banner-pop {
          0% { transform: scale(0.7) translateY(-30px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes banner-bounce {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-7px);}
        }
      `}</style>
    </div>
  );
}
