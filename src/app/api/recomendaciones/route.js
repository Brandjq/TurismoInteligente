const LAT = "14.7701";
const LNG = "-91.1830";
const RADIUS = "50000";



export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const filtrosValidos = [
    "restaurant",
    "cafe",
    "museum",
    "church",
    "tourist_attraction",
    "turismo",
    "bar",
    "lodging",
    "park",
    "art_gallery"
  ];
  let tipo = searchParams.get("tipo") || "restaurant";
  if (!filtrosValidos.includes(tipo)) {
    tipo = "restaurant";
  }
    // Paginación
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key no configurada" }), { status: 500 });
  }

  // Puntos de interés en Sololá y alrededores
  const puntos = [
    { lat: "14.7701", lng: "-91.1830" }, // Sololá centro
    { lat: "14.7400", lng: "-91.1550" }, // Panajachel
    { lat: "14.7425", lng: "-91.1540" }, // Panajachel extra (zona turística)
    { lat: "14.6869", lng: "-91.2697" }, // San Pedro La Laguna
    { lat: "14.7300", lng: "-91.2100" }, // San Juan La Laguna
    { lat: "14.7000", lng: "-91.2000" }, // Santa Cruz La Laguna
    // Puedes agregar más puntos si lo deseas
  ];

  const municipios = [
    "Sololá", "Panajachel", "San Pedro La Laguna", "San Juan La Laguna", "San Marcos La Laguna",
    "Santa Cruz La Laguna", "San Pablo La Laguna", "San Lucas Tolimán", "Santiago Atitlán",
    "Santa Catarina Palopó", "San Antonio Palopó", "Santa Clara La Laguna", "San Jorge La Laguna",
    "San Andrés Semetabaj", "San José Chacayá", "Santa Lucía Utatlán", "Nahualá",
    "Santa María Visitación", "Concepción", "San Bartolo", "Lago de Atitlán"
  ];

  let allLugares = [];
  for (const punto of puntos) {
    let pagetoken = null;
    let tries = 0;
    let data = null;
    do {
      let nuevos = [];
      if (tipo === "turismo") {
        // Mostrar todos los lugares turísticos sin filtrar por municipio
        let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${punto.lat},${punto.lng}&radius=${RADIUS}&type=${tipo}&key=${apiKey}`;
        if (pagetoken) url += `&pagetoken=${pagetoken}`;
        if (pagetoken) await new Promise(r => setTimeout(r, 2000));
        const res = await fetch(url);
        if (!res.ok) {
          data = null;
          break;
        }
        data = await res.json();
        nuevos = (data.results || []).map(lugar => ({
          nombre: lugar.name,
          direccion: lugar.vicinity,
          foto: lugar.photos && lugar.photos[0]
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${lugar.photos[0].photo_reference}&key=${apiKey}`
            : null,
          url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lugar.name)}&query_place_id=${lugar.place_id}`
        }));
      } else {
        let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${punto.lat},${punto.lng}&radius=${RADIUS}&type=${tipo}&key=${apiKey}`;
        if (pagetoken) url += `&pagetoken=${pagetoken}`;
        if (pagetoken) await new Promise(r => setTimeout(r, 2000));
        const res = await fetch(url);
        if (!res.ok) {
          data = null;
          break;
        }
        data = await res.json();
        nuevos = (data.results || [])
          .filter(lugar => {
            const dir = (lugar.vicinity || "");
            return municipios.some(mun => dir.toLowerCase().includes(mun.toLowerCase()));
          })
          .map(lugar => ({
            nombre: lugar.name,
            direccion: lugar.vicinity,
            foto: lugar.photos && lugar.photos[0]
              ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${lugar.photos[0].photo_reference}&key=${apiKey}`
              : null,
            url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lugar.name)}&query_place_id=${lugar.place_id}`
          }));
      }
      allLugares = [...allLugares, ...nuevos];
      pagetoken = data && data.next_page_token ? data.next_page_token : null;
      tries++;
    } while (pagetoken && tries < 3);
  }

  // Eliminar duplicados por nombre y dirección
  allLugares = allLugares.filter((lugar, idx, self) =>
    idx === self.findIndex(l => l.nombre === lugar.nombre && l.direccion === lugar.direccion)
  );

  // Cargar lugares extra manuales
  let lugaresExtra = [];
  try {
    lugaresExtra = require("../../../../src/data/lugares-extra2.json");
    // Filtrar solo por tipo seleccionado, sin filtrar por municipio
    lugaresExtra = lugaresExtra.filter(l => l.tipo === tipo);
  } catch (e) {
    lugaresExtra = [];
  }

  // Combinar ambos arrays
  const todosLugares = [...allLugares, ...lugaresExtra];
    return new Response(JSON.stringify(todosLugares), {
      headers: { "Content-Type": "application/json" }
    });
}
