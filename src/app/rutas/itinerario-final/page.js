'use client';
import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/navigation';

export default function ItinerarioFinal() {
  const [itinerario, setItinerario] = useState(null);
  const [usuario, setUsuario] = useState('Usuario');
  const [esFavorito, setEsFavorito] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [correoUsuario, setCorreoUsuario] = useState('');
  const router = useRouter();

  // Cargar estado de favorito desde localStorage
  useEffect(() => {
    // Solo ejecutar en cliente
    if (typeof window === 'undefined') return;

    // Intenta leer el itinerario desde localStorage (solo en cliente)
    let data = null;
    try {
      data = window.localStorage.getItem('itinerario_final');
    } catch {}
    let nombreUsuario = '';
    let correo = '';

    try {
      nombreUsuario = window.localStorage.getItem('usuario_nombre');
    } catch {}

    // Intenta leer de la cookie de sesión
    if (typeof document !== 'undefined') {
      const match = document.cookie.match(/session=([^;]+)/);
      if (match) {
        try {
          const session = JSON.parse(decodeURIComponent(match[1]));
          if (session.nombre && typeof session.nombre === 'string' && session.nombre.trim().length > 0) {
            nombreUsuario = session.nombre;
          }
          if (session.email) {
            correo = session.email;
          }
        } catch {}
      }
    }

    let mostrarUsuario = nombreUsuario && nombreUsuario.trim().length > 0 && nombreUsuario !== 'Usuario' && nombreUsuario !== 'Invitado'
      ? nombreUsuario
      : (correo || 'Invitado');
    setUsuario(mostrarUsuario);
    setCorreoUsuario(correo || '');

    // Si el itinerario no existe, intenta recuperarlo de sessionStorage (fallback)
    if (!data) {
      try {
        data = window.sessionStorage.getItem('itinerario_final');
      } catch {}
    }

    // --- NUEVO: Intenta recuperar el itinerario de la URL (query param) si no está en storage ---
    if (!data && typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const itinParam = params.get('itin');
      if (itinParam) {
        try {
          data = decodeURIComponent(atob(itinParam));
          setItinerario(JSON.parse(data));
          // Opcional: guardar en localStorage para futuras visitas
          window.localStorage.setItem('itinerario_final', data);
        } catch {
          setItinerario(null);
        }
        return;
      }
    }
    // --- FIN NUEVO ---

    if (data) {
      try {
        setItinerario(JSON.parse(data));
      } catch {
        setItinerario(null);
      }
    } else {
      setItinerario(null);
    }

    // Verifica si este itinerario ya está marcado como favorito
    let favs = [];
    try {
      favs = JSON.parse(window.localStorage.getItem('itinerarios_favoritos') || '[]');
    } catch {}
    if (data && favs.some(fav => fav.itinerario && JSON.stringify(fav.itinerario) === data)) {
      setEsFavorito(true);
    }
  }, []);

  // Manejar click en la estrella de favorito
  const handleToggleFavorito = async () => {
    if (!itinerario) return;
    const favs = JSON.parse(localStorage.getItem('itinerarios_favoritos') || '[]');
    const dataStr = JSON.stringify(itinerario);
    // Solo favoritos del usuario actual
    const usuarioActual = usuario || 'Invitado';
    const existe = favs.some(
      fav =>
        fav.usuario === usuarioActual &&
        fav.itinerario &&
        JSON.stringify(fav.itinerario) === dataStr
    );
    let nuevosFavs;
    if (existe) {
      nuevosFavs = favs.filter(
        fav =>
          !(fav.usuario === usuarioActual &&
            fav.itinerario &&
            JSON.stringify(fav.itinerario) === dataStr)
      );
      setEsFavorito(false);
      setMensaje('Ruta removida de favoritos');
    } else {
      nuevosFavs = [...favs, { usuario: usuarioActual, itinerario }];
      setEsFavorito(true);
      setMensaje('Ruta guardada como favorito');
    }
    localStorage.setItem('itinerarios_favoritos', JSON.stringify(nuevosFavs));
    setTimeout(() => setMensaje(''), 1800);

    // Nuevo: guardar en la base de datos usando fetch a tu API
    try {
      // Debes obtener el id del usuario logueado. Aquí se asume que está en localStorage o en la cookie de sesión.
      let usuarioId = null;
      // Intenta obtener el id desde la cookie de sesión
      if (typeof document !== 'undefined') {
        const match = document.cookie.match(/session=([^;]+)/);
        if (match) {
          try {
            const session = JSON.parse(decodeURIComponent(match[1]));
            if (session.id) usuarioId = session.id;
          } catch {}
        }
      }
      // Si no está en la cookie, intenta desde localStorage (ajusta según tu app)
      if (!usuarioId) {
        const idLocal = localStorage.getItem('usuario_id');
        if (idLocal) usuarioId = parseInt(idLocal, 10);
      }
      if (usuarioId) {
        await fetch('/api/favoritos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            usuarioId,
            nombre: 'Ruta favorita',
            itinerario
          })
        });
      }
    } catch (e) {
      // Maneja el error si es necesario
    }
  };

  // Descargar PDF del itinerario
  const handleDescargarPDF = async () => {
    const element = document.getElementById('itinerario-contenido');
    if (!element) return;
    const canvas = await html2canvas(element, { scale: 1.2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let position = 10;
    let remainingHeight = imgHeight;

    if (imgHeight <= pageHeight - 20) {
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    } else {
      let pageCount = Math.ceil(imgHeight / (pageHeight - 20));
      for (let i = 0; i < pageCount; i++) {
        let sourceY = (canvas.height / imgHeight) * (i * (pageHeight - 20));
        let sourceHeight = (canvas.height / imgHeight) * (pageHeight - 20);
        let pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = sourceHeight;
        let ctx = pageCanvas.getContext('2d');
        ctx.drawImage(
          canvas,
          0,
          sourceY,
          canvas.width,
          sourceHeight,
          0,
          0,
          canvas.width,
          sourceHeight
        );
        let pageImgData = pageCanvas.toDataURL('image/png');
        if (i > 0) pdf.addPage();
        pdf.addImage(pageImgData, 'PNG', 10, 10, imgWidth, pageHeight - 20);
      }
    }
    pdf.save('itinerario.pdf');
  };

  // Enviar correo al usuario
  const handleIniciarViaje = async () => {
    if (!correoUsuario) {
      setMensaje('No se encontró el correo del usuario.');
      return;
    }
    // Evita doble click rápido
    if (mensaje === 'Enviando correo...') return;

    setMensaje('Enviando correo...');
    try {
      // Generar PDF igual que el botón de descarga
      const element = document.getElementById('itinerario-contenido');
      let pdfBase64 = '';
      if (element) {
        const canvas = await html2canvas(element, { scale: 1.2, useCORS: true });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pageWidth - 20;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let position = 10;
        if (imgHeight <= pageHeight - 20) {
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        } else {
          let pageCount = Math.ceil(imgHeight / (pageHeight - 20));
          for (let i = 0; i < pageCount; i++) {
            let sourceY = (canvas.height / imgHeight) * (i * (pageHeight - 20));
            let sourceHeight = (canvas.height / imgHeight) * (pageHeight - 20);
            let pageCanvas = document.createElement('canvas');
            pageCanvas.width = canvas.width;
            pageCanvas.height = sourceHeight;
            let ctx = pageCanvas.getContext('2d');
            ctx.drawImage(
              canvas,
              0,
              sourceY,
              canvas.width,
              sourceHeight,
              0,
              0,
              canvas.width,
              sourceHeight
            );
            let pageImgData = pageCanvas.toDataURL('image/png');
            if (i > 0) pdf.addPage();
            pdf.addImage(pageImgData, 'PNG', 10, 10, imgWidth, pageHeight - 20);
          }
        }
        pdfBase64 = pdf.output('datauristring').split(',')[1]; // solo base64
      }

      await fetch('/api/enviar-itinerario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: correoUsuario,
          itinerario,
          pdfBase64
        })
      });
      setMensaje('¡Correo enviado con éxito!');
      setTimeout(() => {
        setMensaje('');
        router.push('/viaje-en-curso');
      }, 1200);
    } catch {
      setMensaje('Error al enviar el correo.');
      setTimeout(() => setMensaje(''), 2000);
    }
  };

  if (!itinerario) {
    return (
      <div style={{
        maxWidth: 700,
        margin: '4rem auto',
        padding: '2.5rem 2rem',
        background: '#f8fafc',
        borderRadius: '18px',
        textAlign: 'center'
      }}>
        <h2>No hay itinerario para mostrar.</h2>
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
      fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
      position: 'relative'
    }}>
      {/* Estrella de favorito en la esquina superior derecha */}
      <button
        onClick={handleToggleFavorito}
        title={esFavorito ? "Quitar de favoritos" : "Marcar como favorito"}
        style={{
          position: 'absolute',
          top: 24,
          right: 24,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          zIndex: 10,
          padding: 0
        }}
        aria-label={esFavorito ? "Quitar de favoritos" : "Marcar como favorito"}
      >
        {esFavorito ? (
          // Estrella llena
          <svg width="38" height="38" viewBox="0 0 24 24" fill="#fbbf24" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        ) : (
          // Estrella vacía
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        )}
      </button>
      {/* Mensaje flotante */}
      {mensaje && (
        <div style={{
          position: 'fixed',
          top: 32,
          right: 90,
          background: '#22c55e',
          color: '#fff',
          padding: '0.9rem 1.7rem',
          borderRadius: '12px',
          fontWeight: 'bold',
          fontSize: '1.15rem',
          boxShadow: '0 2px 16px #22c55e33',
          zIndex: 9999,
          transition: 'opacity 0.3s',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {mensaje === 'Enviando correo...' && (
            <span style={{
              display: 'inline-block',
              width: '1.7em',
              height: '1.7em',
              border: '3px solid #fff',
              borderTop: '3px solid #2563eb',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
          )}
          <span>{mensaje}</span>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg);}
              100% { transform: rotate(360deg);}
            }
          `}</style>
        </div>
      )}
      <div id="itinerario-contenido">
        <div style={{textAlign:'center', marginBottom:'2.5rem'}}>
          <img src="/logo.jpg" alt="Itour Sololá" style={{
            width:'180px',
            marginBottom:'1.2rem',
            borderRadius:'18px',
            boxShadow:'0 2px 12px #2563eb22'
          }} />
          <div style={{
            background: 'linear-gradient(90deg,#22c55e 0%,#2563eb 100%)',
            color: '#fff',
            borderRadius: '18px',
            padding: '1.5rem 2rem',
            fontWeight: 'bold',
            fontSize: '2.1rem',
            marginBottom: '1.2rem',
            boxShadow: '0 2px 16px #2563eb33',
            letterSpacing: '1px'
          }}>
            <span style={{fontSize:'2.3rem', marginRight:'0.7rem'}}>🎉</span>
            ¡Este ha sido tu itinerario personalizado, {usuario}!<br />
            <span style={{fontSize:'1.3rem', fontWeight:400}}>Disfruta tu experiencia con <span style={{color:'#fbbf24'}}>Itour Sololá</span></span>
          </div>
        </div>
        <div>
          {Array.isArray(itinerario) ? (
            itinerario.map((dia, idx) => (
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
              <pre style={{whiteSpace:'pre-wrap', wordBreak:'break-word'}}>{JSON.stringify(itinerario, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
      {/* Botones al final */}
      <div style={{display:'flex', justifyContent:'center', gap:'2rem', marginTop:'2.5rem'}}>
        <button
          onClick={handleIniciarViaje}
          style={{
            background: '#22c55e',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.15rem',
            border: 'none',
            borderRadius: '10px',
            padding: '1rem 2.2rem',
            cursor: 'pointer',
            boxShadow: '0 2px 12px #22c55e33'
          }}
        >
          🚗 Iniciar viaje
        </button>
        <button
          onClick={handleDescargarPDF}
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
          📄 Descargar PDF
        </button>
      </div>
    </div>
  );
}
