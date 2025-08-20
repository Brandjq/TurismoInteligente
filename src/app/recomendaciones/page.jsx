"use client";

import { useEffect, useState } from "react";

export default function Recomendaciones() {
  const [lugares, setLugares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tipo, setTipo] = useState("restaurant");
  const [pagina, setPagina] = useState(1);
  const lugaresPorPagina = 10;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/recomendaciones?tipo=${tipo}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setLugares([]);
          console.error(data.error);
        } else {
          setLugares(data || []);
          setPagina(1);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching recomendaciones:", err);
        setLugares([]);
        setLoading(false);
      });
  }, [tipo]);

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-cyan-100 to-blue-50 flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto my-10 bg-blue-100 rounded-3xl shadow-lg p-6 md:p-10">
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="flex flex-col items-center justify-center mb-2 bg-gradient-to-br from-blue-600 via-blue-300 to-blue-500 rounded-3xl shadow-2xl p-8 w-full">
            <span className="text-[8rem] md:text-[11rem] text-blue-700 drop-shadow-2xl mb-[-2rem] animate-bounce">
              <svg width="200" height="200" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline align-middle">
                <circle cx="75" cy="75" r="75" fill="#1976d2"/>
                <path d="M75 45C61.1929 45 50 56.1929 50 70C50 87.5 75 120 75 120C75 120 100 87.5 100 70C100 56.1929 88.8071 45 75 45Z" fill="#fff" stroke="#1565c0" strokeWidth="4"/>
                <circle cx="75" cy="70" r="13" fill="#1976d2" stroke="#1565c0" strokeWidth="3"/>
              </svg>
            </span>
            <h1 className="text-7xl md:text-8xl font-extrabold text-white m-0 font-sans tracking-wide drop-shadow-2xl animate-fadeIn text-center" style={{lineHeight:1.1, textShadow:'0 2px 24px #1976d2'}}>
              RECOMENDACIONES EN SOLOLA
            </h1>
          </div>
          <div className="text-4xl md:text-5xl font-extrabold text-blue-900 bg-white bg-opacity-80 px-8 py-4 rounded-2xl shadow-xl text-center mb-4 animate-fadeIn" style={{textShadow:'0 2px 16px #42a5f5'}}>
            <span className="align-middle mr-3 animate-bounce">🌄</span>
            ¡Descubre Sololá como nunca antes!
          </div>
          <p className="text-2xl md:text-3xl text-blue-800 font-semibold drop-shadow-lg text-center max-w-2xl mx-auto mb-4 animate-fadeIn">
            <span className="font-extrabold text-4xl md:text-5xl text-blue-900 drop-shadow-xl">Aquí puedes encontrar recomendaciones sobre qué hacer en el departamento, selecciona el filtro que más te interese.</span>
          </p>
          <div className="text-3xl md:text-4xl text-blue-900 font-extrabold animate-pulse bg-white bg-opacity-80 rounded-xl px-6 py-3 shadow-xl mt-2">
            <span className="font-extrabold text-4xl md:text-5xl text-blue-900 animate-pulse">{lugares.length} lugares recomendados para ti</span>
          </div>
        </div>
        <div className="mb-6 text-center flex flex-wrap justify-center items-center gap-3">
          <div className="flex gap-2 flex-wrap justify-center w-full max-w-xl mx-auto rounded-2xl shadow-md p-3 relative">
            {[
              { value: "restaurant", label: "Restaurantes" },
              { value: "tourist_attraction", label: "Atracciones" },
              { value: "cafe", label: "Cafés" },
              { value: "museum", label: "Museos" },
              { value: "church", label: "Iglesias" },
              { value: "turismo", label: "Turismo" },
              { value: "bar", label: "Bares" },
              { value: "lodging", label: "Hoteles" },
              { value: "park", label: "Parques" },
              { value: "art_gallery", label: "Galerías de arte" }
            ].map(filtro => (
              <button
                key={filtro.value}
                onClick={() => setTipo(filtro.value)}
                className={`
                  text-lg px-8 py-4 rounded-full font-bold transition-all duration-200 shadow-xl focus:outline-none
                  border-4 border-blue-700
                  ${tipo === filtro.value
                    ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white scale-105 pulse'
                    : 'bg-gradient-to-r from-blue-400 to-blue-300 text-white hover:scale-105 hover:shadow-2xl'}
                `}
                style={{
                  marginBottom: '0.7rem',
                  fontFamily: 'inherit',
                  letterSpacing: '0.04em',
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: tipo === filtro.value
                    ? '0 0 0 8px #1976d2, 0 12px 36px rgba(52,152,219,0.22)'
                    : '0 2px 12px rgba(52,152,219,0.10)'
                }}
              >
                <span style={{
                  position: 'relative',
                  zIndex: 2,
                  letterSpacing: '0.04em',
                  textShadow: tipo === filtro.value ? '0 2px 8px #1565c0' : 'none',
                  fontSize: '1.3rem',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s'
                }}>{filtro.label}</span>
              </button>
            ))}
          </div>
        <style jsx>{`
          .pulse {
            animation: pulse 1.2s ease-in-out infinite;
          }
          @keyframes pulse {
            0% { box-shadow: 0 0 0 8px #1976d2, 0 12px 36px rgba(52,152,219,0.22); }
            50% { box-shadow: 0 0 0 16px #90caf9, 0 20px 48px rgba(52,152,219,0.32); }
            100% { box-shadow: 0 0 0 8px #1976d2, 0 12px 36px rgba(52,152,219,0.22); }
          }
        `}</style>
        </div>
      </div>

      {loading ? (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          background: "linear-gradient(135deg, #e0f7fa 0%, #fffde4 100%)",
          borderRadius: "1.5rem",
          boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
          padding: "2.5rem 2rem 2rem 2rem",
          margin: "2rem auto",
          maxWidth: "420px"
        }}>
          <h2 style={{ color: "#00796b", fontWeight: "bold", marginBottom: "1rem", fontSize: "2rem", textAlign: "center" }}>
            ¡Estamos preparando tus recomendaciones turísticas!
          </h2>
          <p style={{ color: "#333", fontSize: "1.15rem", marginBottom: "1.5rem", textAlign: "center" }}>
            Por favor espera un momento mientras buscamos los mejores destinos para ti.<br />
            <span style={{ color: "#009688", fontWeight: "bold" }}>La espera será recompensada con aventura 🌎</span>
          </p>
          <img
            src="https://media.giphy.com/media/5hpXZ7ENJKiCKVhULE/giphy.gif"
            alt="Turismo loading"
            style={{ width: "180px", borderRadius: "1rem", marginBottom: "1.5rem", boxShadow: "0 4px 24px #009688" }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginTop: "0.5rem" }}>
            <span style={{ color: "#00796b", fontWeight: "bold", fontSize: "1.1rem" }}>Cargando...</span>
            <span style={{
              width: "28px",
              height: "28px",
              border: "4px solid #b2dfdb",
              borderTop: "4px solid #00796b",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              display: "inline-block"
            }} />
          </div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      ) : (
        <>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2rem",
            width: "100%"
          }}>
            {lugares
              .slice((pagina - 1) * lugaresPorPagina, pagina * lugaresPorPagina)
              .map((lugar, idx) => (
                <div key={idx} style={{
                  background: "#fff",
                  borderRadius: 24,
                  boxShadow: "0 4px 32px rgba(52,152,219,0.13)",
                  padding: "2.2rem 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  maxWidth: "900px",
                  margin: "0 auto"
                }}>
                  {(lugar.image_url || lugar.foto) && (
                    <img
                      src={lugar.image_url || lugar.foto}
                      alt={lugar.nombre}
                      width={420}
                      height={260}
                      loading="lazy"
                      style={{
                        borderRadius: 16,
                        objectFit: "cover",
                        width: "100%",
                        maxHeight: 260,
                        marginBottom: 16,
                        transition: "transform 0.3s cubic-bezier(.4,2,.3,1), box-shadow 0.3s",
                        boxShadow: "0 2px 12px rgba(52,152,219,0.10)",
                        cursor: "pointer"
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.transform = "scale(1.08)";
                        e.currentTarget.style.boxShadow = "0 8px 32px rgba(52,152,219,0.22)";
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "0 2px 12px rgba(52,152,219,0.10)";
                      }}
                    />
                  )}
                  <div style={{ fontWeight: "bold", fontSize: "1.45rem", color: "#1976d2", marginBottom: 10, textAlign: "center" }}>{lugar.nombre}</div>
                  <div style={{ color: "#263238", fontSize: "1.15rem", marginBottom: 12, textAlign: "center" }}>{lugar.direccion}</div>
                  {lugar.web ? (
                    <a href={lugar.web} target="_blank" rel="noopener noreferrer" style={{ background: "#1976d2", color: "#fff", padding: "0.7em 2em", borderRadius: 12, textDecoration: "none", fontWeight: "bold", fontSize: "1.15rem", marginTop: 8, marginRight: 8 }}>Visitar sitio web</a>
                  ) : null}
                  <a href={lugar.url} target="_blank" rel="noopener noreferrer" style={{ background: lugar.web ? "#1abc9c" : "#1976d2", color: "#fff", padding: "0.7em 2em", borderRadius: 12, textDecoration: "none", fontWeight: "bold", fontSize: "1.15rem", marginTop: 8 }}>{lugar.web ? "Ver en Google Maps" : "Ver ubicación"}</a>
                </div>
              ))}
          </div>
          {/* Controles de paginación */}
          {lugares.length > lugaresPorPagina && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1.2rem", margin: "2rem 0" }}>
              <button
                onClick={() => setPagina(p => Math.max(1, p - 1))}
                disabled={pagina === 1}
                style={{
                  fontSize: "1.3rem",
                  padding: "0.5em 1.2em",
                  borderRadius: 20,
                  border: "2px solid #1976d2",
                  backgroundColor: pagina === 1 ? "#b0bec5" : "#1976d2",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: pagina === 1 ? "not-allowed" : "pointer",
                  outline: "none",
                  transition: "all 0.2s"
                }}
              >
                ← Anterior
              </button>
              <span style={{ fontSize: "1.2rem", color: "#1976d2", fontWeight: "bold" }}>
                Página {pagina} de {Math.ceil(lugares.length / lugaresPorPagina)}
              </span>
              <button
                onClick={() => setPagina(p => p < Math.ceil(lugares.length / lugaresPorPagina) ? p + 1 : p)}
                disabled={pagina >= Math.ceil(lugares.length / lugaresPorPagina)}
                style={{
                  fontSize: "1.3rem",
                  padding: "0.5em 1.2em",
                  borderRadius: 20,
                  border: "2px solid #1976d2",
                  backgroundColor: pagina >= Math.ceil(lugares.length / lugaresPorPagina) ? "#b0bec5" : "#1976d2",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: pagina >= Math.ceil(lugares.length / lugaresPorPagina) ? "not-allowed" : "pointer",
                  outline: "none",
                  transition: "all 0.2s"
                }}
              >
                Siguiente →
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
