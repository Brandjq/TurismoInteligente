'use client';
import { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useRouter } from 'next/navigation';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Registrar solo los plugins originales
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function StatsPage() {
  const [reseñas, setReseñas] = useState([]);
  const router = useRouter();
  const reportRef = useRef(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => setReseñas(data));

    const match = document.cookie.match(/session=([^;]+)/);
    if (match) {
      try {
        const session = JSON.parse(decodeURIComponent(match[1]));
        setIsAdmin(session.isAdmin === true);
      } catch {}
    }
  }, []);

  // Calificaciones
  const calificaciones = [1, 2, 3, 4, 5];
  const calificacionesCount = calificaciones.map(
    n => reseñas.filter(r => r.calificacion === n).length
  );

  const ratingsData = {
    labels: calificaciones.map(n => `${n} estrellas`),
    datasets: [
      {
        label: 'Cantidad de calificaciones',
        data: calificacionesCount,
        backgroundColor: [
          '#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa'
        ],
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  // Lugares más visitados (dinámico)
  const lugares = [...new Set(reseñas.map(r => r.lugar))];
  const lugaresCount = lugares.map(
    lugar => reseñas.filter(r => r.lugar === lugar).length
  );

  const lugaresData = {
    labels: lugares,
    datasets: [
      {
        label: 'Visitas por lugar',
        data: lugaresCount,
        backgroundColor: [
          '#2563eb', '#22c55e', '#f59e42', '#e11d48', '#a21caf'
        ],
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  // Promedio de calificación por lugar
  const lugaresPromedio = lugares.map(lugar => {
    const reseñasLugar = reseñas.filter(r => r.lugar === lugar);
    const promedio = reseñasLugar.length
      ? (reseñasLugar.reduce((acc, r) => acc + r.calificacion, 0) / reseñasLugar.length).toFixed(2)
      : 0;
    return promedio;
  });

  const lugaresPromedioData = {
    labels: lugares,
    datasets: [
      {
        label: 'Promedio de calificación',
        data: lugaresPromedio,
        backgroundColor: [
          '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f87171'
        ],
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  // Usuarios más activos
  const usuarios = [...new Set(reseñas.map(r => r.nombre))];
  const usuariosCount = usuarios.map(
    nombre => reseñas.filter(r => r.nombre === nombre).length
  );

  const usuariosData = {
    labels: usuarios,
    datasets: [
      {
        label: 'Reseñas por usuario',
        data: usuariosCount,
        backgroundColor: [
          '#f87171', '#60a5fa', '#34d399', '#fbbf24', '#a78bfa'
        ],
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Distribución de Calificaciones',
        font: { size: 20 }
      },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.parsed.y} calificaciones`
        }
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, grid: { color: '#e5e7eb' } }
    }
  };

  const lugaresOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Lugares Más Visitados',
        font: { size: 20 }
      },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.parsed.y} visitas`
        }
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, grid: { color: '#e5e7eb' } }
    }
  };

  const lugaresPromedioOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Promedio de Calificación por Lugar',
        font: { size: 20 }
      },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.parsed.y} estrellas`
        }
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, max: 5, grid: { color: '#e5e7eb' } }
    }
  };

  const usuariosOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Usuarios Más Activos',
        font: { size: 20 }
      },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.parsed.y} reseñas`
        }
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, grid: { color: '#e5e7eb' } }
    }
  };

  // Resúmenes
  const totalReseñas = reseñas.length;
  const totalLugares = lugares.length;
  const totalUsuarios = usuarios.length;

  // Agrega ejemplos de lugares y usuarios si la BD está vacía
  useEffect(() => {
    if (reseñas.length === 0) {
      setReseñas([
        { nombre: 'Admin', lugar: 'Lago de Atitlán', calificacion: 5, comentario: 'Hermoso lugar', fecha: '2024-06-01' },
        { nombre: 'Juan', lugar: 'Cerro de Oro', calificacion: 4, comentario: 'Vista espectacular', fecha: '2024-06-02' },
        { nombre: 'Ana', lugar: 'Restaurante Típico', calificacion: 5, comentario: 'Comida deliciosa', fecha: '2024-06-03' },
        { nombre: 'Admin', lugar: 'Museo Cultural', calificacion: 3, comentario: 'Interesante historia', fecha: '2024-06-04' },
        { nombre: 'Juan', lugar: 'Mercado de Artesanías', calificacion: 4, comentario: 'Artesanías únicas', fecha: '2024-06-05' }
      ]);
    }
  }, [reseñas.length]);

  const handleDownloadPDF = async () => {
    const element = reportRef.current;
    if (!element) return;
    const canvas = await html2canvas(element, {
      scale: 1.2,
      useCORS: true
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let position = 10;
    let remainingHeight = imgHeight;

    // Si la imagen cabe en una sola página
    if (imgHeight <= pageHeight - 20) {
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    } else {
      // Si la imagen es más grande, dividir en varias páginas
      let pageCount = Math.ceil(imgHeight / (pageHeight - 20));
      for (let i = 0; i < pageCount; i++) {
        let sourceY = (canvas.height / imgHeight) * (i * (pageHeight - 20));
        let sourceHeight = (canvas.height / imgHeight) * (pageHeight - 20);
        let pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = sourceHeight;
        let ctx = pageCanvas.getContext('2d');
        ctx.drawImage(
          canvas,
          0,
          sourceY,
          canvas.width,
          sourceHeight,
          0,
          0,
          canvas.width,
          sourceHeight
        );
        let pageImgData = pageCanvas.toDataURL('image/png');
        if (i > 0) pdf.addPage();
        pdf.addImage(pageImgData, 'PNG', 10, 10, imgWidth, pageHeight - 20);
      }
    }
    pdf.save('reporte-reseñas.pdf');
  };

  // Sí, ahí es donde se descarga el reporte en PDF.
  // El botón "📄 Descargar PDF" ejecuta la función handleDownloadPDF,
  // que convierte el contenido visual del reporte (referenciado por reportRef) en PDF.

  const handleAceptarRuta = async () => {
    if (!usuarioId) return alert("No hay usuario autenticado");
    try {
      const res = await fetch('/api/rutas-generadas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuarioId,
          nombre: ruta.nombre || 'Ruta generada',
          itinerario: ruta.itinerario
        })
      });
      if (!res.ok) {
        const error = await res.json();
        alert("Error al guardar en la BD: " + (error.error || res.status));
        return;
      }
      // ...guardar en localStorage y redirigir...
      let rutasLocal = [];
      const local = localStorage.getItem('rutas_generadas');
      if (local) rutasLocal = JSON.parse(local);
      rutasLocal.push({
        usuarioId,
        nombre: ruta.nombre || 'Ruta generada',
        itinerario: ruta.itinerario,
        creadoEn: new Date().toISOString()
      });
      localStorage.setItem('rutas_generadas', JSON.stringify(rutasLocal));
      router.push('/rutas-generadas');
    } catch (err) {
      alert("Error de red o del servidor");
    }
  };

  if (!isAdmin) {
    return (
      <div style={{
        maxWidth: 600,
        margin: '4rem auto',
        padding: '2rem',
        textAlign: 'center',
        color: '#64748b',
        background: '#f1f5f9',
        borderRadius: 12
      }}>
        <h2>Acceso restringido</h2>
        <p>Solo el usuario administrador puede ver el reporte.</p>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: 800,
      margin: '2rem auto',
      padding: '2rem',
      background: '#f8fafc',
      borderRadius: 16,
      boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
    }}>
      <div ref={reportRef}>
        <h1 style={{ textAlign: 'center', color: '#111827' }}>Estadísticas de Reseñas</h1>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2563eb' }}>Resumen General</h2>
          <p>Total de Reseñas: {totalReseñas}</p>
          <p>Total de Lugares: {totalLugares}</p>
          <p>Total de Usuarios: {totalUsuarios}</p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2563eb' }}>Calificaciones</h2>
          <Bar data={ratingsData} options={chartOptions} />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2563eb' }}>Lugares Más Visitados</h2>
          <Bar data={lugaresData} options={lugaresOptions} />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2563eb' }}>Promedio de Calificación por Lugar</h2>
          <Bar data={lugaresPromedioData} options={lugaresPromedioOptions} />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2563eb' }}>Usuarios Más Activos</h2>
          <Bar data={usuariosData} options={usuariosOptions} />
        </div>
      </div>

      <div style={{
        marginTop: '2rem',
        textAlign: 'center'
      }}>
        <button
          onClick={handleDownloadPDF}
          style={{
            backgroundColor: '#2563eb',
            color: '#fff',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
        >
          📄 Descargar PDF
        </button>
      </div>
    </div>
  );
}

