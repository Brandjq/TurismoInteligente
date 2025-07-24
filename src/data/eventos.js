// Aquí puedes agregar eventos manualmente y también se pueden consumir de APIs externas en el futuro.
export const eventosSolola = [
  {
    nombre: "Festival de la Cultura Maya",
    fecha: "2025-08-15",
    lugar: "Parque Central de Sololá",
    descripcion: "Música, danzas, gastronomía típica y exposiciones culturales.",
    destacado: true,
    imagen: "/festival-maya.jpg"
  },
  {
    nombre: "Feria de Santiago Atitlán",
    fecha: "2025-07-25",
    lugar: "Santiago Atitlán",
    descripcion: "Procesiones, actividades religiosas y feria popular.",
    destacado: false,
    imagen: "/santiago-atitlan.jpg"
  },
  {
    nombre: "Feria Titular de Sololá",
    fecha: "2025-09-08",
    lugar: "Sololá centro",
    descripcion: "Celebración en honor a la Virgen de la Natividad, con desfiles, música, bailes y feria.",
    destacado: true,
    imagen: "/feria-solola.jpg"
  },
  {
    nombre: "Semana Santa en Panajachel",
    fecha: "2025-04-13",
    lugar: "Panajachel",
    descripcion: "Procesiones, alfombras de aserrín y actividades religiosas en el Lago de Atitlán.",
    destacado: false,
    imagen: "/panajachel.jpg"
  },
  {
    nombre: "Festival Atitlán",
    fecha: "2025-03-22",
    lugar: "Santiago Atitlán",
    descripcion: "Festival de música, arte y ecología a orillas del lago.",
    destacado: false,
    imagen: "/festival-atitlan.jpg"
  },
  {
    nombre: "Tour de Kayak y Paddle Board",
    fecha: "Todo el año",
    lugar: "Lago de Atitlán",
    descripcion: "Recorridos guiados en kayak y paddle board por el lago, ideales para familias y aventureros.",
    destacado: false,
    imagen: "/kayak.jpg"
  },
  {
    nombre: "Caminata al Rostro Maya",
    fecha: "Todo el año",
    lugar: "San Juan La Laguna",
    descripcion: "Senderismo al mirador más famoso del lago, con vistas espectaculares al amanecer.",
    destacado: false,
    imagen: "/rostro.jpg"
  },
  {
    nombre: "Mercado de Artesanías de Sololá",
    fecha: "Todos los martes y viernes",
    lugar: "Mercado de Sololá",
    descripcion: "Compra de textiles, artesanías y productos locales en el mercado tradicional.",
    destacado: false,
    imagen: "/mercado.jpg"
  },
  {
    nombre: "Festival de Barriletes Gigantes",
    fecha: "2025-11-01",
    lugar: "Sumpango (cercano a Sololá)",
    descripcion: "Exhibición de barriletes gigantes en el Día de Todos los Santos, tradición maya única.",
    destacado: false,
    imagen: "/barriletes.jpg"
  },
  {
    nombre: "Tour de Cafetales",
    fecha: "Todo el año",
    lugar: "San Juan La Laguna y alrededores",
    descripcion: "Visitas guiadas a fincas de café, desde la planta hasta la taza.",
    destacado: false,
    imagen: "/cafe.jpg"
  },
];

// Ejemplo de función para consumir Google Events o Facebook Events (requiere backend/API propia)
// export async function fetchEventosExternos() {
//   // Aquí iría la lógica para consumir APIs externas
//   // Por ejemplo, usando fetch() a un endpoint propio que procese Google Events o Facebook Events
//   return [];
// }
