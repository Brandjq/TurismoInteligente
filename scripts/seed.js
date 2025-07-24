import prisma from '../src/lib/prisma.js';

const recomendaciones = [
  {
    nombre: "Paseo en lancha por el Lago de Atitlán",
    descripcion: "Recorrer pueblos como San Juan, Santiago y Santa Catarina Palopó.",
    fecha: "Todo el año",
    lugar: "Lago de Atitlán",
    imagen: null,
    destacado: true,
  },
  {
    nombre: "Visita al Mercado de Sololá",
    descripcion: "Mercado tradicional para comprar textiles y artesanías locales.",
    fecha: "Todos los días",
    lugar: "Sololá centro",
    imagen: null,
    destacado: false,
  },
  {
    nombre: "Caminata al Rostro Maya",
    descripcion: "Senderismo al mirador más famoso del lago, con vistas espectaculares al amanecer.",
    fecha: "Todo el año",
    lugar: "San Juan La Laguna",
    imagen: null,
    destacado: false,
  },
  {
    nombre: "Tour de Kayak y Paddle Board",
    descripcion: "Recorridos guiados en kayak y paddle board por el lago, ideales para familias y aventureros.",
    fecha: "Todo el año",
    lugar: "Lago de Atitlán",
    imagen: null,
    destacado: false,
  },
  {
    nombre: "Festival de la Cultura Maya",
    descripcion: "Música, danzas, gastronomía típica y exposiciones culturales.",
    fecha: "2025-08-15",
    lugar: "Parque Central de Sololá",
    imagen: null,
    destacado: true,
  },
  {
    nombre: "Feria de Santiago Atitlán",
    descripcion: "Procesiones, actividades religiosas y feria popular.",
    fecha: "2025-07-25",
    lugar: "Santiago Atitlán",
    imagen: null,
    destacado: false,
  },
  {
    nombre: "Feria Titular de Sololá",
    descripcion: "Celebración en honor a la Virgen de la Natividad, con desfiles, música, bailes y feria.",
    fecha: "2025-09-08",
    lugar: "Sololá centro",
    imagen: null,
    destacado: true,
  },
  {
    nombre: "Semana Santa en Panajachel",
    descripcion: "Procesiones, alfombras de aserrín y actividades religiosas en el Lago de Atitlán.",
    fecha: "2025-04-13",
    lugar: "Panajachel",
    imagen: null,
    destacado: false,
  },
  {
    nombre: "Festival Atitlán",
    descripcion: "Festival de música, arte y ecología a orillas del lago.",
    fecha: "2025-03-22",
    lugar: "Santiago Atitlán",
    imagen: null,
    destacado: false,
  },
  {
    nombre: "Mercado de Artesanías de Sololá",
    descripcion: "Compra de textiles, artesanías y productos locales en el mercado tradicional.",
    fecha: "Todos los martes y viernes",
    lugar: "Mercado de Sololá",
    imagen: null,
    destacado: false,
  },
  {
    nombre: "Festival de Barriletes Gigantes",
    descripcion: "Exhibición de barriletes gigantes en el Día de Todos los Santos, tradición maya única.",
    fecha: "2025-11-01",
    lugar: "Sumpango (cercano a Sololá)",
    imagen: null,
    destacado: false,
  },
  {
    nombre: "Tour de Cafetales",
    descripcion: "Visitas guiadas a fincas de café, desde la planta hasta la taza.",
    fecha: "Todo el año",
    lugar: "San Juan La Laguna y alrededores",
    imagen: null,
    destacado: false,
  },
  {
    nombre: "Visita a la Iglesia de Santiago Apóstol",
    descripcion: "Explora la arquitectura colonial y las tradiciones religiosas.",
    fecha: "Todo el año",
    lugar: "Santiago Atitlán",
    imagen: null,
    destacado: false,
  },
  {
    nombre: "Recorrido por San Pedro La Laguna",
    descripcion: "Pueblo con ambiente artístico, cafés y vista al lago.",
    fecha: "Todo el año",
    lugar: "San Pedro La Laguna",
    imagen: null,
    destacado: false,
  },
  {
    nombre: "Observación de aves en San Marcos",
    descripcion: "Actividades ecoturísticas para amantes de la naturaleza.",
    fecha: "Todo el año",
    lugar: "San Marcos La Laguna",
    imagen: null,
    destacado: false,
  },
  {
    nombre: "Festival de Música Tradicional",
    descripcion: "Presentaciones de marimba y otros géneros autóctonos.",
    fecha: "2025-10-10",
    lugar: "Sololá centro",
    imagen: null,
    destacado: false,
  },
  {
    nombre: "Paseo cultural por Santa Catarina Palopó",
    descripcion: "Visita talleres de arte y textiles típicos.",
    fecha: "Todo el año",
    lugar: "Santa Catarina Palopó",
    imagen: null,
    destacado: false,
  },
  {
    nombre: "Visita a las ruinas de Iximché",
    descripcion: "Sitio arqueológico cercano con historia maya.",
    fecha: "Todo el año",
    lugar: "Cerca de Tecpán",
    imagen: null,
    destacado: false,
  },
  {
    nombre: "Tour gastronómico local",
    descripcion: "Prueba platillos típicos de la región en varios restaurantes.",
    fecha: "Todo el año",
    lugar: "Sololá y alrededores",
    imagen: null,
    destacado: false,
  },
  {
    nombre: "Paseo por los pueblos indígenas",
    descripcion: "Conoce las tradiciones y cultura maya en diferentes comunidades.",
    fecha: "Todo el año",
    lugar: "Diversos pueblos de Sololá",
    imagen: null,
    destacado: false,
  },
  {
    nombre: "Festival de los Faroles",
    descripcion: "Evento nocturno con exhibición de faroles de colores.",
    fecha: "2025-12-07",
    lugar: "Sololá centro",
    imagen: null,
    destacado: false,
  },
  {
    nombre: "Ruta de senderismo por el Volcán San Pedro",
    descripcion: "Excursión para subir el volcán y disfrutar vistas panorámicas.",
    fecha: "Todo el año",
    lugar: "Volcán San Pedro",
    imagen: null,
    destacado: false,
  },
  {
    nombre: "Visita a la cooperativa de café",
    descripcion: "Aprende sobre la producción y exportación del café local.",
    fecha: "Todo el año",
    lugar: "Alrededores de Sololá",
    imagen: null,
    destacado: false,
  },
  {
    nombre: "Tour de fotografía en el lago",
    descripcion: "Captura las mejores imágenes del amanecer y atardecer.",
    fecha: "Todo el año",
    lugar: "Lago de Atitlán",
    imagen: null,
    destacado: false,
  },
  {
    nombre: "Feria artesanal en Panajachel",
    descripcion: "Venta de artesanías y productos típicos de la región.",
    fecha: "Todos los sábados",
    lugar: "Panajachel",
    imagen: null,
    destacado: false,
  }
];

async function main() {
  for (const rec of recomendaciones) {
    await prisma.recomendacion.create({ data: rec });
  }
  console.log("Datos insertados correctamente");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
