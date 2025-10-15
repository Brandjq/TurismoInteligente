import AddHotelButton from "./AddHotelButton";
import { PrismaClient } from "@prisma/client";

export default async function HotelesPage() {
  const prisma = new PrismaClient();
  const hoteles = await prisma.hotel.findMany();
  await prisma.$disconnect();

  return (
    <div
      style={{
        padding: "2rem",
        minHeight: "100vh",
        background: "linear-gradient(120deg, #e0e7ff 0%, #f0fff4 100%)",
        position: "relative",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(1.5rem, 4vw, 3rem)",
          fontWeight: 800,
          textAlign: "center",
          marginBottom: "2.5rem",
          letterSpacing: 1,
          color: "#234e70",
          textShadow: "0 2px 12px #0001",
        }}
      >
        Hoteles en Sololá
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "2.5rem",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        {hoteles.map((hotel) => (
          <div
            key={hotel.id}
            className="hotel-card"
            style={{
              border: "none",
              borderRadius: "28px",
              padding: "2.2rem 2rem 2rem 2rem",
              background: "linear-gradient(135deg, #fff 80%, #e6fffa 100%)",
              boxShadow: "0 6px 36px #0002",
              width: "100%",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "transform 0.25s cubic-bezier(.4,2,.3,1)",
              cursor: "pointer",
              maxWidth: 520,
              position: "relative",
            }}
          >
            <div
              className="hotel-img-wrap"
              style={{
                width: "100%",
                maxWidth: 440,
                aspectRatio: "16/9",
                overflow: "hidden",
                borderRadius: "18px",
                boxShadow: "0 2px 16px #0001",
                marginBottom: 18,
              }}
            >
              <img
                src={`/uploads/${hotel.imagen}`}
                alt={hotel.nombre}
                className="hotel-img"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "18px",
                  transition: "transform 0.35s cubic-bezier(.4,2,.3,1)",
                }}
              />
            </div>
            <h2
              style={{
                fontSize: "clamp(1.2rem, 3vw, 2.3rem)",
                margin: "1.2rem 0 0.5rem 0",
                color: "#234e70",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              {hotel.nombre}
            </h2>
            <p
              style={{
                margin: 0,
                color: "#555",
                fontWeight: 500,
                fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
                textAlign: "center",
              }}
            >
              {hotel.direccion}
            </p>
            <p
              style={{
                margin: "0.9rem 0",
                color: "#888",
                fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                textAlign: "center",
              }}
            >
              {hotel.descripcion}
            </p>
            <p
              style={{
                fontWeight: "bold",
                color: "#3182ce",
                fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
                marginBottom: 10,
              }}
            >
              {hotel.precio}
            </p>
            <a
              href={hotel.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#fff",
                background: "linear-gradient(90deg, #3182ce 60%, #38b2ac 100%)",
                padding: "0.9rem 2rem",
                borderRadius: "10px",
                textDecoration: "none",
                display: "inline-block",
                marginTop: "1rem",
                fontWeight: 700,
                fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)",
                boxShadow: "0 2px 12px #3182ce22",
                transition: "background 0.2s",
              }}
            >
              Ver sitio
            </a>
            {/* Botón eliminar visible solo para admin (cliente) */}
            <button
              className="hotel-delete-btn"
              style={{
                display: "none", // Se muestra solo si es admin (cliente)
                position: "absolute",
                top: 18,
                right: 18,
                background: "#e11d48",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "2.5rem",
                height: "2.5rem",
                fontSize: "1.5rem",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 2px 12px #e11d4822",
                zIndex: 10,
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                lineHeight: "2.5rem",
              }}
              data-hotel-id={hotel.id}
              title="Eliminar hotel"
              type="button"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Botón flotante para agregar hotel, solo visible para admin */}
      <div
        className="add-hotel-btn"
        style={{
          position: "fixed",
          bottom: 40,
          right: 40,
          zIndex: 3000,
          display: "none", // Solo visible para admin (cliente)
        }}
      >
        <AddHotelButton />
      </div>

      {/* Animaciones y responsive */}
      <style>{`
        .hotel-card:hover {
          transform: scale(1.10);
          box-shadow: 0 18px 60px #3182ce44;
        }
        .hotel-card:hover .hotel-img {
          transform: scale(1.13);
        }
        /* Mostrar botón eliminar solo si es admin (cliente) */
        body[data-admin="true"] .hotel-delete-btn {
          display: flex !important;
        }
        /* Mostrar botón agregar solo si es admin (cliente) */
        body[data-admin="true"] .add-hotel-btn {
          display: block !important;
        }
        .hotel-delete-btn:hover {
          background: #be123c;
        }
        @media (max-width: 900px) {
          .hotel-card { max-width: 98vw !important; }
        }
        @media (max-width: 600px) {
          .hotel-card { padding: 1.1rem !important; }
          .add-hotel-btn { bottom: 20px !important; right: 20px !important; transform: scale(0.9); }
        }
      `}</style>
      {/* Script para mostrar botones de admin en cliente */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
        (function() {
          try {
            var isAdmin = false;
            var match = document.cookie.match(/session=([^;]+)/);
            if (match) {
              var session = JSON.parse(decodeURIComponent(match[1]));
              isAdmin = session.isAdmin === true;
            }
            if (isAdmin) {
              document.body.setAttribute('data-admin', 'true');
              document.querySelectorAll('.hotel-delete-btn').forEach(btn => {
                btn.style.display = 'flex';
                btn.onclick = async function() {
                  if (confirm('¿Seguro que deseas eliminar este hotel?')) {
                    const id = btn.getAttribute('data-hotel-id');
                    const res = await fetch('/api/hoteles/' + id, { method: 'DELETE' });
                    if (res.ok) {
                      location.reload();
                    } else {
                      alert('No se pudo eliminar el hotel. Verifica que el endpoint /api/hoteles/[id] exista y acepte DELETE.');
                    }
                  }
                };
              });
              // Mostrar el botón de agregar hotel solo para admin
              var addBtn = document.querySelector('.add-hotel-btn');
              if (addBtn) addBtn.style.display = 'block';
            } else {
              // Oculta el botón de agregar hotel si no es admin
              var addBtn = document.querySelector('.add-hotel-btn');
              if (addBtn) addBtn.style.display = 'none';
            }
          } catch(e){}
        })();
        `,
        }}
      />
    </div>
  );
}

// El error indica que falta el endpoint /api/hoteles/[id]/route.js con soporte para DELETE.
// Debes tener un archivo en: src/app/api/hoteles/[id]/route.js con algo como esto:

// --- Crea este archivo si no existe ---
// import { PrismaClient } from "@prisma/client";

// export async function DELETE(request, { params }) {
//   const prisma = new PrismaClient();
//   const id = Number(params.id);
//   try {
//     await prisma.hotel.delete({ where: { id } });
//     return new Response(null, { status: 204 });
//   } catch (e) {
//     return new Response(JSON.stringify({ error: "No se pudo eliminar" }), { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// }
// --- Fin del archivo ---

// Si ya existe, revisa que esté correctamente nombrado y exporte DELETE.
// Si usas app router, la ruta debe ser: src/app/api/hoteles/[id]/route.js

// Soluciona el error de "Hydration failed" asegurando que el render del server y del cliente sea igual.
// No uses lógica condicional de cliente/servidor ni valores variables en el render del Server Component.
// Elimina cualquier uso de Date.now(), Math.random(), o lógica que dependa de window/document/cookies en el render.

// Asegúrate de que todos los props y datos usados en el render sean estáticos y provengan solo de la base de datos o props.
// El botón de eliminar y el control de admin ya están correctamente delegados al script del cliente.
// Si necesitas lógica de cliente, muévela a un Client Component aparte y usa 'use client' en ese archivo.
