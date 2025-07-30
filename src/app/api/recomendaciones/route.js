const LAT = "14.7701";
const LNG = "-91.1830";
const RADIUS = "50000";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tipo = searchParams.get("tipo") || "restaurant";
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key no configurada" }), { status: 500 });
  }

  let allLugares = [];
  let pagetoken = null;
  let tries = 0;

  const municipios = [
    "Sololá", "Panajachel", "San Pedro La Laguna", "San Juan La Laguna", "San Marcos La Laguna",
    "Santa Cruz La Laguna", "San Pablo La Laguna", "San Lucas Tolimán", "Santiago Atitlán",
    "Santa Catarina Palopó", "San Antonio Palopó", "Santa Clara La Laguna", "San Jorge La Laguna",
    "San Andrés Semetabaj", "San José Chacayá", "Santa Lucía Utatlán", "Nahualá",
    "Santa María Visitación", "Concepción", "San Bartolo", "Lago de Atitlán"
  ];

  do {
    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${LAT},${LNG}&radius=${RADIUS}&type=${tipo}&key=${apiKey}`;
    if (pagetoken) url += `&pagetoken=${pagetoken}`;
    if (pagetoken) await new Promise(r => setTimeout(r, 2000));
    
    const res = await fetch(url);
    if (!res.ok) {
      return new Response(JSON.stringify({ error: "Error al llamar Google Places" }), { status: 500 });
    }
    
    const data = await res.json();

    const nuevos = (data.results || []).filter(lugar => {
      const dir = (lugar.vicinity || "") + " " + (lugar.name || "");
      return municipios.some(mun => dir.toLowerCase().includes(mun.toLowerCase()));
    }).map(lugar => ({
      nombre: lugar.name,
      direccion: lugar.vicinity,
      foto: lugar.photos && lugar.photos[0]
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${lugar.photos[0].photo_reference}&key=${apiKey}`
        : null,
      url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lugar.name)}&query_place_id=${lugar.place_id}`
    }));

    allLugares = [...allLugares, ...nuevos];
    pagetoken = data.next_page_token || null;
    tries++;
  } while (pagetoken && tries < 3);

  return new Response(JSON.stringify(allLugares), {
    headers: { "Content-Type": "application/json" }
  });
}
