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
      <div style={{ position: 'fixed', left: 0, right: 0, top: 0, zIndex: 100, width: '100vw', background: 'linear-gradient(180deg, #2563eb22 0%, #fff0 100%)', padding: '1.2rem 0' }}>
        <div style={{ display: 'flex', gap: '2vw', animation: 'carousel-move 32s linear infinite', alignItems: 'center', width: 'max-content', margin: '0 auto' }}>
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
  {/* Fondo animado difuminado */}
  {/* Botones de iniciar sesión y registrarse fijos al final de la página, siempre visibles y clickeables */}
  <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 9999, display: 'flex', justifyContent: 'center', gap: '2rem', padding: '2rem 0', background: 'linear-gradient(180deg, #2563eb22 0%, #fff0 100%)' }}>
    <a href="/login" style={{ textDecoration: 'none' }}>
      <button
        style={{
          background: 'linear-gradient(90deg, #1abc9c 0%, #3498db 100%)',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '2rem',
          border: 'none',
          borderRadius: '18px',
          padding: '1.2rem 2.8rem',
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
        Iniciar Sesión
      </button>
    </a>
    <a href="/register" style={{ textDecoration: 'none' }}>
      <button
        style={{
          background: 'linear-gradient(90deg, #1abc9c 0%, #3498db 100%)',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '2rem',
          border: 'none',
          borderRadius: '18px',
          padding: '1.2rem 2.8rem',
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
        Registrarse
      </button>
    </a>
  </div>
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
        style={{ marginTop: '12rem', marginBottom: '8rem' }}
      >
        {/* Logo redondo gigante con borde animado y hover */}
        <motion.div
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.12, boxShadow: "0 0 40px #2563eb" }}
          className="mb-10 relative cursor-pointer"
        >
          <div className="absolute inset-0 rounded-full border-8 border-white animate-ping opacity-40" />
          <Image
            src="/logo.jpg"
            alt="Logo Turismo Inteligente Sololá"
            width={400}
            height={400}
            className="rounded-full shadow-2xl border-8 border-white"
            priority
          />
        </motion.div>

        {/* Título azul intenso y nítido, tamaño más pequeño y acorde al sistema, con hover animado */}
        <motion.h1
          initial={{ letterSpacing: "0.1em", opacity: 0 }}
          animate={{ letterSpacing: "0.18em", opacity: 1 }}
          transition={{ duration: 1.2 }}
          whileHover={{ scale: 1.08, color: "#1d4ed8" }}
          className="text-5xl md:text-6xl font-extrabold mb-6 text-blue-700 drop-shadow-[0_4px_24px_rgba(0,0,80,0.5)] animate-fade-in cursor-pointer transition-colors duration-300"
        >
          Turismo Inteligente Sololá
        </motion.h1>

        {/* Descripción azul y nítida, tamaño más pequeño */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-xl md:text-2xl mb-10 font-semibold text-blue-600 drop-shadow-[0_2px_8px_rgba(0,0,80,0.3)] max-w-3xl animate-fade-in"
        >
          Bienvenido al sistema de turismo inteligente. Explora rutas, descubre lugares y vive experiencias únicas en Sololá con la mejor tecnología a tu alcance.
        </motion.p>



      </motion.div>
    </main>
  );
}
