import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    const result = await prisma.hotel.createMany({
      data: [
        // ... mismo orden de hoteles ...
        // Cambia solo el campo imagen a hotel1.jpg, hotel2.jpg, etc.
        {
          nombre: "Hotel Atitlán",
          direccion: "Finca San Buenaventura, Panajachel",
          descripcion: "Hotel con vista al lago y jardines botánicos.",
          precio: "$120 por noche",
          url: "https://www.hotelatitlan.com/",
          imagen: "hotel32.jpg"
        },
        {
          nombre: "Porta Hotel del Lago",
          direccion: "2a Avenida 6-17 Zona 2, Panajachel",
          descripcion: "Hotel familiar con piscina y restaurante.",
          precio: "$110 por noche",
          url: "https://www.portahotels.com/es/porta-hotel-del-lago",
          imagen: "hotel1.jpg"
        },
        {
          nombre: "Hotel Regis Spa",
          direccion: "Calle Santander, Panajachel",
          descripcion: "Hotel céntrico con spa y jardines.",
          precio: "$90 por noche",
          url: "https://www.hotelregis.com/",
          imagen: "hotel3.jpg"
        },
        {
          nombre: "Hotel Jardines del Lago",
          direccion: "Calle Monterrey, Panajachel",
          descripcion: "Hotel con muelle privado y jardines.",
          precio: "$100 por noche",
          url: "https://www.jardinesdellago.com/",
          imagen: "hotel3.jpg"
        },
        {
          nombre: "Hotel Posada de Don Rodrigo",
          direccion: "Final Calle Santander, Panajachel",
          descripcion: "Hotel tradicional con restaurante y vistas al lago.",
          precio: "$130 por noche",
          url: "https://www.posadadedonrodrigo.com/",
          imagen: "hotel4.jpg"
        },
        {
          nombre: "Hotel y Centro de Convenciones Jardines del Lago",
          direccion: "Calle Monterrey, Panajachel",
          descripcion: "Centro de convenciones y hotel junto al lago.",
          precio: "$105 por noche",
          url: "https://www.jardinesdellago.com/",
          imagen: "hotel5.jpg"
        },
        {
          nombre: "Hotel Utz Jay",
          direccion: "Calle 15 de Febrero, Panajachel",
          descripcion: "Hotel económico con jardín y desayuno incluido.",
          precio: "$60 por noche",
          url: "https://www.hotelutzjay.com/",
          imagen: "hotel6.jpg"
        },
        {
          nombre: "Hotel Dos Mundos",
          direccion: "Calle Santander, Panajachel",
          descripcion: "Hotel con piscina y restaurante italiano.",
          precio: "$95 por noche",
          url: "https://www.hoteldosmundos.com/",
          imagen: "hotel7.jpg"
        },
        {
          nombre: "Hotel La Riviera de Atitlán",
          direccion: "Zona 2, Panajachel",
          descripcion: "Hotel con apartamentos y piscina frente al lago.",
          precio: "$140 por noche",
          url: "https://www.larivieradeatitlan.com/",
          imagen: "hotel8.jpg"
        },
        {
          nombre: "Hotel El Sol",
          direccion: "Callejon Santa Elena, Panajachel",
          descripcion: "Hotel sencillo con ambiente familiar.",
          precio: "$50 por noche",
          url: "https://www.hotelelsolpanajachel.com/",
          imagen: "hotel9.jpg"
        },
        // ...continúa igual para los demás hoteles, incrementando el número...
      ],
      skipDuplicates: true
    });
    console.log('Resultado:', result);
  } catch (e) {
    console.error('Error al insertar hoteles:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();