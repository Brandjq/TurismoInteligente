"use client";
import { useState } from "react";

export default function AddHotelButton() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ nombre: "", direccion: "", descripcion: "", precio: "", url: "", imagen: null });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "imagen") {
      setForm((f) => ({ ...f, imagen: files[0] }));
      setPreview(files[0] ? URL.createObjectURL(files[0]) : null);
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => v && formData.append(k, v));
    const res = await fetch("/api/hoteles", { method: "POST", body: formData });
    if (res.ok) {
      setShow(false);
      setForm({ nombre: "", direccion: "", descripcion: "", precio: "", url: "", imagen: null });
      setPreview(null);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        window.location.reload();
      }, 1500);
    }
    setLoading(false);
  }

  function handleCancel() {
    if (window.confirm('¿Estás seguro de cancelar el registro?')) {
      setShow(false);
      setPreview(null);
    }
  }

  return (
    <>
      <button
        style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: '#3182ce',
          color: '#fff',
          fontSize: 36,
          border: 'none',
          boxShadow: '0 2px 8px #0002',
          cursor: 'pointer',
          zIndex: 1000
        }}
        title="Agregar hotel"
        onClick={() => setShow(true)}
      >
        +
      </button>
      {show && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 32, borderRadius: 12, minWidth: 320, maxWidth: 400, boxShadow: '0 2px 16px #0003', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h2>Agregar Hotel</h2>
            <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
            <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} required />
            <input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required />
            <input name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} required />
            <input name="url" placeholder="Sitio web" value={form.url} onChange={handleChange} required />
            <input name="imagen" type="file" accept="image/*" onChange={handleChange} required />
            {preview && <img src={preview} alt="preview" style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8 }} />}
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button type="submit" disabled={loading} style={{ flex: 1, background: '#3182ce', color: '#fff', border: 'none', borderRadius: 6, padding: 10, fontWeight: 600, cursor: 'pointer' }}>{loading ? 'Guardando...' : 'Guardar'}</button>
              <button type="button" onClick={handleCancel} style={{ flex: 1, background: '#eee', color: '#333', border: 'none', borderRadius: 6, padding: 10, fontWeight: 600, cursor: 'pointer' }}>Cancelar</button>
            </div>
          </form>
        </div>
      )}
      {success && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}>
          <div style={{
            background: 'linear-gradient(135deg, #e0ffe7 0%, #b7f5c8 100%)',
            padding: 40,
            borderRadius: 20,
            boxShadow: '0 4px 32px #0003',
            textAlign: 'center',
            minWidth: 280,
            animation: 'popIn 0.4s cubic-bezier(.68,-0.55,.27,1.55)'
          }}>
            <div style={{
              width: 70,
              height: 70,
              margin: '0 auto 12px auto',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #38a169 60%, #43e97b 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 12px #38a16955',
              fontSize: 40,
              color: '#fff',
              border: '4px solid #fff',
              outline: '2px solid #38a169',
              outlineOffset: '-4px',
              animation: 'popIn 0.4s cubic-bezier(.68,-0.55,.27,1.55)'
            }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 10 17 4 11" /></svg>
            </div>
            <h3 style={{ margin: '10px 0 0 0', color: '#1a3d2c', fontWeight: 700, fontSize: 22, letterSpacing: 0.5 }}>¡Registro guardado con éxito!</h3>
          </div>
          <style>{`
            @keyframes popIn {
              0% { transform: scale(0.7); opacity: 0; }
              80% { transform: scale(1.08); opacity: 1; }
              100% { transform: scale(1); opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
