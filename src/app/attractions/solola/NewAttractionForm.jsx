'use client';
import { useState } from 'react';

export default function NewAttractionForm({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    mapLink: '',
    image: null,
  });

  const [message, setMessage] = useState(null); // Para mensajes de éxito/error
  const [showMsg, setShowMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.image) {
      setMessage('Por favor selecciona una imagen.');
      setShowMsg(true);
      setTimeout(() => setShowMsg(false), 2000);
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('mapLink', form.mapLink);
    formData.append('image', form.image);

    try {
      const res = await fetch('/api/guardar-attractions', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setMessage('¡Atractivo guardado con éxito!');
        setShowMsg(true);
        onSave({
          name: data.name,
          description: data.description,
          image_url: data.image_url,
          map_link: data.map_link,
        });
        setTimeout(() => {
          setShowMsg(false);
          setMessage(null);
          onClose();
        }, 2000);
      } else {
        setMessage('Error al guardar el atractivo.');
        setShowMsg(true);
        setTimeout(() => setShowMsg(false), 2000);
      }
    } catch {
      setMessage('Error de conexión.');
      setShowMsg(true);
      setTimeout(() => setShowMsg(false), 2000);
    }
    setLoading(false);
  };

  const [confirmCancel, setConfirmCancel] = useState(false);
  const handleCancel = () => {
    setConfirmCancel(true);
  };

  return (
    <>
      {/* Fondo oscuro semi-transparente */}
      <div
        onClick={handleCancel}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 999,
        }}
      />
      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          borderRadius: '12px',
          padding: '30px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          width: '90%',
          maxWidth: '400px',
          zIndex: 1000,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h2 style={{ marginBottom: '15px', textAlign: 'center' }}>Nuevo Atractivo</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="text"
            placeholder="Nombre"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            style={{
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
          />
          <textarea
            placeholder="Descripción"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            rows={4}
            style={{
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              resize: 'vertical',
            }}
          />
          <input
            type="url"
            placeholder="Enlace a Google Maps"
            value={form.mapLink}
            onChange={(e) => setForm({ ...form, mapLink: e.target.value })}
            required
            style={{
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
          />

          {/* Input file personalizado */}
          <label
            htmlFor="imageUpload"
            style={{
              display: 'inline-block',
              padding: '10px 15px',
              backgroundColor: '#0070f3',
              color: 'white',
              borderRadius: '6px',
              cursor: 'pointer',
              textAlign: 'center',
              fontWeight: 'bold',
              userSelect: 'none',
            }}
          >
            {form.image ? `Imagen: ${form.image.name}` : 'Seleccionar Imagen'}
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            required={!form.image}
          />

          {/* Modal de confirmación para cancelar */}
          {confirmCancel && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.25)',
              zIndex: 3000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem 2.5rem',
                boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                textAlign: 'center',
                minWidth: '280px',
              }}>
                <h3 style={{marginBottom:'1rem', color:'#e53e3e'}}>¿Seguro que quieres cancelar el registro?</h3>
                <div style={{display:'flex', justifyContent:'center', gap:'1.5rem'}}>
                  <button
                    style={{background:'#e53e3e', color:'white', border:'none', borderRadius:'8px', padding:'0.7rem 1.5rem', fontWeight:'bold', cursor:'pointer'}}
                    onClick={() => {
                      setMessage('Registro cancelado.');
                      setShowMsg(true);
                      setTimeout(() => {
                        setShowMsg(false);
                        setMessage(null);
                        setConfirmCancel(false);
                        onClose();
                      }, 1500);
                    }}
                  >Sí, cancelar</button>
                  <button
                    style={{background:'#3182ce', color:'white', border:'none', borderRadius:'8px', padding:'0.7rem 1.5rem', fontWeight:'bold', cursor:'pointer'}}
                    onClick={() => setConfirmCancel(false)}
                  >No, volver</button>
                </div>
              </div>
            </div>
          )}
          {/* Mensaje visual tipo modal flotante */}
          {showMsg && (
            <div style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: message && message.includes('éxito') ? '#38a169' : '#e53e3e',
              color: 'white',
              padding: '1.2rem 2.2rem',
              borderRadius: '14px',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              zIndex: 2000,
              textAlign: 'center',
              animation: 'popIn 0.3s',
            }}>
              {message}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: loading ? '#a5d6a7' : '#4CAF50',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '6px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                flex: 1,
                marginRight: '10px',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#45a049')}
              onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#4CAF50')}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              style={{
                backgroundColor: '#f44336',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                flex: 1,
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#da190b')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#f44336')}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
