
"use client";


import { useEffect, useState } from "react";
import Image from "next/image";

const API_KEY = "AIzaSyBlC5gsUOjgMr87ZxBSSLh7Z_KW98QKLYM";
const LAT = "14.7701";
const LNG = "-91.1830";
const RADIUS = "50000";

export default function Recomendaciones() {
  const [lugares, setLugares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tipo, setTipo] = useState("restaurant");

  useEffect(() => {
    setLoading(true);
    let allLugares = [];
    let pagetoken = null;
    let tries = 0;
    const fetchPaginated = async () => {
      do {
        let url = `https://corsproxy.io/?https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${LAT},${LNG}&radius=${RADIUS}&type=${tipo}&key=${API_KEY}`;
        if (pagetoken) url += `&pagetoken=${pagetoken}`;
        // Google may require a short delay before pagetoken works
        if (pagetoken) await new Promise(res => setTimeout(res, 2000));
        const res = await fetch(url);
        const data = await res.json();
        const municipios = [
          "Sololá", "Panajachel", "San Pedro La Laguna", "San Juan La Laguna", "San Marcos La Laguna", "Santa Cruz La Laguna", "San Pablo La Laguna", "San Lucas Tolimán", "Santiago Atitlán", "Santa Catarina Palopó", "San Antonio Palopó", "Santa Clara La Laguna", "San Jorge La Laguna", "San Andrés Semetabaj", "San José Chacayá", "Santa Lucía Utatlán", "Nahualá", "Santa María Visitación", "Concepción", "San Bartolo", "Lago de Atitlán"
        ];
        const nuevos = (data.results || [])
          .filter(lugar => {
            const dir = (lugar.vicinity || "") + " " + (lugar.name || "");
            return municipios.some(mun => dir.toLowerCase().includes(mun.toLowerCase()));
          })
          .map(lugar => ({
            nombre: lugar.name,
            direccion: lugar.vicinity,
            foto: lugar.photos && lugar.photos[0] ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${lugar.photos[0].photo_reference}&key=${API_KEY}` : null,
            url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lugar.name)}&query_place_id=${lugar.place_id}`
          }));
        allLugares = [...allLugares, ...nuevos];
        pagetoken = data.next_page_token || null;
        tries++;
      } while (pagetoken && tries < 3); // Google solo permite hasta 3 páginas
      setLugares(allLugares);
      setLoading(false);
    };
    fetchPaginated().catch(() => {
      setLugares([]);
      setLoading(false);
    });
  }, [tipo]);

  return (
    <main style={{ maxWidth: 900, margin: "2.5rem auto", padding: "2rem 1rem", background: 'linear-gradient(135deg, #e0f7fa 0%, #fff 100%)', borderRadius: '24px', boxShadow: '0 4px 32px rgba(0,0,0,0.10)' }}>
      <h1 style={{ fontSize: "2.8rem", fontWeight: "bold", textAlign: "center", color: "#1976d2", marginBottom: "2.2rem", textShadow: "2px 2px 12px #b2ebf2", fontFamily: "Montserrat, Poppins, Arial, sans-serif" }}>
        Recomendaciones en Sololá
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#455a64", textAlign: "center", maxWidth: 700, margin: "0 auto 2rem", fontFamily: "Poppins, sans-serif" }}>
  {/* Escribe aquí tu descripción personalizada sobre los atractivos turísticos de Sololá */}
  Aquí puedes encontrar recomendaciones sobre que hacer en el departamento, selecciona el filtro.
</p>
    <div style={{ marginBottom: "2rem", textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
  <label style={{ fontSize: "1.4rem", fontWeight: "600", color: "#37474F" }}>Tipo:</label>
  <select
    value={tipo}
    onChange={e => setTipo(e.target.value)}
    style={{
      fontSize: "1.3rem",
      padding: "0.6em 1.2em",
      borderRadius: 10,
      border: "1px solid #B0BEC5",
      backgroundColor: "#ffffff",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      cursor: "pointer"
    }}
  >
    <option value="restaurant">Restaurantes</option>
    <option value="tourist_attraction">Atracciones</option>
    <option value="cafe">Cafés</option>
    <option value="museum">Museos</option>
    <option value="church">Iglesias</option>
  </select>
</div>

      {loading ? (
        <div style={{ color: "#009688", fontWeight: "bold", textAlign: 'center' }}>Cargando...</div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "2rem",
          width: "100%"
        }}>
          {lugares.map((lugar, idx) => (
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
              <a href={lugar.url} target="_blank" rel="noopener noreferrer" style={{ background: "#1abc9c", color: "#fff", padding: "0.7em 2em", borderRadius: 12, textDecoration: "none", fontWeight: "bold", fontSize: "1.15rem", marginTop: 8 }}>Ver en Google Maps</a>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}