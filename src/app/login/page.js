"use client";
import { useState } from 'react';
import Image from 'next/image';

import { useEffect } from 'react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        window.location.href = "/";
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Error de login");
    } else {
      setShowWelcome(true);
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(120deg, #e0e7ff 0%, #f0fff4 100%)",
      position: "relative"
    }}>
      {showWelcome && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999
        }}>
          <div style={{
            background: "linear-gradient(135deg, #fff 80%, #e6fffa 100%)",
            borderRadius: "22px",
            boxShadow: "0 6px 36px #0003",
            padding: "2.5rem 2.5rem 2rem 2.5rem",
            minWidth: 320,
            maxWidth: 380,
            textAlign: "center",
            border: "2px solid #3182ce"
          }}>
            <h2 style={{
              fontSize: "2rem",
              fontWeight: 800,
              color: "#234e70",
              marginBottom: "1.2rem"
            }}>¡Bienvenido!</h2>
            <div style={{
              fontSize: "1.15rem",
              color: "#234e70",
              fontWeight: 600,
              marginBottom: "0.5rem"
            }}>
              Al sistema web de <span style={{color: "#3182ce", fontWeight: 700}}>Turismo Inteligente</span>
            </div>
            <div style={{fontSize: "1rem", color: "#38b2ac"}}>Acceso exitoso</div>
          </div>
        </div>
      )}
      <style>{`.navbar, .navigation, nav { display: none !important; }`}</style>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "linear-gradient(135deg, #fff 80%, #e6fffa 100%)",
          padding: "2.5rem 2.2rem 2rem 2.2rem",
          borderRadius: "28px",
          boxShadow: "0 6px 36px #0002",
          width: "100%",
          maxWidth: 420,
          minWidth: 0,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
          <div style={{
            marginBottom: "1.5rem",
            position: "relative",
            width: "210px",
            height: "210px"
          }}>
            <Image
              src="/logo.jpg"
              alt="Logo"
              fill
              style={{
                objectFit: "contain"
              }}
            />
          </div>
        <h2 style={{
          fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
          fontWeight: 800,
          textAlign: "center",
          marginBottom: "2.2rem",
          letterSpacing: 1,
          color: "#234e70",
          textShadow: "0 2px 12px #0001",
        }}>Iniciar sesión</h2>
        <div style={{width:'100%',display:'flex',flexDirection:'column',gap:'1.2rem',marginBottom:'1.2rem'}}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "0.9rem",
              borderRadius: "12px",
              border: "1.5px solid #3182ce",
              fontSize: "1.1rem",
              outline: "none",
              boxShadow: "0 2px 8px #3182ce22",
            }}
            required
          />
        </div>
        <div style={{position:'relative',width:'100%'}}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "0.9rem",
              marginBottom: "1.2rem",
              borderRadius: "12px",
              border: "1.5px solid #3182ce",
              fontSize: "1.1rem",
              outline: "none",
              boxShadow: "0 2px 8px #3182ce22",
            }}
            required
          />
          <button type="button" onClick={()=>setShowPassword(!showPassword)} style={{position:'absolute',right:'18px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',padding:0}} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
            {showPassword ? (
              <svg width="22" height="22" fill="none" stroke="#234e70" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
            ) : (
              <svg width="22" height="22" fill="none" stroke="#234e70" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.07 21.07 0 0 1 5.06-7.06"/><path d="M1 1l22 22"/></svg>
            )}
          </button>
        </div>
        {error && (
          <div style={{ color: "#e53e3e", marginBottom: "1rem", fontWeight: 600 }}>{error}</div>
        )}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <a href="/recuperar-clave/formulario" style={{ color: '#007bff', textDecoration: 'underline' }}>
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            background: "linear-gradient(90deg, #3182ce 60%, #38b2ac 100%)",
            color: "#fff",
            padding: "1rem",
            borderRadius: "12px",
            fontWeight: 700,
            fontSize: "1.15rem",
            boxShadow: "0 2px 12px #3182ce22",
            border: "none",
            marginTop: "0.5rem",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.2s",
          }}
          disabled={loading}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
