'use client';


import { useState, useEffect } from 'react';

export default function Reseñas() {
  const [reseñas, setReseñas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [lugar, setLugar] = useState('');
  const [comentario, setComentario] = useState('');
  const [calificacion, setCalificacion] = useState(5);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => setReseñas(data));
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

      <form onSubmit={handleSubmit} style={styles.infoBox}>
        <h2 style={styles.subTitle}>Deja tu reseña</h2>
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          style={{...styles.input, marginBottom: '1rem'}}
          required
        />
        <input
          type="text"
          placeholder="Lugar que visitaste"
          value={lugar}
          onChange={e => setLugar(e.target.value)}
          style={{...styles.input, marginBottom: '1rem'}}
          required
        />
        <textarea
          placeholder="Tu opinión sobre el destino"
          value={comentario}
          onChange={e => setComentario(e.target.value)}
          style={{...styles.input, height: '80px', marginBottom: '1rem'}}
          required
        />
        <div style={{marginBottom: '1rem'}}>
          <label>Calificación: </label>
          <select value={calificacion} onChange={e => setCalificacion(Number(e.target.value))} style={styles.input}>
            {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} estrellas</option>)}
          </select>
        </div>
        <button type="submit" style={styles.button} disabled={loading}>{loading ? 'Enviando...' : 'Enviar reseña'}</button>
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
