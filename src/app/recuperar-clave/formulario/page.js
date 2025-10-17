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
    // Oculta la barra de navegación si existe
    const nav = document.querySelector('.navbar, .navigation, nav');
    if (nav) nav.style.display = 'none';
    return () => {
      if (nav) nav.style.display = '';
    };
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        window.location.href = '/login'; // Redirige al login después de 3 segundos
      }, 3000);
      return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
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
    try {
      const res = await fetch('/api/auth/recuperar-clave-nueva', { // Apunta al nuevo endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorMessage = await res.json();
        throw new Error(errorMessage.error || 'Error al actualizar la contraseña.');
      }

      setSuccess('Contraseña actualizada correctamente. Ahora puedes iniciar sesión.');
    } catch (err) {
      setError(err.message || 'Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`.navbar, .navigation, nav { display: none !important; }`}</style>
      {success && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: '#fff',
            padding: '20px 30px',
            borderRadius: '10px',
            textAlign: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
          }}>
            <h2 style={{ color: '#38a169', marginBottom: '10px' }}>¡Éxito!</h2>
            <p style={{ marginBottom: '10px' }}>{success}</p>
            <p style={{ fontSize: '14px', color: '#555' }}>Serás redirigido al login en breve...</p>
          </div>
        </div>
      )}
      <div style={{
        maxWidth: 440,
        margin: '50px auto',
        padding: 32,
        boxShadow: '0 0 16px #eee',
        borderRadius: 16,
        background: '#fff',
        position: 'relative'
      }}>
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
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', marginBottom: 8, padding: 10, borderRadius: 8, border: '1.5px solid #3182ce', fontSize: '1.1rem' }} required />
          <div style={{ height: 8, width: '100%', background: '#eee', borderRadius: 4, marginBottom: 4 }}>
            <div style={{ width: `${strength * 20}%`, height: '100%', background: strengthColor, borderRadius: 4, transition: 'width 0.3s' }}></div>
          </div>
          <div style={{ fontSize: 14, color: strengthColor, marginBottom: 12, fontWeight: 600 }}>{strengthText}</div>
          <label style={{ fontWeight: 600 }}>Confirmar clave</label>
          <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} style={{ width: '100%', marginBottom: 16, padding: 10, borderRadius: 8, border: '1.5px solid #3182ce', fontSize: '1.1rem' }} required />
          {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
          <button type="submit" disabled={loading} style={{ width: '100%', padding: 12, background: '#007bff', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '1.15rem', marginTop: 8 }}>
            {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
          </button>
        </form>
      </div>
    </>
  );
}
