"use client";

import { useEffect, useState } from "react";

export default function Recomendaciones() {
  const [lugares, setLugares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tipo, setTipo] = useState("restaurant");
  const [pagina, setPagina] = useState(1);
  const lugaresPorPagina = 10;
  const totalPaginas = Math.ceil(lugares.length / lugaresPorPagina);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/recomendaciones?tipo=${tipo}`)
      .then(async res => {
        try {
          const text = await res.text();
          if (!text) {
            setLugares([]);
            setLoading(false);
            return;
          }
          const data = JSON.parse(text);
          if (data.error) {
            setLugares([]);
            console.error(data.error);
          } else {
            setLugares(data);
            setPagina(1); // Reiniciar a la primera página al cambiar filtro
          }
        } catch (err) {
          setLugares([]);
          console.error("Error parsing JSON:", err);
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
    <main style={{
      width: "100vw",
      minHeight: "100vh",
      margin: 0,
      padding: 0,
      background: 'linear-gradient(135deg, #e0f7fa 0%, #e3f2fd 100%)',
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "1150px",
        minWidth: "900px",
        margin: "2.5rem auto 2.2rem auto",
        background: "#e3f2fd",
        borderRadius: "24px",
        boxShadow: "0 4px 32px rgba(25,118,210,0.10)",
        padding: "2.2rem 2.2rem 1.2rem 2.2rem"
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "1.2rem" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "0.7rem" }}>
            <span style={{ fontSize: "7.5rem", color: "#1976d2", textShadow: "0 8px 32px #b2ebf2", animation: "pinFadeIn 1.2s cubic-bezier(.4,2,.3,1)", marginBottom: "-1.2rem" }}>
              <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: "middle" }}>
                <circle cx="75" cy="75" r="75" fill="#1976d2"/>
                <path d="M75 45C61.1929 45 50 56.1929 50 70C50 87.5 75 120 75 120C75 120 100 87.5 100 70C100 56.1929 88.8071 45 75 45Z" fill="#fff" stroke="#1565c0" strokeWidth="4"/>
                <circle cx="75" cy="70" r="13" fill="#1976d2" stroke="#1565c0" strokeWidth="3"/>
              </svg>
            </span>
            <h1 style={{ fontSize: "4.5rem", fontWeight: "bold", color: "#1976d2", margin: 0, fontFamily: "Montserrat, Poppins, Arial, sans-serif", letterSpacing: "0.06em", textShadow: "0 8px 32px #b2ebf2", animation: "titleFadeIn 1.2s cubic-bezier(.4,2,.3,1)", textAlign: "center" }}>
              Recomendaciones en Sololá
            </h1>
            <style>{`
              @keyframes pinFadeIn {
                0% { opacity: 0; transform: scale(0.7) translateY(-40px); }
                100% { opacity: 1; transform: scale(1) translateY(0); }
              }
              @keyframes titleFadeIn {
                0% { opacity: 0; transform: scale(0.7) translateY(40px); }
                100% { opacity: 1; transform: scale(1) translateY(0); }
              }
            `}</style>
          </div>
          <div style={{ fontSize: "1.35rem", color: "#009688", fontWeight: "bold", marginBottom: "0.3rem", fontFamily: "Poppins, sans-serif", textAlign: "center", textShadow: "0 2px 12px #b2ebf2", letterSpacing: "0.04em", animation: "descFadeIn 1.3s cubic-bezier(.4,2,.3,1)" }}>
            <span style={{ fontSize: "1.7rem", verticalAlign: "middle", marginRight: "0.3em" }}>🌄</span>
            ¡Descubre Sololá como nunca antes!
            <style>{`
              @keyframes descFadeIn {
                0% { opacity: 0; transform: scale(0.7) translateY(30px); }
                100% { opacity: 1; transform: scale(1) translateY(0); }
              }
            `}</style>
          </div>
          <p style={{ fontSize: "1.08rem", color: "#455a64", textAlign: "center", maxWidth: 700, margin: "0 auto 0.7rem", fontFamily: "Poppins, sans-serif" }}>
            Aquí puedes encontrar recomendaciones sobre qué hacer en el departamento, selecciona el filtro que más te interese.
          </p>
          <div style={{ fontSize: "1.05rem", color: "#1976d2", fontWeight: "bold", marginTop: "0.2rem", fontFamily: "Poppins, sans-serif", textAlign: "center", background: "#e3f2fd", borderRadius: "10px", padding: "0.3em 1em", boxShadow: "0 2px 8px rgba(25,118,210,0.08)" }}>
            {lugares.length} lugares recomendados para ti
          </div>
        </div>
        <div style={{ marginBottom: "1.2rem", textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {/* Eliminado label 'Tipo:' para más espacio visual */}
          <div style={{
            display: "flex",
            gap: "0.35rem",
            flexWrap: "nowrap",
            justifyContent: "center",
            width: "100%",
            maxWidth: "650px",
            minWidth: "320px",
            margin: "0 auto",
            background: "linear-gradient(90deg, #e3f2fd 60%, #bbdefb 100%)",
            borderRadius: "16px",
            boxShadow: "0 4px 18px rgba(25,118,210,0.11)",
            padding: "0.7rem 0.7rem 0.7rem 0.7rem",
            position: "relative"
          }}>
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
                style={{
                  fontSize: "1rem",
                  padding: "0.45em 0.85em",
                  borderRadius: 16,
                  border: tipo === filtro.value ? "2px solid #1976d2" : "1px solid #B0BEC5",
                  background: tipo === filtro.value
                    ? "linear-gradient(90deg, #1976d2 70%, #64b5f6 100%)"
                    : "#f5f5f5",
                  color: tipo === filtro.value ? "#fff" : "#37474F",
                  fontWeight: "bold",
                  boxShadow: tipo === filtro.value
                    ? "0 4px 16px rgba(25,118,210,0.16), 0 2px 8px rgba(25,118,210,0.10)"
                    : "0 1px 4px rgba(52,152,219,0.07)",
                  cursor: "pointer",
                  outline: "none",
                  transition: "all 0.22s cubic-bezier(.4,2,.3,1)",
                  transform: tipo === filtro.value ? "translateY(-2px) scale(1.06)" : "scale(1)",
                  letterSpacing: "0.02em"
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = "linear-gradient(90deg, #1565c0 70%, #64b5f6 100%)";
                  e.currentTarget.style.transform = "translateY(-1px) scale(1.09)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(25,118,210,0.19), 0 2px 8px rgba(25,118,210,0.10)";
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = tipo === filtro.value
                    ? "linear-gradient(90deg, #1976d2 70%, #64b5f6 100%)"
                    : "#f5f5f5";
                  e.currentTarget.style.transform = tipo === filtro.value ? "translateY(-2px) scale(1.06)" : "scale(1)";
                  e.currentTarget.style.boxShadow = tipo === filtro.value
                    ? "0 4px 16px rgba(25,118,210,0.16), 0 2px 8px rgba(25,118,210,0.10)"
                    : "0 1px 4px rgba(52,152,219,0.07)";
                }}
              >
                {filtro.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ color: "#009688", fontWeight: "bold", textAlign: 'center' }}>Cargando...</div>
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
                  {lugar.foto && (
                    <img
                      src={lugar.foto}
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
                Página {pagina} de {totalPaginas}
              </span>
              <button
                onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
                disabled={pagina === totalPaginas}
                style={{
                  fontSize: "1.3rem",
                  padding: "0.5em 1.2em",
                  borderRadius: 20,
                  border: "2px solid #1976d2",
                  backgroundColor: pagina === totalPaginas ? "#b0bec5" : "#1976d2",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: pagina === totalPaginas ? "not-allowed" : "pointer",
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
