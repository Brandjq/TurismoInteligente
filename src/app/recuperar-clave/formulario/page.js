"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function RecuperarClaveFormulario() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Seguridad de la contraseña
  const getStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };
  const strength = getStrength(password);
  const strengthText = strength <= 2 ? 'Débil' : strength === 3 ? 'Media' : 'Fuerte';
  const strengthColor = strength <= 2 ? '#e53e3e' : strength === 3 ? '#f6ad55' : '#38a169';

  const isStrong = strength >= 4;

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!isStrong) {
      setError('La contraseña debe tener mínimo 8 caracteres, mayúscula, minúscula, número y símbolo.');
      return;
    }
    if (password !== confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    setLoading(true);
    const res = await fetch('/api/auth/recuperar-clave', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (res.ok) {
      setSuccess('Contraseña actualizada correctamente. Ahora puedes iniciar sesión.');
    } else {
      setError(await res.text());
    }
  };

  return (
    <div style={{ maxWidth: 440, margin: '50px auto', padding: 32, boxShadow: '0 0 16px #eee', borderRadius: 16, background: '#fff', position: 'relative' }}>
      {success && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #fff 80%, #e6fffa 100%)',
            borderRadius: '22px',
            boxShadow: '0 6px 36px #0003',
            padding: '2.5rem 2.5rem 2rem 2.5rem',
            minWidth: 320,
            maxWidth: 380,
            textAlign: 'center',
            border: '2px solid #3182ce'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#234e70', marginBottom: '1.2rem' }}>¡Cambio realizado!</h2>
            <div style={{ fontSize: '1.15rem', color: '#234e70', fontWeight: 600, marginBottom: '0.5rem' }}>
              Tu contraseña fue actualizada correctamente.
            </div>
            <div style={{ fontSize: '1rem', color: '#38b2ac' }}>Serás redirigido al login...</div>
          </div>
        </div>
      )}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ position: 'relative', width: 200, height: 200, margin: '0 auto' }}>
          <Image src="/logo.jpg" alt="Logo Turismo" fill style={{ objectFit: 'contain' }} />
        </div>
        <h2 style={{ marginTop: 24, fontSize: '2.1rem', fontWeight: 800 }}>Recuperar Contraseña</h2>
        <p style={{ marginTop: 10, fontSize: '1.1rem', color: '#234e70' }}>Ingresa tu correo y la nueva clave para actualizarla.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label style={{ fontWeight: 600 }}>Correo registrado</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', marginBottom: 16, padding: 10, borderRadius: 8, border: '1.5px solid #3182ce', fontSize: '1.1rem' }} required />
        <label style={{ fontWeight: 600 }}>Nueva clave</label>
        <div style={{ position: 'relative', marginBottom: 8 }}>
          <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #3182ce', fontSize: '1.1rem' }} required />
          <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} aria-label={showPassword ? 'Ocultar clave' : 'Mostrar clave'}>
            {showPassword ? (
              <svg width="22" height="22" fill="none" stroke="#234e70" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
            ) : (
              <svg width="22" height="22" fill="none" stroke="#234e70" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.07 21.07 0 0 1 5.06-7.06"/><path d="M1 1l22 22"/></svg>
            )}
          </button>
        </div>
        <div style={{ height: 8, width: '100%', background: '#eee', borderRadius: 4, marginBottom: 4 }}>
          <div style={{ width: `${strength * 20}%`, height: '100%', background: strengthColor, borderRadius: 4, transition: 'width 0.3s' }}></div>
        </div>
        <div style={{ fontSize: 14, color: strengthColor, marginBottom: 12, fontWeight: 600 }}>{strengthText}</div>
        <label style={{ fontWeight: 600 }}>Confirmar clave</label>
        <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} style={{ width: '100%', marginBottom: 16, padding: 10, borderRadius: 8, border: '1.5px solid #3182ce', fontSize: '1.1rem' }} required />
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: 12 }}>{success}</div>}
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 12, background: '#007bff', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '1.15rem', marginTop: 8 }}>
          Actualizar Contraseña
        </button>
      </form>
    </div>
  );
}
