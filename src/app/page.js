"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const lakeImages = [
  '/lago.jpg',
  '/mirador-atitlan.jpg',
  '/san-pedro-la-laguna.jpg',
  '/santiago-atitlan.jpg',
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  // Cambia la imagen automáticamente cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % lakeImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main style={{
      maxWidth: '1400px',
      margin: '2rem auto',
      padding: '2.5rem 2rem',
      background: 'linear-gradient(135deg, #e0f7fa 0%, #fff 100%)',
      borderRadius: '24px',
      boxShadow: '0 4px 32px rgba(0,0,0,0.10)'
    }}>
      <style>{`
        @keyframes bannerFade {
          0% { opacity: 0; transform: translateY(-30px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .banner-animado {
          animation: bannerFade 1.2s cubic-bezier(.4,2,.6,1);
        }
        .clima-animado {
          background: linear-gradient(120deg, #e1f5fe 60%, #b2dfdb 100%);
          border-radius: 22px;
          box-shadow: 0 4px 24px rgba(26,188,156,0.13);
          padding: 1.5rem 2.5rem;
          margin: 0 auto 2.2rem auto;
          max-width: 600px;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          font-family: 'Poppins', Arial, sans-serif;
          font-size: 1.25rem;
          color: #1976d2;
          position: relative;
          overflow: hidden;
          border: 2px solid #4dd0e1;
        }
        .clima-animado .icono {
          width: 64px;
          height: 64px;
          margin-right: 1.1rem;
          filter: drop-shadow(0 2px 8px #b2ebf2);
          animation: solMove 2.5s infinite alternate cubic-bezier(.4,2,.6,1);
        }
        @keyframes solMove {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(-8px) scale(1.08); }
        }
        .clima-animado .temp {
          font-size: 2.2rem;
          font-weight: bold;
          color: #039be5;
        }
        .clima-animado .desc {
          font-size: 1.1rem;
          color: #1976d2;
        }
        .clima-animado .lugar {
          font-size: 1.05rem;
          color: #009688;
          font-weight: 600;
          margin-bottom: 0.2rem;
        }
        @media (max-width: 700px) {
          .clima-animado { flex-direction: column; align-items: flex-start; padding: 1rem 1rem; }
          .clima-animado .icono { margin-bottom: 0.5rem; }
        }
        .banner-animado {
          background: linear-gradient(90deg, #1976d2 60%, #26c6da 100%);
          color: #fff;
          border-radius: 22px;
          padding: 1.5rem 2.5rem;
          margin: 0 auto 2.2rem auto;
          max-width: 900px;
          text-align: center;
          font-size: 2.1rem;
          font-weight: bold;
          letter-spacing: 1px;
          box-shadow: 0 2px 24px rgba(26,188,156,0.13);
          text-shadow: 1px 2px 12px #039be5;
          border: 2px solid #4dd0e1;
        }
        .eventos-tips {
          background: linear-gradient(120deg, #fffde7 60%, #e1f5fe 100%);
          border-radius: 18px;
          box-shadow: 0 2px 18px rgba(255,193,7,0.10);
          padding: 1.2rem 2.2rem;
          margin: 0 auto 2.2rem auto;
          max-width: 900px;
          font-family: 'Poppins', Arial, sans-serif;
          font-size: 1.18rem;
          color: #795548;
          display: flex;
          flex-direction: row;
          gap: 2.2rem;
          align-items: flex-start;
          animation: bannerFade 1.2s 0.5s both;
        }
        .eventos-tips .icono {
          width: 44px;
          height: 44px;
          margin-right: 0.8rem;
        }
        @media (max-width: 900px) {
          .eventos-tips { flex-direction: column; gap: 1.2rem; }
        }
      `}</style>
      <div className="banner-animado">
        ¡Bienvenido a Sololá! Vive la magia del Lago de Atitlán, su cultura y naturaleza maya.
      </div>
      {/* Eliminado clima duplicado, solo queda el bloque flex con clima e historia */}
      {/* Clima y botón historia juntos en flex */}
      <div style={{ display: 'flex', gap: '2.2rem', justifyContent: 'center', alignItems: 'stretch', flexWrap: 'wrap', marginBottom: '2.2rem' }}>
        <div className="clima-animado">
          <svg className="icono" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="20" fill="#ffe082"/>
            <ellipse cx="32" cy="48" rx="18" ry="7" fill="#b3e5fc"/>
            <ellipse cx="44" cy="44" rx="7" ry="3" fill="#b2ebf2"/>
            <ellipse cx="24" cy="46" rx="6" ry="2.5" fill="#b2ebf2"/>
            <ellipse cx="38" cy="40" rx="4" ry="1.5" fill="#fffde7"/>
          </svg>
          <div>
            <div className="lugar">Clima actual en Sololá</div>
            <span className="temp">21°C</span>
            <span className="desc">&nbsp;Soleado con nubes | Pronóstico: 21-24°C, brisa del lago</span>
          </div>
        </div>
        <a href="/historia" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 220,
          maxWidth: 320,
          background: 'linear-gradient(120deg, #fffde7 60%, #e1f5fe 100%)',
          borderRadius: 22,
          boxShadow: '0 4px 24px #b2ebf233',
          padding: '2.2rem 1.5rem',
          fontWeight: 700,
          fontSize: '1.25rem',
          color: '#234e70',
          textDecoration: 'none',
          border: '2px solid #4dd0e1',
          transition: 'transform 0.18s, box-shadow 0.18s',
          cursor: 'pointer',
          textAlign: 'center',
        }}
        className="historia-float"
        >
          <span style={{ fontSize: 60, marginBottom: 18, display: 'block' }}>📖</span>
          ¿Quieres conocer la historia de Sololá?
          <span style={{ fontSize: 19, marginTop: 10, color: '#1976d2', fontWeight: 600, letterSpacing: 0.5 }}>Click acá</span>
        </a>
      </div>
      <div className="eventos-tips">
        <div style={{display:'flex',alignItems:'center'}}>
          <svg className="icono" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" fill="#ffd54f"/><path d="M24 14v10l7 4" stroke="#fbc02d" strokeWidth="3" strokeLinecap="round"/></svg>
          <div>
            <b>Próximo evento:</b> Festival de la Cultura Maya (Agosto) – Música, danzas y gastronomía típica.<br/>
            <b>Tip:</b> Sube al mirador de San Jorge para la mejor vista del lago al amanecer.
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center'}}>
          <svg className="icono" viewBox="0 0 48 48" fill="none"><rect x="8" y="16" width="32" height="20" rx="6" fill="#4dd0e1"/><circle cx="24" cy="26" r="6" fill="#fff"/><rect x="20" y="22" width="8" height="8" rx="4" fill="#4dd0e1"/></svg>
          <div>
            <b>Dato curioso:</b> El Lago de Atitlán es uno de los más profundos de Centroamérica y cambia de color según la luz del día.<br/>
            <b>Recomendación:</b> Prueba los textiles artesanales en el mercado de Sololá, ¡son únicos!
          </div>
        </div>
      </div>
      <h1 style={{
        fontSize: '3.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1a237e',
        marginBottom: '2.5rem',
        textShadow: '2px 2px 12px #b2ebf2'
      }}>
        Sololá, Corazón del Lago de Atitlán
      </h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '2.5rem',
          alignItems: 'stretch',
          justifyContent: 'center',
          marginBottom: '2.5rem',
          width: '100%',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            flex: '2 1 700px',
            minWidth: '400px',
            maxWidth: '900px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            src={lakeImages[current]}
            alt="Lago de Atitlán"
            width={900}
            height={600}
            style={{
              borderRadius: '32px',
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              boxShadow: '0 8px 48px rgba(26,188,156,0.22)',
              transition: 'box-shadow 0.3s',
              minHeight: '340px',
              maxHeight: '600px',
            }}
            priority
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '32px',
              background:
                'linear-gradient(120deg, rgba(26,188,156,0.22) 0%, rgba(52,152,219,0.22) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>
        <section
          style={{
            flex: '1 1 420px',
            minWidth: '320px',
            maxWidth: '520px',
            fontSize: '1.5rem',
            color: '#263238',
            textAlign: 'justify',
            background: 'rgba(255,255,255,0.97)',
            borderRadius: '20px',
            padding: '2.5rem',
            fontFamily: 'Poppins, Arial, sans-serif',
            boxShadow: '0 2px 24px rgba(52,152,219,0.13)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            alignSelf: 'stretch',
          }}
        >
          <h2
            style={{
              color: '#1abc9c',
              fontWeight: 'bold',
              fontSize: '2.2rem',
              marginBottom: '1.2rem',
              fontFamily: 'inherit',
            }}
          >
            Descubre Sololá
          </h2>
          <p>
            Sololá es un destino turístico único en Guatemala, famoso por su impresionante Lago de Atitlán, rodeado de volcanes y pueblos mayas llenos de historia y color. Sus habitantes conservan tradiciones ancestrales, celebraciones y una cultura vibrante que se refleja en su vestimenta, gastronomía y arte.
          </p>
          <p>
            La economía local gira en torno a la agricultura, el turismo, la pesca y la elaboración de artesanías. Sololá es también un lugar de encuentro para quienes buscan aventura, naturaleza y experiencias auténticas.
          </p>
        </section>
      </div>
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2.5rem',
        alignItems: 'center',
        width: '100%',
        marginBottom: '2.5rem',
      }}>
        <style>{`
          .modulo-turismo {
            width: 100%;
            max-width: 900px;
            min-height: 340px;
            background: white;
            border-radius: 28px;
            padding: 2.7rem 2.2rem 2.2rem 2.2rem;
            margin: 0 auto;
            box-shadow: 0 4px 32px rgba(26,188,156,0.10);
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s;
            font-size: 1.35rem;
            font-family: 'Poppins', Arial, sans-serif;
          }
          .modulo-turismo:hover {
            transform: scale(1.045);
            box-shadow: 0 8px 48px rgba(26,188,156,0.18);
            z-index: 2;
          }
          .modulo-turismo h3 {
            font-size: 2.1rem;
            font-weight: bold;
            margin-bottom: 1.1rem;
          }
          .modulo-turismo p, .modulo-turismo ul {
            font-size: 1.25rem;
            color: #34495e;
            text-align: center;
          }
        @media (max-width: 900px) {
          .eventos-tips { flex-direction: column; gap: 1.2rem; }
          .historia-float { position: static !important; margin: 1.5rem auto 0 auto !important; display: flex; }
        }
        .historia-float:hover {
          transform: scale(1.04);
          box-shadow: 0 8px 32px #4dd0e155;
        }
              font-size: 1.08rem;
            }
            .modulo-turismo h3 {
              font-size: 1.3rem;
            }
          }
        `}</style>
        <div className="modulo-turismo" style={{ background: 'rgba(26,188,156,0.12)' }}>
          <Image src="/textiles.jpg" alt="Textiles en Sololá" width={540} height={260} style={{ borderRadius: '18px', marginBottom: '1.2rem', objectFit: 'cover', width: '100%', maxWidth: '540px' }} />
          <h3 style={{ color: '#16a085' }}>Artesanías y Textiles</h3>
          <p>
            Mujeres y niños elaboran coloridos textiles y artesanías, preservando técnicas mayas y compartiendo su arte con el mundo. Los mercados de Sololá son famosos por sus tejidos y bordados únicos.
          </p>
        </div>
        <div className="modulo-turismo" style={{ background: 'rgba(255,193,7,0.13)' }}>
          <Image src="/agricultura.jpg" alt="Agricultura en Sololá" width={540} height={260} style={{ borderRadius: '18px', marginBottom: '1.2rem', objectFit: 'cover', width: '100%', maxWidth: '540px' }} />
          <h3 style={{ color: '#f39c12' }}>Agricultura y Pesca</h3>
          <p>
            La agricultura y la pesca artesanal son pilares de la economía local, con cultivos de maíz, café, frutas y verduras frescas. El Lago de Atitlán es fuente de vida y sustento para muchas familias.
          </p>
        </div>
        <div className="modulo-turismo" style={{ background: 'rgba(52,152,219,0.13)' }}>
          <Image src="/habitantes.jpg" alt="Habitantes de Sololá" width={540} height={260} style={{ borderRadius: '18px', marginBottom: '1.2rem', objectFit: 'cover', width: '100%', maxWidth: '540px' }} />
          <h3 style={{ color: '#2980b9' }}>Datos de Sololá</h3>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', textAlign: 'left' }}>
            <li>Habitantes: ~421,583 (2023)</li>
            <li>Idiomas: Kaqchikel, Tz’utujil, K’iche’ y español</li>
            <li>Altitud: 2,114 msnm</li>
            <li>Municipios: 19</li>
          </ul>
        </div>
        <div className="modulo-turismo" style={{ background: 'rgba(233,30,99,0.10)' }}>
          <Image src="/rostro.jpg" alt="Historia y leyendas" width={540} height={260} style={{ borderRadius: '18px', marginBottom: '1.2rem', objectFit: 'cover', width: '100%', maxWidth: '540px' }} />
          <h3 style={{ color: '#e91e63' }}>Historias y Leyendas</h3>
          <p>
            El &quot;Rostro Maya&quot; es una formación montañosa que, según la leyenda local, protege el lago y sus pueblos. Sololá está lleno de historias ancestrales y tradiciones vivas.
          </p>
        </div>
      </section>
      <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
        <Link href="/attractions/solola">
          <button
            style={{
              background: 'linear-gradient(90deg, #1abc9c 0%, #3498db 100%)',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '2rem',
              border: 'none',
              borderRadius: '18px',
              padding: '1.5rem 4rem',
              cursor: 'pointer',
              boxShadow: '0 6px 32px rgba(52,152,219,0.18)',
              transition: 'background 0.3s, transform 0.2s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1.2rem',
              fontFamily: 'Montserrat, Poppins, Arial, sans-serif',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" style={{verticalAlign:'middle'}}>
              <circle cx="19" cy="19" r="19" fill="#1abc9c"/>
              <path d="M12 19h14M19 12l7 7-7 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Conocer los lugares turísticos de Sololá
          </button>
        </Link>
      </div>
    </main>
  );
}
