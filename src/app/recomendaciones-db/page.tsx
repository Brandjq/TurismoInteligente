// src/app/recomendaciones-db/page.tsx
import React from "react";
import prisma from '../../../lib/prisma';



export default async function RecomendacionesPage() {
  const recomendaciones = await prisma.recomendacion.findMany({
    orderBy: { id: "asc" },
  });

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: "0 20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>Recomendaciones en Sololá</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {recomendaciones.length === 0 && (
          <p style={{ textAlign: "center", color: "#666" }}>
            No hay recomendaciones disponibles por el momento.
          </p>
        )}

        {recomendaciones.map((rec) => (
          <div
            key={rec.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgb(0 0 0 / 0.1)",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {rec.imagen && (
              <img
                src={rec.imagen}
                alt={rec.nombre}
                style={{ width: "100%", height: 160, objectFit: "cover" }}
              />
            )}

            <div style={{ padding: 15, flex: 1, display: "flex", flexDirection: "column" }}>
              <h2 style={{ margin: "0 0 8px", fontSize: "1.3rem", color: "#222" }}>
                {rec.nombre}
              </h2>

              <p style={{ margin: 0, fontSize: 14, color: "#666", fontWeight: "600" }}>
                {rec.lugar} {rec.fecha ? `• ${rec.fecha}` : ""}
              </p>

              <p
                style={{
                  flexGrow: 1,
                  marginTop: 12,
                  fontSize: 14,
                  color: "#444",
                  lineHeight: 1.4,
                }}
              >
                {rec.descripcion}
              </p>

              {rec.destacado && (
                <span
                  style={{
                    marginTop: 12,
                    alignSelf: "flex-start",
                    backgroundColor: "#f39c12",
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: 20,
                    fontWeight: "bold",
                    fontSize: 12,
                  }}
                >
                  Destacado
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
