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
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.image) {
      alert('Por favor selecciona una imagen.');
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
        // Normalizar el objeto para el frontend
        onSave({
          name: data.name,
          description: data.description,
          image_url: data.image_url,
          map_link: data.map_link,
        });
        setTimeout(() => {
          setMessage(null);
          onClose();
        }, 2000);
      } else {
        setMessage('Error al guardar el atractivo.');
      }
    } catch {
      setMessage('Error de conexión.');
    }
    setLoading(false);
  };

  const handleCancel = () => {
    if (window.confirm('¿Seguro que quieres cancelar? Los datos no guardados se perderán.')) {
      onClose();
    }
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

          {/* Mensaje de éxito o error */}
          {message && (
            <p
              style={{
                textAlign: 'center',
                color: message.includes('éxito') ? 'green' : 'red',
                fontWeight: 'bold',
                marginTop: '5px',
              }}
            >
              {message}
            </p>
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
