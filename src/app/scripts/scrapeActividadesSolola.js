// src/app/scripts/scrapeActividadesSolola.js
import axios from 'axios';
import * as cheerio from 'cheerio';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function scrape() {
  try {
    const url = 'https://www.guatemala.com/guias/aventura/lugares-que-tienes-que-visitar-si-viajas-a-solola-guatemala/';
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    // Aquí debes adaptar el selector a donde estén las actividades en la página:
    // Por ejemplo, si las actividades están en <h2> o <li>:
    const actividades = [];

    $('h2, h3, li').each((i, el) => {
      const nombre = $(el).text().trim();
      if (nombre.length > 5) {
        actividades.push(nombre);
      }
    });

    console.log(`Encontradas ${actividades.length} actividades.`);

    for (const nombre of actividades) {
      // Guarda la actividad solo si no existe
      const existe = await prisma.actividad.findUnique({ where: { nombre } });
      if (!existe) {
        await prisma.actividad.create({
          data: { nombre, descripcion: null }
        });
        console.log('Guardado:', nombre);
      } else {
        console.log('Ya existe:', nombre);
      }
    }

    console.log('Scraping y guardado finalizado.');
  } catch (error) {
    console.error('Error en scraping:', error);
  } finally {
    await prisma.$disconnect();
  }
}

scrape();
