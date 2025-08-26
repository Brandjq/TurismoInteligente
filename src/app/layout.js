"use client";
import React, { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  // Responsive navbar state
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Botón regresar flotante global, solo icono */}
        <div style={{ position: 'fixed', top: 24, left: 24, zIndex: 5000 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, background: 'linear-gradient(90deg, #3182ce 60%, #38b2ac 100%)', borderRadius: '50%', boxShadow: '0 2px 12px #3182ce22', textDecoration: 'none', border: 'none', transition: 'background 0.2s', }} aria-label="Regresar">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </Link>
        </div>
        <header className="navbar" style={{ background: 'linear-gradient(90deg, #3182ce 60%, #38b2ac 100%)', boxShadow: '0 2px 16px #3182ce22', padding: '0.5rem 0', borderRadius: '0 0 18px 18px', position: 'relative' }}>
          <nav className="menu-bar" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '56px', position: 'relative' }}>
            {/* Hamburger button for mobile */}
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
                minWidth: '180px',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                fontSize: '1.15rem',
                fontWeight: 'bold',
                alignItems: 'flex-start',
              }}>
                <li><Link href="/" className="nav-link" style={{color:'#fff',display:'flex',alignItems:'center',gap:'0.5em'}}>{navIcons.inicio}Inicio</Link></li>
                <li><Link href="/recomendaciones" className="nav-link" style={{color:'#fff',display:'flex',alignItems:'center',gap:'0.5em'}}>{navIcons.recomendaciones}Recomendaciones</Link></li>
                <li><Link href="/rutas" className="nav-link" style={{color:'#fff',display:'flex',alignItems:'center',gap:'0.5em'}}>{navIcons.rutas}Generación de rutas</Link></li>
                <li><Link href="/hoteles" className="nav-link" style={{color:'#fff',display:'flex',alignItems:'center',gap:'0.5em'}}>{navIcons.hoteles}Hoteles</Link></li>
                <li><Link href="/contacto" className="nav-link" style={{color:'#fff',display:'flex',alignItems:'center',gap:'0.5em'}}>{navIcons.calificaciones}Calificaciones</Link></li>
              </ul>
            )}
            {/* Menú horizontal solo en escritorio */}
            <ul className="menu desktop-menu" style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0, flexDirection: 'row', alignItems: 'center' }}>
              <li style={{position:'relative'}}><Link href="/" className="nav-link">{navIcons.inicio}Inicio</Link></li>
              <li style={{position:'relative'}}><Link href="/recomendaciones" className="nav-link">{navIcons.recomendaciones}Recomendaciones</Link></li>
              <li style={{position:'relative'}}><Link href="/rutas" className="nav-link">{navIcons.rutas}Generación de rutas</Link></li>
              <li style={{position:'relative'}}><Link href="/hoteles" className="nav-link">{navIcons.hoteles}Hoteles</Link></li>
              <li style={{position:'relative'}}><Link href="/contacto" className="nav-link">{navIcons.calificaciones}Calificaciones</Link></li>
            </ul>
          </nav>
        </header>
        <style>{`
          @media (max-width: 900px) {
            .desktop-menu {
              display: none !important;
            }
            .menu-toggle {
              display: block !important;
            }
            .menu-dropdown {
              display: flex !important;
            }
          }
          @media (min-width: 901px) {
            .menu-toggle {
              display: none !important;
            }
            .menu-dropdown {
              display: none !important;
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
