'use client';
import { Suspense, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const SOLOLA_COORDS = { lat: 14.772, lon: -91.183 };

const activityTypeMap = {
  'Lagos': 'tourist_attraction',
  'Senderismo': 'park',
  'Artesanías': 'shopping_mall',
  'Cultura': 'museum',
  'Aventura': 'tourist_attraction',
  'Fotografía': 'tourist_attraction'
};

const activityKeywords = {
  'Lagos': ['lago', 'atitlán'],
  'Senderismo': ['cerro', 'sendero', 'ruta'],
  'Artesanías': ['artesanía', 'mercado', 'textil'],
  'Cultura': ['museo', 'historia', 'iglesia'],
  'Aventura': ['kayak', 'aventura', 'volcán'],
  'Fotografía': ['mirador', 'vista', 'panorámica']
};

const restaurantKeywords = ['restaurante', 'comida', 'café', 'desayuno', 'almuerzo', 'cena'];

function ItinerarioContent() {
  const searchParams = useSearchParams();
  const actividadesRaw = searchParams.get('actividades') || '';
  const diasRaw = searchParams.get('dias') || '1';
  const tipoRaw = searchParams.get('tipo') || 'corta';

  const actividades = actividadesRaw.split(',').map(a => a.trim()).filter(Boolean);
  const dias = parseInt(diasRaw);
  const tipo = tipoRaw;

  const [lugares, setLugares] = useState([]);
  const [itinerario, setItinerario] = useState([]);

  useEffect(() => {
    const fetchLugares = async () => {
      let allLugares = [];
      let restaurantes = [];
      // Primero busca restaurantes (siempre deben ir en el itinerario)
      for (const keyword of restaurantKeywords) {
        // Aquí consulta la tabla 'attractions' vía tu endpoint /api/lugares
        const res = await fetch(`/api/lugares?actividad=${encodeURIComponent(keyword)}`);
        let data = [];
        try {
          data = await res.json();
        } catch {
          data = [];
        }
        restaurantes = restaurantes.concat(
          data.map(place => ({
            id: place.id,
            nombre: place.name, // <-- Este es el campo 'name' de la tabla 'attractions'
            categoria: 'Gastronomía',
            descripcion: place.description || '',
            tiempo: 60,
            latitud: place.latitud,
            longitud: place.longitud,
            map_link: place.map_link,
            image_url: place.image_url
          }))
        );
      }
      // También consulta Google Places para restaurantes
      if (GOOGLE_PLACES_API_KEY) {
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${SOLOLA_COORDS.lat},${SOLOLA_COORDS.lon}&radius=25000&type=restaurant&key=${GOOGLE_PLACES_API_KEY}`;
        const extRes = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`);
        let extData = {};
        try {
          extData = await extRes.json();
        } catch {
          extData = {};
        }
        if (extData.results) {
          restaurantes = restaurantes.concat(
            extData.results.map(place => ({
              id: place.place_id,
              nombre: place.name,
              categoria: 'Gastronomía',
              descripcion: place.vicinity || '',
              tiempo: 60,
              latitud: place.geometry?.location?.lat,
              longitud: place.geometry?.location?.lng
            }))
          );
        }
      }
      // Elimina duplicados de restaurantes
      const uniqueRestaurantes = [];
      const restIds = new Set();
      for (const r of restaurantes) {
        if (!restIds.has(r.id)) {
          uniqueRestaurantes.push(r);
          restIds.add(r.id);
        }
      }

      // Ahora busca actividades seleccionadas (excepto Gastronomía)
      let actividadesLugares = [];
      for (const act of actividades.filter(a => a !== 'Gastronomía')) {
        const keywords = activityKeywords[act] || [act];
        for (const keyword of keywords) {
          const res = await fetch(`/api/lugares?actividad=${encodeURIComponent(keyword)}`);
          let data = [];
          try {
            data = await res.json();
          } catch {
            data = [];
          }
          actividadesLugares = actividadesLugares.concat(
            data.map(place => ({
              id: place.id,
              nombre: place.name,
              categoria: act,
              descripcion: place.description || '',
              tiempo: 60,
              latitud: place.latitud,
              longitud: place.longitud,
              map_link: place.map_link,
              image_url: place.image_url
            }))
          );
        }
        // Consulta Google Places API para la actividad
        if (GOOGLE_PLACES_API_KEY) {
          const type = activityTypeMap[act] || 'tourist_attraction';
          const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${SOLOLA_COORDS.lat},${SOLOLA_COORDS.lon}&radius=25000&type=${type}&key=${GOOGLE_PLACES_API_KEY}`;
          const extRes = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`);
          let extData = {};
          try {
            extData = await extRes.json();
          } catch {
            extData = {};
          }
          if (extData.results) {
            allLugares = allLugares.concat(
              extData.results.map(place => ({
                id: place.place_id,
                nombre: place.name,
                categoria: act,
                descripcion: place.vicinity || '',
                tiempo: 60
              }))
            );
          }
        }
        // Consulta OpenStreetMap si sigue habiendo pocos resultados
        if (allLugares.length < 2) {
          const query = `
            [out:json][timeout:25];
            (
              node["tourism"](14.6,-91.3,14.9,-91.0);
              way["tourism"](14.6,-91.3,14.9,-91.0);
              relation["tourism"](14.6,-91.3,14.9,-91.0);
            );
            out center;
          `;
          const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
          const osmRes = await fetch(url);
          let osmData = {};
          try {
            osmData = await osmRes.json();
          } catch {
            osmData = {};
          }
          if (osmData.elements) {
            allLugares = allLugares.concat(
              osmData.elements.map(e => ({
                id: e.id,
                nombre: e.tags?.name || 'Lugar turístico',
                categoria: act,
                descripcion: e.tags?.description || e.tags?.tourism || '',
                tiempo: 60
              }))
            );
          }
        }
      }
      // Elimina duplicados de actividades
      const uniqueLugares = [];
      const ids = new Set();
      for (const l of actividadesLugares) {
        if (!ids.has(l.id)) {
          uniqueLugares.push(l);
          ids.add(l.id);
        }
      }

      // Junta actividades y restaurantes
      setLugares([...uniqueLugares, ...uniqueRestaurantes]);
    };
    if (actividades.length > 0) fetchLugares();
  }, [actividadesRaw, diasRaw, tipoRaw]);

  useEffect(() => {
    // Itinerario inteligente: desayuno, actividad, almuerzo, actividad, cena
    let lugaresPorDia = tipo === 'corta' ? 1 : tipo === 'media' ? 2 : 3;
    let totalActividades = lugaresPorDia * dias;
    const actividadesFiltradas = lugares.filter(l => l.categoria !== 'Gastronomía').slice(0, totalActividades);
    const restaurantesFiltrados = lugares.filter(l => l.categoria === 'Gastronomía');

    // Para cada actividad, busca restaurante más cercano
    function getRestauranteCercano(lat, lng) {
      if (!lat || !lng || restaurantesFiltrados.length === 0) return null;
      let minDist = Infinity;
      let cercano = null;
      for (const r of restaurantesFiltrados) {
        if (r.latitud && r.longitud) {
          const dist = Math.sqrt(
            Math.pow(lat - r.latitud, 2) + Math.pow(lng - r.longitud, 2)
          );
          if (dist < minDist) {
            minDist = dist;
            cercano = r;
          }
        }
      }
      return cercano;
    }

    const plan = [];
    for (let d = 0; d < dias; d++) {
      const diaActividades = actividadesFiltradas.slice(d * lugaresPorDia, (d + 1) * lugaresPorDia);
      // Busca restaurante cercano a la primera actividad del día
      const desayuno = diaActividades[0]
        ? getRestauranteCercano(diaActividades[0].latitud, diaActividades[0].longitud)
        : restaurantesFiltrados[d % restaurantesFiltrados.length];
      // Busca restaurante cercano a la última actividad del día
      const cena = diaActividades[diaActividades.length - 1]
        ? getRestauranteCercano(diaActividades[diaActividades.length - 1].latitud, diaActividades[diaActividades.length - 1].longitud)
        : restaurantesFiltrados[(d + 2) % restaurantesFiltrados.length];
      // Almuerzo en restaurante cercano a la actividad del medio (o primero si solo hay una)
      const almuerzo = diaActividades[Math.floor(diaActividades.length / 2)]
        ? getRestauranteCercano(diaActividades[Math.floor(diaActividades.length / 2)].latitud, diaActividades[Math.floor(diaActividades.length / 2)].longitud)
        : restaurantesFiltrados[(d + 1) % restaurantesFiltrados.length];
      plan.push({
        dia: d + 1,
        desayuno,
        actividades: diaActividades,
        almuerzo,
        cena
      });
    }
    setItinerario(plan);
  }, [lugares, dias, tipo]);

  return (
    <div style={{
      maxWidth: 700,
      margin: '4rem auto',
      padding: '2.5rem 2rem',
      background: 'linear-gradient(120deg,#e0f7fa 60%,#fff 100%)',
      borderRadius: '18px',
      boxShadow: '0 4px 24px rgba(52,152,219,0.12)',
      textAlign: 'center'
    }}>
      <h2 style={{
        fontSize: '2rem',
        color: '#2563eb',
        fontWeight: 'bold',
        marginBottom: '2rem'
      }}>
        Tu itinerario personalizado
      </h2>
      <div style={{marginBottom:'1rem', color:'#64748b'}}>
        <b>Lugares encontrados:</b> {lugares.length}
      </div>
      <div style={{textAlign:'left'}}>
        {itinerario.length === 0 || lugares.length === 0 ? (
          <p>No hay suficientes lugares para tus preferencias. Prueba con menos días, más actividades, o revisa tu BD y la API.</p>
        ) : (
          itinerario.map(dia => (
            <div key={dia.dia} style={{marginBottom:'2rem'}}>
              <h3 style={{color:'#22c55e', fontSize:'1.3rem'}}>Día {dia.dia}</h3>
              <div>
                <strong>Desayuno:</strong> {dia.desayuno?.nombre || 'Restaurante típico sugerido'}
                {dia.desayuno?.nombre && (
                  <span style={{color:'#64748b', marginLeft:'0.5rem'}}>
                    {dia.desayuno?.descripcion}
                  </span>
                )}
                {!dia.desayuno?.nombre && (
                  <span style={{color:'#475569'}}>
                    Busca opciones de desayuno en Panajachel, San Pedro o Santiago Atitlán.
                  </span>
                )}
              </div>
              {dia.actividades.length === 0 ? (
                <p style={{color:'#64748b'}}>Sin actividades asignadas para este día.</p>
              ) : (
                <ul style={{paddingLeft:'1.2rem'}}>
                  {dia.actividades.map(lugar => (
                    <li key={lugar.id} style={{marginBottom:'0.7rem'}}>
                      <strong>{lugar.nombre}</strong> <span style={{color:'#2563eb'}}>({lugar.categoria})</span>
                      <br />
                      <span style={{color:'#475569'}}>{lugar.descripcion}</span>
                      <br />
                      <span style={{color:'#64748b', fontSize:'0.95rem'}}>Tiempo estimado: {lugar.tiempo} min</span>
                    </li>
                  ))}
                </ul>
              )}
              <div>
                <strong>Almuerzo:</strong> {dia.almuerzo?.nombre || 'Restaurante con vista sugerido'}
                {dia.almuerzo?.nombre && (
                  <span style={{color:'#64748b', marginLeft:'0.5rem'}}>
                    {dia.almuerzo?.descripcion}
                  </span>
                )}
                {!dia.almuerzo?.nombre && (
                  <span style={{color:'#475569'}}>
                    Prueba restaurantes en Panajachel, San Juan o Santa Catarina Palopó.
                  </span>
                )}
              </div>
              <div>
                <strong>Cena:</strong> {dia.cena?.nombre || 'Restaurante local sugerido'}
                {dia.cena?.nombre && (
                  <span style={{color:'#64748b', marginLeft:'0.5rem'}}>
                    {dia.cena?.descripcion}
                  </span>
                )}
                {!dia.cena?.nombre && (
                  <span style={{color:'#475569'}}>
                    Busca opciones de cena en los pueblos cercanos al lago.
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function ItinerarioPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ItinerarioContent />
    </Suspense>
  );
}

// Sí, si agregas más registros a la tabla 'attractions', el sistema los tomará automáticamente.
// El itinerario siempre consulta los lugares actuales de la BD usando el endpoint /api/lugares.
// No necesitas cambiar nada en el código para que los nuevos lugares aparezcan en los resultados.
