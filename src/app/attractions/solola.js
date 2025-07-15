// Importar estilos globales y componentes necesarios
import Image from 'next/image';

export default function Solola() {
  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold mb-4">Atractivos Turísticos en Sololá</h1>
      <p className="mb-4">
        Sololá es un departamento lleno de belleza natural y cultural. Aquí puedes explorar el majestuoso Lago de Atitlán, rodeado de volcanes y pueblos pintorescos.
      </p>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Lugares Destacados</h2>
        <ul className="list-disc pl-6">
          <li>Panajachel: La puerta al Lago de Atitlán.</li>
          <li>San Pedro La Laguna: Conocido por su ambiente relajado y vistas impresionantes.</li>
          <li>Santiago Atitlán: Rico en historia y tradiciones.</li>
        </ul>
      </section>
    </main>
  );
}