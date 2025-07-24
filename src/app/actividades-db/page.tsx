// src/app/actividades/page.tsx (por ejemplo)
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function ActividadesPage() {
  const actividades = await prisma.actividad.findMany({
    orderBy: { id: 'asc' },
  });

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Actividades en Sololá</h1>
      {actividades.length === 0 ? (
        <p>No hay actividades disponibles.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {actividades.map((act) => (
            <li key={act.id} style={{ marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '8px', padding: '1rem' }}>
              <h2 style={{ margin: 0 }}>{act.nombre}</h2>
              {act.descripcion && <p>{act.descripcion}</p>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
