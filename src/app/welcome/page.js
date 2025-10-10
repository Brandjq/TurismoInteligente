// app/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HomePage() {
  // Ocultar navbar en esta página
  if (typeof window !== "undefined") {
    const navbar = document.querySelector(".navbar");
    if (navbar) navbar.style.display = "none";
  }
  // Imágenes para el carrusel
    // Selección de imágenes bonitas y representativas para el carrusel
    const carouselImages = [
      "atitlan.jpg", "mirador-atitlan.jpg", "volcan.jpg", "palopo.jpg", "san-antonio-palopo.jpg", "san-pedro-la-laguna.jpg", "sanmarcos.jpg", "santa-cruz-la-laguna.jpg", "santiago-atitlan.jpg", "azotea.jpg", "artes.jpg", "iglesia.jpg", "lacustre.jpg", "lago.jpg", "yatch.jpg"
    ];
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-600 to-blue-300 text-white px-6 relative overflow-hidden">
      {/* Carrusel de imágenes reales en la parte superior */}
      <div style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        width: '100vw',
        background: 'linear-gradient(180deg, #2563eb22 0%, #fff0 100%)',
        padding: '1.2rem 0'
      }}>
        <div style={{
          display: 'flex',
          gap: '2vw',
          animation: 'carousel-move 32s linear infinite',
          alignItems: 'center',
          width: 'max-content',
          margin: '0 auto'
        }}>
          {carouselImages.map((img, idx) => (
            <img
              key={img}
              src={`/${img}`}
              alt={img.replace('.jpg','')}
              style={{ width: '220px', height: '140px', objectFit: 'cover', borderRadius: '2rem', boxShadow: '0 4px 24px #2563eb22', background: '#fff' }}
            />
          ))}
        </div>
        <style>{`
          @keyframes carousel-move {
            0% { transform: translateX(0); }
            100% { transform: translateX(-40vw); }
          }
        `}</style>
      </div>
      {/* Fondo animado difuminado */}
      {/* Botones de iniciar sesión y registrarse fijos al final de la página */}
      <div style={{
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        gap: '1.2rem',
        padding: '1.2rem 0',
        background: 'linear-gradient(180deg, #2563eb22 0%, #fff0 100%)'
      }}>
        <a href="/login" style={{ textDecoration: 'none' }}>
          <button
            style={{
              background: 'linear-gradient(90deg, #1abc9c 0%, #3498db 100%)',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1.25rem',
              border: 'none',
              borderRadius: '14px',
              padding: '0.7rem 1.8rem',
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(52,152,219,0.18)',
              transition: 'background 0.3s, transform 0.2s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.7rem',
              fontFamily: 'Montserrat, Poppins, Arial, sans-serif',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {/* Icono login: puerta con flecha */}
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={{verticalAlign:'middle'}}>
              <rect x="3" y="3" width="13" height="18" rx="2" stroke="#fff" strokeWidth="2"/>
              <path d="M16 12h5m-2-2 2 2-2 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Iniciar Sesión
          </button>
        </a>
        <a href="/register" style={{ textDecoration: 'none' }}>
          <button
            style={{
              background: 'linear-gradient(90deg, #1abc9c 0%, #3498db 100%)',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1.25rem',
              border: 'none',
              borderRadius: '14px',
              padding: '0.7rem 1.8rem',
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(52,152,219,0.18)',
              transition: 'background 0.3s, transform 0.2s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.7rem',
              fontFamily: 'Montserrat, Poppins, Arial, sans-serif',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {/* Icono registro: usuario con + */}
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={{verticalAlign:'middle'}}>
              <circle cx="10" cy="10" r="4" stroke="#fff" strokeWidth="2"/>
              <path d="M2 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="19" cy="7" r="2" stroke="#fff" strokeWidth="2"/>
              <path d="M19 9v2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              <path d="M21 7h-2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Registrarse
          </button>
        </a>
      </div>
      {/* Fondo animado difuminado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.18 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <div className="w-full h-full bg-gradient-to-tr from-blue-400 via-blue-700 to-blue-900 blur-3xl opacity-80 animate-pulse" />
        {/* Gifs decorativos en las esquinas */}
        <img src="/fly.jpg" alt="Gif decorativo" className="absolute top-8 left-8 w-40 h-40 rounded-2xl shadow-2xl opacity-60 animate-bounce" />
        <img src="/yoga.jpg" alt="Gif decorativo" className="absolute bottom-8 right-8 w-40 h-40 rounded-2xl shadow-2xl opacity-60 animate-bounce" />
      </motion.div>

      {/* Fondo decorativo con gif (ej: partículas, olas, etc.) */}
      <div className="absolute bottom-0 left-0 right-0 z-0 opacity-30">
        <Image
          src="/fondo.gif"
          alt="Decoración animada"
          width={1800}
          height={600}
          className="w-full object-cover"
          priority
        />
      </div>

      {/* Contenido central con margen superior e inferior para no tapar el texto ni el carrusel */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1.08, opacity: 1 }}
        transition={{ duration: 1 }}
        className="z-10 flex flex-col items-center text-center"
        style={{ marginTop: '12rem', marginBottom: '8rem', width: '100%' }}
      >
        {/* Logo grande con sombra y fondo suave */}
        <div
          style={{
            background: 'linear-gradient(135deg, #e0f7fa 60%, #fff 100%)',
            borderRadius: '38px',
            boxShadow: '0 12px 64px #2563eb33',
            padding: '3.5rem 2.5rem 2.5rem 2.5rem',
            marginBottom: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 700,
            width: '100%',
            margin: '0 auto 2.5rem auto'
          }}
        >
          <Image
            src="/logo.jpg"
            alt="Logo Turismo Inteligente Sololá"
            width={320}
            height={320}
            className="rounded-3xl shadow-2xl"
            priority
            style={{
              borderRadius: '38px',
              boxShadow: '0 8px 48px #1abc9c33, 0 4px 24px #2563eb22',
              marginBottom: '2.2rem',
              background: '#fff'
            }}
          />
          <div style={{
            fontSize: '3.2rem',
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #1abc9c 0%, #2563eb 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.12em',
            fontFamily: 'Montserrat, Poppins, Arial, sans-serif',
            textShadow: '0 4px 24px #1abc9c55, 0 2px 8px #2563eb33',
            marginBottom: '1.2rem',
            lineHeight: 1.1
          }}>
            Turismo Inteligente Sololá
          </div>
          <div style={{
            fontSize: '1.7rem',
            color: '#1976d2',
            fontWeight: 700,
            marginBottom: '1.2rem',
            textShadow: '0 2px 12px #1abc9c22'
          }}>
            ¡Explora, descubre y vive la magia de Sololá!
          </div>
          <div style={{
            fontSize: '1.18rem',
            color: '#334155',
            marginBottom: '0.5rem',
            lineHeight: 1.7,
            fontWeight: 500
          }}>
            <b>¿Qué puedes hacer aquí?</b>
            <ul style={{textAlign:'left', margin:'1.2rem auto 0 auto', maxWidth:420, color:'#2563eb', fontSize:'1.18rem', lineHeight:1.8, fontWeight:500}}>
              <li>🌄 Descubre rutas turísticas personalizadas</li>
              <li>🏨 Encuentra hoteles y hospedajes únicos</li>
              <li>🍽️ Conoce la mejor gastronomía local</li>
              <li>🗺️ Explora mapas interactivos y recomendaciones</li>
              <li>⭐ Guarda tus lugares y rutas favoritas</li>
              <li>📲 Vive una experiencia digital y segura</li>
            </ul>
          </div>
        </div>

        {/* Video atractivo de bienvenida (opcional, recomendado para impacto visual) */}
        <div style={{
          width: '100%',
          maxWidth: 900,
          margin: '0 auto 2.5rem auto',
          borderRadius: '32px',
          overflow: 'hidden',
          boxShadow: '0 8px 48px #2563eb33',
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <video
            src="https://res.cloudinary.com/dy0agrote/video/upload/v1760058676/Lago_Atitl%C3%A1n_Panajachel_Solol%C3%A1_-_Guatemala_d3hx8d.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="/mirador-atitlan.jpg"
            style={{
              width: '100%',
              height: '100%',
              maxHeight: 420,
              objectFit: 'cover',
              borderRadius: '32px',
              background: '#000'
            }}
          />
        </div>

        {/* Galería de imágenes atractivas de Sololá */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          justifyContent: 'center',
          marginBottom: '2.5rem',
          width: '100%'
        }}>
          <Image src="/mirador-atitlan.jpg" alt="Mirador Atitlán" width={260} height={160} style={{borderRadius:18, boxShadow:'0 2px 16px #2563eb22', objectFit:'cover', width: '260px', height: '160px'}} />
          <Image src="/san-pedro-la-laguna.jpg" alt="San Pedro La Laguna" width={260} height={160} style={{borderRadius:18, boxShadow:'0 2px 16px #2563eb22', objectFit:'cover', width: '260px', height: '160px'}} />
          <Image src="/santiago-atitlan.jpg" alt="Santiago Atitlán" width={260} height={160} style={{borderRadius:18, boxShadow:'0 2px 16px #2563eb22', objectFit:'cover', width: '260px', height: '160px'}} />
          <Image src="/palopo.jpg" alt="Santa Catarina Palopó" width={260} height={160} style={{borderRadius:18, boxShadow:'0 2px 16px #2563eb22', objectFit:'cover', width: '260px', height: '160px'}} />
        </div>

        {/* Frase motivacional y llamada a la acción */}
        <div style={{
          fontSize: '1.35rem',
          color: '#1abc9c',
          fontWeight: 700,
          marginBottom: '1.5rem',
          textShadow: '0 2px 8px #2563eb22'
        }}>
          “Sololá te espera con paisajes de ensueño, cultura viva y experiencias inolvidables.”
        </div>
        <div style={{
          fontSize: '1.08rem',
          color: '#334155',
          marginBottom: '2.5rem'
        }}>
          <b>¡Regístrate o inicia sesión para comenzar tu aventura!</b>
        </div>
      </motion.div>
    </main>
  );
}
