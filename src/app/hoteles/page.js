
import AddHotelButton from "./AddHotelButton";
import { PrismaClient } from "@prisma/client";

export default async function HotelesPage() {
  const prisma = new PrismaClient();
  const hoteles = await prisma.hotel.findMany();
  await prisma.$disconnect();

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', background: 'linear-gradient(120deg, #e0e7ff 0%, #f0fff4 100%)', position: 'relative' }}>
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 800,
        textAlign: 'center',
        marginBottom: '2.5rem',
        letterSpacing: 1,
        color: '#234e70',
        textShadow: '0 2px 12px #0001'
      }}>
        Hoteles en Sololá
      </h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2.5rem',
          maxWidth: 1400,
          margin: '0 auto',
        }}
      >
        {hoteles.map((hotel) => (
          <div
            key={hotel.id}
            className="hotel-card"
            style={{
              border: 'none',
              borderRadius: '28px',
              padding: '2.2rem 2rem 2rem 2rem',
              background: 'linear-gradient(135deg, #fff 80%, #e6fffa 100%)',
              boxShadow: '0 6px 36px #0002',
              width: '100%',
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'transform 0.25s cubic-bezier(.4,2,.3,1)',
              cursor: 'pointer',
              maxWidth: 520,
            }}
          >
            <div className="hotel-img-wrap" style={{ width: '100%', maxWidth: 440, height: 320, overflow: 'hidden', borderRadius: '18px', boxShadow: '0 2px 16px #0001', marginBottom: 18 }}>
              <img
                src={`/uploads/${hotel.imagen}`}
                alt={hotel.nombre}
                className="hotel-img"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '18px', transition: 'transform 0.35s cubic-bezier(.4,2,.3,1)' }}
              />
            </div>
            <h2 style={{ fontSize: '2.3rem', margin: '1.2rem 0 0.5rem 0', color: '#234e70', fontWeight: 700, textAlign: 'center' }}>{hotel.nombre}</h2>
            <p style={{ margin: 0, color: '#555', fontWeight: 500, fontSize: 20, textAlign: 'center' }}>{hotel.direccion}</p>
            <p style={{ margin: '0.9rem 0', color: '#888', fontSize: 18, textAlign: 'center' }}>{hotel.descripcion}</p>
            <p style={{ fontWeight: 'bold', color: '#3182ce', fontSize: 22, marginBottom: 10 }}>{hotel.precio}</p>
            <a
              href={hotel.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#fff',
                background: 'linear-gradient(90deg, #3182ce 60%, #38b2ac 100%)',
                padding: '0.9rem 2rem',
                borderRadius: '10px',
                textDecoration: 'none',
                display: 'inline-block',
                marginTop: '1rem',
                fontWeight: 700,
                fontSize: 19,
                boxShadow: '0 2px 12px #3182ce22',
                transition: 'background 0.2s',
              }}
            >
              Ver sitio
            </a>
          </div>
        ))}
      </div>
      {/* Botón flotante para agregar hotel, más grande y más visible */}
      <div style={{ position: 'fixed', bottom: 40, right: 40, zIndex: 3000 }}>
        <AddHotelButton />
      </div>
      {/* Animaciones y responsive solo CSS */}
      <style>{`
        .hotel-card:hover {
          transform: scale(1.10);
          box-shadow: 0 18px 60px #3182ce44;
        }
        .hotel-card:hover .hotel-img {
          transform: scale(1.13);
        }
        @media (max-width: 900px) {
          h1 { font-size: 2.2rem !important; }
          .hotel-card { max-width: 98vw !important; }
          .hotel-img-wrap { max-width: 98vw !important; height: 220px !important; }
        }
        @media (max-width: 600px) {
          h1 { font-size: 1.5rem !important; }
          .hotel-card { padding: 1.1rem !important; }
          .hotel-img-wrap { height: 140px !important; }
        }
      `}</style>
    </div>
  );
}
