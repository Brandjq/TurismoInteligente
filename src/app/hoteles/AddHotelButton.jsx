"use client";
import { useState } from "react";

export default function AddHotelButton() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ nombre: "", direccion: "", descripcion: "", precio: "", url: "", imagen: null });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);

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
    setConfirmCancel(true);
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
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <form onSubmit={handleSubmit} style={{ background: 'linear-gradient(120deg, #e0e7ff 0%, #f0fff4 100%)', padding: 38, borderRadius: 18, minWidth: 340, maxWidth: 440, boxShadow: '0 8px 32px #0002', display: 'flex', flexDirection: 'column', gap: 18, position: 'relative', fontFamily: 'Segoe UI, Poppins, sans-serif' }}>
            <h2 style={{ textAlign: 'center', fontWeight: 800, fontSize: '2rem', color: '#234e70', marginBottom: 10, letterSpacing: 1 }}>Agregar Hotel</h2>
            <input name="nombre" placeholder="Nombre del hotel" value={form.nombre} onChange={handleChange} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #bcd', fontSize: '1.1rem', background: '#f8fafc' }} />
            <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #bcd', fontSize: '1.1rem', background: '#f8fafc' }} />
            <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required rows={3} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #bcd', fontSize: '1.1rem', background: '#f8fafc', resize: 'vertical' }} />
            <input name="precio" placeholder="Precio (ej: Q500/noche)" value={form.precio} onChange={handleChange} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #bcd', fontSize: '1.1rem', background: '#f8fafc' }} />
            <input name="url" placeholder="Sitio web o reserva" value={form.url} onChange={handleChange} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #bcd', fontSize: '1.1rem', background: '#f8fafc' }} />
            <label htmlFor="hotel-img-upload" style={{ display: 'inline-block', padding: '10px 15px', background: '#3182ce', color: 'white', borderRadius: '8px', cursor: 'pointer', textAlign: 'center', fontWeight: 'bold', userSelect: 'none', marginBottom: preview ? 0 : 10 }}>
              {form.imagen ? `Imagen: ${form.imagen.name}` : 'Seleccionar Imagen'}
            </label>
            <input id="hotel-img-upload" name="imagen" type="file" accept="image/*" onChange={handleChange} required style={{ display: 'none' }} />
            {preview && <img src={preview} alt="preview" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 10, marginBottom: 10, boxShadow: '0 2px 12px #3182ce22' }} />}
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button type="submit" disabled={loading} style={{ flex: 1, background: '#3182ce', color: '#fff', border: 'none', borderRadius: 8, padding: 12, fontWeight: 700, fontSize: '1.1rem', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 2px 12px #3182ce22', transition: 'background 0.2s' }}>{loading ? 'Guardando...' : 'Guardar'}</button>
              <button type="button" onClick={handleCancel} style={{ flex: 1, background: '#e53e3e', color: '#fff', border: 'none', borderRadius: 8, padding: 12, fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 2px 12px #e53e3e22', transition: 'background 0.2s' }}>Cancelar</button>
            </div>
          </form>
          {/* Modal de confirmación para cancelar */}
          {confirmCancel && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ background: 'white', borderRadius: '16px', padding: '2rem 2.5rem', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', textAlign: 'center', minWidth: '280px' }}>
                <h3 style={{marginBottom:'1rem', color:'#e53e3e'}}>¿Seguro que quieres cancelar el registro?</h3>
                <div style={{display:'flex', justifyContent:'center', gap:'1.5rem'}}>
                  <button style={{background:'#e53e3e', color:'white', border:'none', borderRadius:'8px', padding:'0.7rem 1.5rem', fontWeight:'bold', cursor:'pointer'}} onClick={() => { setShow(false); setPreview(null); setConfirmCancel(false); }}>Sí, cancelar</button>
                  <button style={{background:'#3182ce', color:'white', border:'none', borderRadius:'8px', padding:'0.7rem 1.5rem', fontWeight:'bold', cursor:'pointer'}} onClick={() => setConfirmCancel(false)}>No, volver</button>
                </div>
              </div>
            </div>
          )}
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
