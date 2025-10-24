'use client';

import { useState, useEffect } from 'react';

export default function AttractionsPage() {
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    fetch('/api/attractions')
      .then(res => res.json())
      .then(data => setAttractions(data))
      .catch(error => console.error('Error al cargar las atracciones:', error));
  }, []);

  return (
    <div>
      <h1>Atracciones</h1>
      {attractions.length === 0 ? (
        <p>No hay atracciones disponibles.</p>
      ) : (
        <ul>
          {attractions.map(attraction => (
            <li key={attraction.id}>
              <h2>{attraction.name}</h2>
              <p>{attraction.description}</p>
              {attraction.map_link && (
                <a href={attraction.map_link} target="_blank" rel="noopener noreferrer">
                  Ver en el mapa
                </a>
              )}
              {attraction.image_url && <img src={attraction.image_url} alt={attraction.name} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
