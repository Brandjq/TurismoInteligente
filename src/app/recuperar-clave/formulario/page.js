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

  const isStrong = password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);

  useEffect(() => {
    // Oculta la barra de navegación si existe
    const nav = document.querySelector('.navbar, .navigation, nav');
    if (nav) nav.style.display = 'none';
    return () => {
      if (nav) nav.style.display = '';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!isStrong) {
      setError('La contraseña debe tener mínimo 8 caracteres, mayúscula, minúscula y número.');
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
    <>
      <style>{`.navbar, .navigation, nav { display: none !important; }`}</style>
      <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, boxShadow: '0 0 10px #eee', borderRadius: 8 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Image src="/logo.jpg" alt="Logo Turismo" width={80} height={80} />
          <h2 style={{ marginTop: 16 }}>Recuperar Contraseña</h2>
          <p style={{ marginTop: 8 }}>Ingresa tu correo y la nueva clave para actualizarla.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Correo registrado</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', marginBottom: 8, padding: 8 }} required />
          <label>Nueva clave</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', marginBottom: 8, padding: 8 }} required />
          <div style={{ fontSize: 13, color: isStrong ? 'green' : 'red', marginBottom: 8 }}>
            {isStrong ? 'Clave fuerte' : 'Debe tener mínimo 8 caracteres, mayúscula, minúscula y número.'}
          </div>
          <label>Confirmar clave</label>
          <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} style={{ width: '100%', marginBottom: 8, padding: 8 }} required />
          {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
          {success && <div style={{ color: 'green', marginBottom: 8 }}>{success}</div>}
          <button type="submit" disabled={loading} style={{ width: '100%', padding: 10, background: '#007bff', color: '#fff', border: 'none', borderRadius: 4 }}>
            Actualizar Contraseña
          </button>
        </form>
      </div>
    </>
  );
}