// Este archivo NO consume la API de OpenAI.
// Solo muestra estadísticas de reseñas usando datos de tu BD y gráficos.
// La API de OpenAI se consume en el endpoint /api/ruta-llm y desde la página de rutas inteligentes.

const actividades = [
  { nombre: 'Lagos', icon: '🌊' },
  { nombre: 'Senderismo', icon: '🥾' },
  { nombre: 'Artesanías', icon: '🧵' },
  { nombre: 'Gastronomía', icon: '🍲' },
  { nombre: 'Cultura', icon: '🏛️' },
  { nombre: 'Aventura', icon: '🚣' },
  { nombre: 'Fotografía', icon: '📸' },
  { nombre: 'Kayak', icon: '🛶' },
  { nombre: 'Ciclismo', icon: '🚴' },
  { nombre: 'Pesca', icon: '🎣' },
  { nombre: 'Avistamiento de aves', icon: '🦜' },
  { nombre: 'Museos', icon: '🏺' },
  { nombre: 'Mercados', icon: '🛒' },
  { nombre: 'Pueblos indígenas', icon: '🧑‍🌾' },
  { nombre: 'Relax', icon: '🧘' },
  { nombre: 'Café', icon: '☕' },
  { nombre: 'Miradores', icon: '🔭' },
  { nombre: 'Historia', icon: '📚' },
  { nombre: 'Parques', icon: '🏞️' },
  { nombre: 'Navegación', icon: '⛵' }
];