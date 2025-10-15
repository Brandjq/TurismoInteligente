'use client';


import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Reseñas() {
  const [reseñas, setReseñas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [lugar, setLugar] = useState('');
  const [comentario, setComentario] = useState('');
  const [calificacion, setCalificacion] = useState(5);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => setReseñas(data));

    const match = document.cookie.match(/session=([^;]+)/);
    if (match) {
      try {
        const session = JSON.parse(decodeURIComponent(match[1]));
        setIsAdmin(session.isAdmin === true);
      } catch {}
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !lugar || !comentario) return;
    setLoading(true);
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, lugar, comentario, calificacion })
    });
    if (res.ok) {
      const nuevaReseña = await res.json();
      setReseñas([nuevaReseña, ...reseñas]);
      setNombre('');
      setLugar('');
      setComentario('');
      setCalificacion(5);
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2500);
    }
    setLoading(false);
  };

  const promedio = reseñas.length ? (reseñas.reduce((acc, r) => acc + r.calificacion, 0) / reseñas.length).toFixed(1) : null;

  return (
    <div style={styles.container}>
      {isAdmin && (
        <button
          style={{ 
            backgroundColor: '#22c55e', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '6px', 
            padding: '0.75rem 1.5rem', 
            fontSize: '1rem', 
            fontWeight: '700', 
            cursor: 'pointer', 
            marginBottom: '1.5rem',
            transition: 'background 0.2s'
          }}
          onClick={() => router.push('/reviews/stats')}
        >
          Reporte
        </button>
      )}
      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <span style={{fontSize:'2rem', color:'#22c55e'}}>✔</span>
            <h3 style={{margin:'0.5rem 0', color:'#2563eb'}}>¡Gracias por tu comentario!</h3>
            <p style={{color:'#475569'}}>Tu reseña fue guardada con éxito.</p>
          </div>
        </div>
      )}
      <h1 style={styles.title}>Reseñas y Calificaciones</h1>
      <p style={styles.description}>
        Comparte tu opinión y ayuda a otros viajeros a tomar mejores decisiones sobre los destinos turísticos.
      </p>

      <form onSubmit={handleSubmit} style={{
        ...styles.infoBox,
        background: 'linear-gradient(120deg,#e0e7ff 60%,#f0fdfa 100%)',
        boxShadow: '0 4px 24px #2563eb22',
        border: '2px solid #22c55e',
        marginBottom: '2.5rem',
        padding: '2.2rem 2.5rem',
        borderRadius: '18px',
        maxWidth: 520,
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <h2 style={{
          ...styles.subTitle,
          color: '#2563eb',
          fontWeight: 700,
          marginBottom: '1.5rem',
          letterSpacing: '0.5px'
        }}>
          <span style={{fontSize:'2.1rem', marginRight:'0.7rem'}}>📝</span>
          Deja tu reseña
        </h2>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem'
        }}>
          <input
            type="text"
            placeholder="Tu nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            style={{
              ...styles.input,
              background: '#fff',
              border: '1.5px solid #2563eb33',
              fontWeight: 500,
              fontSize: '1.08rem',
              boxShadow: '0 2px 8px #2563eb11'
            }}
            required
          />
          <input
            type="text"
            placeholder="Lugar que visitaste"
            value={lugar}
            onChange={e => setLugar(e.target.value)}
            style={{
              ...styles.input,
              background: '#fff',
              border: '1.5px solid #2563eb33',
              fontWeight: 500,
              fontSize: '1.08rem',
              boxShadow: '0 2px 8px #2563eb11'
            }}
            required
          />
          <textarea
            placeholder="Tu opinión sobre el destino"
            value={comentario}
            onChange={e => setComentario(e.target.value)}
            style={{
              ...styles.input,
              height: '90px',
              background: '#fff',
              border: '1.5px solid #2563eb33',
              fontWeight: 500,
              fontSize: '1.08rem',
              boxShadow: '0 2px 8px #2563eb11',
              resize: 'vertical'
            }}
            required
          />
          <div style={{
            marginBottom: '0.5rem',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.1rem'
          }}>
            <label style={{
              fontWeight: 600,
              color: '#2563eb',
              fontSize: '1.13rem',
              marginBottom: 0
            }}>Calificación:</label>
            <span>
              {[1,2,3,4,5].map(n => (
                <span
                  key={n}
                  onClick={() => setCalificacion(n)}
                  style={{
                    cursor: 'pointer',
                    fontSize: '2.2rem',
                    color: n <= calificacion ? '#f59e42' : '#cbd5e1',
                    marginRight: n < 5 ? '0.12em' : 0,
                    transition: 'color 0.18s, transform 0.18s',
                    filter: n <= calificacion ? 'drop-shadow(0 2px 6px #fbbf2444)' : 'none',
                    userSelect: 'none',
                    transform: n === calificacion ? 'scale(1.18)' : 'scale(1)'
                  }}
                  title={`${n} estrella${n > 1 ? 's' : ''}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') setCalificacion(n);
                  }}
                  aria-label={`${n} estrella${n > 1 ? 's' : ''}`}
                >★</span>
              ))}
            </span>
          </div>
          <button
            type="submit"
            style={{
              background: 'linear-gradient(90deg,#22c55e 0%,#2563eb 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              padding: '0.9rem 2.2rem',
              fontWeight: 'bold',
              fontSize: '1.18rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 12px #2563eb22',
              marginTop: '0.7rem',
              transition: 'background 0.2s'
            }}
            disabled={loading}
          >
            {loading ? (
              <span>
                <span style={{fontSize:'1.5rem', marginRight:'0.7rem'}}>⏳</span>
                Enviando...
              </span>
            ) : (
              <span>
                <span style={{fontSize:'1.5rem', marginRight:'0.7rem'}}>✈️</span>
                Enviar reseña
              </span>
            )}
          </button>
        </div>
      </form>

      {promedio && (
        <div style={{...styles.infoBox, marginTop: '2rem'}}>
          <strong>Promedio de calificaciones:</strong> {promedio} / 5
        </div>
      )}

      <div style={{marginTop: '2rem'}}>
        <h2 style={styles.subTitle}>Opiniones de visitantes</h2>
        {reseñas.length === 0 ? (
          <p style={styles.text}>Sé el primero en dejar una reseña.</p>
        ) : (
          reseñas.map((r, i) => (
            <div key={r.id || i} style={{...styles.infoBox, marginBottom: '1rem', textAlign: 'left'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div>
                  <strong>{r.nombre}</strong> <span style={{color:'#475569'}}>visitó <b>{r.lugar}</b></span>
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                  {Array.from({length:5}).map((_, idx) => (
                    <span key={idx} style={{color: idx < r.calificacion ? '#f59e42' : '#cbd5e1', fontSize:'1.3rem', marginRight:'2px'}}>★</span>
                  ))}
                  <span style={{marginLeft:'8px', color:'#64748b', fontSize:'0.95rem'}}>{new Date(r.fecha).toLocaleDateString()}</span>
                </div>
              </div>
              <p style={{marginTop:'0.5rem'}}>{r.comentario}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '3rem auto',
    padding: '1rem 2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#222',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    userSelect: 'none',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '0.5rem',
    textAlign: 'center',
    color: '#1e40af',
  },
  description: {
    fontSize: '1.25rem',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#334155',
  },
  infoBox: {
    backgroundColor: '#e0e7ff',
    padding: '1rem 2rem',
    borderRadius: '8px',
    fontSize: '1.1rem',
    marginBottom: '2rem',
    textAlign: 'center',
    color: '#1e3a8a',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: '600',
  },
  subTitle: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#1e40af',
    textAlign: 'center',
  },
  text: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    textAlign: 'center',
    color: '#475569',
    marginBottom: '2rem',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '1rem',
    marginBottom: '0.5rem',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '0.5rem',
    transition: 'background 0.2s',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    animation: 'fadeIn 0.3s',
  },
  modalContent: {
    background: '#fff',
    borderRadius: '12px',
    padding: '2rem 2.5rem',
    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
    textAlign: 'center',
    minWidth: '280px',
    animation: 'popIn 0.3s',
  },
};
