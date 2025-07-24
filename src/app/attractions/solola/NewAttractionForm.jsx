'use client';
import { useState } from 'react';

export default function NewAttractionForm({ onClose, onSave }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [mapLink, setMapLink] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // guardamos el base64 para mostrar la imagen localmente
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/guardar-attractions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, mapLink }),
      });

      if (res.ok) {
        const result = await res.json();
        // pasamos la imagen en base64 solo a nivel de frontend
        onSave({ ...result, image: imagePreview });
      } else {
        console.error('Error al guardar en la BD');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: 9999
    }}>
      <form onSubmit={handleSubmit} style={{
        background: 'white', padding: '2rem', borderRadius: '12px',
        display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px'
      }}>
        <h2>Nuevo Atractivo</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enlace a Google Maps"
          value={mapLink}
          onChange={(e) => setMapLink(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <img src={imagePreview} alt="Previsualización" style={{ maxHeight: '150px', borderRadius: '8px' }} />
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="submit" style={{ background: '#3182ce', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '6px' }}>
            Guardar
          </button>
          <button type="button" onClick={onClose} style={{ padding: '0.5rem 1rem' }}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
