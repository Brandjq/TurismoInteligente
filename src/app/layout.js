"use client";
import React, { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from 'next/navigation';
const navIcons = {
  inicio: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'middle',marginRight:8}}><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ),
  recomendaciones: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'middle',marginRight:8}}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  ),
  rutas: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'middle',marginRight:8}}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  hoteles: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'middle',marginRight:8}}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V3h8v4"/></svg>
  ),
  calificaciones: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'middle',marginRight:8}}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 10h8"/><path d="M8 14h6"/></svg>
  ),
};
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideNavbarRoutes = ['/recuperar-clave', '/login', '/cambiar-contraseña'];
  const hideNavbar = hideNavbarRoutes.includes(pathname);
  // Responsive navbar state
  const [menuOpen, setMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    // Leer email de la cookie 'session'
    const match = document.cookie.match(/session=([^;]+)/);
    if (match) {
      try {
        const session = JSON.parse(decodeURIComponent(match[1]));
        setUserEmail(session.email || "");
      } catch {}
    }
  }, []);
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {!hideNavbar && (
          <>
            {/* Botón regresar flotante global, solo icono */}
            <div style={{ position: 'fixed', top: 24, left: 24, zIndex: 5000 }}>
              <Link href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, background: 'linear-gradient(90deg, #3182ce 60%, #38b2ac 100%)', borderRadius: '50%', boxShadow: '0 2px 12px #3182ce22', textDecoration: 'none', border: 'none', transition: 'background 0.2s', }} aria-label="Regresar">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              </Link>
            </div>
            <header className="navbar" style={{ background: 'linear-gradient(90deg, #3182ce 60%, #38b2ac 100%)', boxShadow: '0 2px 16px #3182ce22', padding: '0.5rem 0', borderRadius: '0 0 18px 18px', position: 'relative' }}>
              <nav className="menu-bar" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '54px',
                position: 'relative',
                padding: '0 1.2rem',
              }}>
                {/* Menú hamburguesa solo en móvil */}
                <button className="menu-toggle" aria-label="Abrir menú" style={{ background: 'none', border: 'none', position: 'absolute', right: 18, top: 10, zIndex: 100, cursor: 'pointer', display: 'none' }} onClick={() => setMenuOpen(!menuOpen)}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                </button>
                {menuOpen && (
                  <ul className="menu-dropdown" style={{
                    position: 'absolute',
                    top: '44px',
                    right: '0',
                    background: 'linear-gradient(90deg, #3182ce 60%, #38b2ac 100%)',
                    color: '#fff',
                    boxShadow: '0 2px 16px #3182ce44',
                    borderRadius: '0.75rem',
                    padding: '1rem 1.2rem',
                    minWidth: '220px',
                    zIndex: 9999,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.2rem',
                    fontSize: '1.15rem',
                    fontWeight: 'bold',
                    alignItems: 'center',
                  }}>
                    <li><Link href="/" className="nav-link" style={{color:'#fff',display:'flex',alignItems:'center',gap:'0.5em'}}>{navIcons.inicio}Inicio</Link></li>
                    <li><Link href="/recomendaciones" className="nav-link" style={{color:'#fff',display:'flex',alignItems:'center',gap:'0.5em'}}>{navIcons.recomendaciones}Recomendaciones</Link></li>
                    <li><Link href="/rutas" className="nav-link" style={{color:'#fff',display:'flex',alignItems:'center',gap:'0.5em'}}>{navIcons.rutas}Generación de rutas</Link></li>
                    <li><Link href="/hoteles" className="nav-link" style={{color:'#fff',display:'flex',alignItems:'center',gap:'0.5em'}}>{navIcons.hoteles}Hoteles</Link></li>
                    <li><Link href="/contacto" className="nav-link" style={{color:'#fff',display:'flex',alignItems:'center',gap:'0.5em'}}>{navIcons.calificaciones}Calificaciones</Link></li>
                    {userEmail && (
                      <li style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',gap:'0.7rem',marginTop:'0.7rem'}}>
                        <button
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '1.05rem',
                            cursor: 'pointer',
                            padding: '0.2rem 0.7rem',
                            borderRadius: '16px',
                            boxShadow: '0 2px 8px #3182ce22',
                            transition: 'background 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            minWidth: '0',
                            maxWidth: '220px',
                            marginBottom: '0.5rem',
                          }}
                          onClick={() => setUserMenuOpen(!userMenuOpen)}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'middle',marginRight:2}}><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/></svg>
                          <span style={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:'160px'}}>{userEmail}</span>
                        </button>
                        {userMenuOpen && (
                          <div style={{
                            position: 'static',
                            background: '#fff',
                            color: '#234e70',
                            borderRadius: '12px',
                            boxShadow: '0 2px 16px #3182ce44',
                            padding: '0.8rem 1.2rem',
                            minWidth: '160px',
                            zIndex: 9999,
                            fontWeight: 600,
                            fontSize: '1rem',
                            marginTop: '0.5rem',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.7rem',
                          }}>
                            <button
                              style={{
                                background: '#f7fafc',
                                color: '#234e70',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '0.6rem 1.2rem',
                                fontWeight: 700,
                                fontSize: '1rem',
                                cursor: 'pointer',
                                width: '100%',
                                marginBottom: '0.7rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.7rem',
                              }}
                              onClick={() => {
                                window.location.href = '/configuraciones';
                              }}
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#234e70" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'middle'}}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09c.7 0 1.31-.4 1.51-1a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09c.7 0 1.31-.4 1.51-1V3a2 2 0 0 1 4 0v.09c0 .7.4 1.31 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09c0 .7.4 1.31 1 1.51H21a2 2 0 0 1 0 4h-.09c-.7 0-1.31.4-1.51 1z"/></svg>
                              Configuraciones
                            </button>
                            <button
                              style={{
                                background: 'linear-gradient(90deg, #3182ce 60%, #38b2ac 100%)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '0.6rem 1.2rem',
                                fontWeight: 700,
                                fontSize: '1rem',
                                cursor: 'pointer',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.7rem',
                              }}
                              onClick={() => {
                                document.cookie = 'session=; Max-Age=0; path=/';
                                window.location.href = '/welcome';
                              }}
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'middle'}}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                              Cerrar sesión
                            </button>
                          </div>
                        )}
                      </li>
                    )}
                  </ul>
                )}
                {/* Menú horizontal solo en escritorio */}
                <ul className="menu desktop-menu" style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0, flexDirection: 'row', alignItems: 'center' }}>
                  <li style={{position:'relative'}}><Link href="/" className="nav-link" style={{display:'flex',alignItems:'center',gap:'0.4em',fontSize:'1.01rem',fontWeight:600,letterSpacing:'.01em',padding:'0.2em 0.7em',borderRadius:'8px',transition:'background 0.2s',color:'#fff',textShadow:'0 1px 6px #234e7011'}}> {navIcons.inicio}<span style={{fontSize:'1rem',fontWeight:600}}>Inicio</span></Link></li>
                  <li style={{position:'relative'}}><Link href="/recomendaciones" className="nav-link" style={{display:'flex',alignItems:'center',gap:'0.4em',fontSize:'1.01rem',fontWeight:600,letterSpacing:'.01em',padding:'0.2em 0.7em',borderRadius:'8px',transition:'background 0.2s',color:'#fff',textShadow:'0 1px 6px #234e7011'}}> {navIcons.recomendaciones}<span style={{fontSize:'1rem',fontWeight:600}}>Recomendaciones</span></Link></li>
                  <li style={{position:'relative'}}><Link href="/rutas" className="nav-link" style={{display:'flex',alignItems:'center',gap:'0.4em',fontSize:'1.01rem',fontWeight:600,letterSpacing:'.01em',padding:'0.2em 0.7em',borderRadius:'8px',transition:'background 0.2s',color:'#fff',textShadow:'0 1px 6px #234e7011'}}> {navIcons.rutas}<span style={{fontSize:'1rem',fontWeight:600}}>Rutas</span></Link></li>
                  <li style={{position:'relative'}}><Link href="/hoteles" className="nav-link" style={{display:'flex',alignItems:'center',gap:'0.4em',fontSize:'1.01rem',fontWeight:600,letterSpacing:'.01em',padding:'0.2em 0.7em',borderRadius:'8px',transition:'background 0.2s',color:'#fff',textShadow:'0 1px 6px #234e7011'}}> {navIcons.hoteles}<span style={{fontSize:'1rem',fontWeight:600}}>Hoteles</span></Link></li>
                  <li style={{position:'relative'}}><Link href="/contacto" className="nav-link" style={{display:'flex',alignItems:'center',gap:'0.4em',fontSize:'1.01rem',fontWeight:600,letterSpacing:'.01em',padding:'0.2em 0.7em',borderRadius:'8px',transition:'background 0.2s',color:'#fff',textShadow:'0 1px 6px #234e7011'}}> {navIcons.calificaciones}<span style={{fontSize:'1rem',fontWeight:600}}>Calificaciones</span></Link></li>
                  {userEmail && (
                    <li style={{position:'relative', marginLeft:'1rem', display:'flex', alignItems:'center'}}>
                      <button
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: '1.05rem',
                          cursor: 'pointer',
                          padding: '0.2rem 0.7rem',
                          borderRadius: '16px',
                          boxShadow: '0 2px 8px #3182ce22',
                          transition: 'background 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          minWidth: '0',
                          maxWidth: '220px',
                        }}
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'middle',marginRight:2}}><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/></svg>
                        <span style={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:'160px'}}>{userEmail}</span>
                      </button>
                      {userMenuOpen && (
                        <div style={{
                          position: 'absolute',
                          right: 0,
                          top: '2.5rem',
                          background: '#fff',
                          color: '#234e70',
                          borderRadius: '12px',
                          boxShadow: '0 2px 16px #3182ce44',
                          padding: '0.8rem 1.2rem',
                          minWidth: '160px',
                          zIndex: 9999,
                          fontWeight: 600,
                          fontSize: '1rem',
                        }}>
                            <button
                              style={{
                                background: '#f7fafc',
                                color: '#234e70',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '0.6rem 1.2rem',
                                fontWeight: 700,
                                fontSize: '1rem',
                                cursor: 'pointer',
                                width: '100%',
                                marginBottom: '0.7rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.7rem',
                              }}
                              onClick={() => {
                                window.location.href = '/configuraciones';
                              }}
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#234e70" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'middle'}}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09c.7 0 1.31-.4 1.51-1a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09c.7 0 1.31-.4 1.51-1V3a2 2 0 0 1 4 0v.09c0 .7.4 1.31 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09c0 .7.4 1.31 1 1.51H21a2 2 0 0 1 0 4h-.09c-.7 0-1.31.4-1.51 1z"/></svg>
                              Configuraciones
                            </button>
                          <button
                            style={{
                              background: 'linear-gradient(90deg, #3182ce 60%, #38b2ac 100%)',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '0.6rem 1.2rem',
                              fontWeight: 700,
                              fontSize: '1rem',
                              cursor: 'pointer',
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.7rem',
                            }}
                            onClick={() => {
                              document.cookie = 'session=; Max-Age=0; path=/';
                              window.location.href = '/welcome';
                            }}
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'middle'}}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                            Cerrar sesión
                          </button>
                        </div>
                      )}
                    </li>
                  )}
                </ul>
              </nav>
            </header>
          </>
        )}
        <style>{`
          @media (max-width: 900px) {
            .desktop-menu {
              display: none !important;
            }
            .menu-toggle {
              display: block !important;
              position: absolute !important;
              right: 18px;
              top: 10px;
              z-index: 100;
            }
            .menu-dropdown {
              display: flex !important;
              flex-direction: column !important;
              align-items: center !important;
              position: absolute !important;
              top: 56px !important;
              right: 0 !important;
              left: 0 !important;
              width: 100% !important;
              min-width: unset !important;
              border-radius: 0 0 18px 18px !important;
              box-shadow: 0 2px 16px #3182ce44 !important;
              background: linear-gradient(90deg, #3182ce 60%, #38b2ac 100%) !important;
              padding: 1.2rem 0.5rem !important;
              z-index: 9999 !important;
            }
          }
          @media (min-width: 901px) {
            .menu-toggle {
              display: none !important;
            }
            .menu-dropdown {
              display: none !important;
              position: static !important;
              width: auto !important;
              left: unset !important;
              right: unset !important;
            }
            .desktop-menu {
              display: flex !important;
            }
          }
        `}</style>
        <main>{children}</main>
      </body>
    </html>
  );
}
