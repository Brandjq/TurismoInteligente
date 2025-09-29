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
      <button
        style={{
          backgroundColor: '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          fontWeight: '700',
          cursor: 'pointer',
          marginBottom: '1rem',
          marginRight: '1rem',
          transition: 'background 0.2s'
        }}
        onClick={() => router.push('/contacto')}
      >
        ← Regresar a Calificaciones
      </button>
      <button
        style={{
          backgroundColor: '#22c55e',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          fontWeight: '700',
          cursor: 'pointer',
          marginBottom: '1rem',
          transition: 'background 0.2s'
        }}
        onClick={handleDownloadPDF}
      >
        📄 Descargar PDF
      </button>
      <div ref={reportRef}>
        {/* Resumen arriba del reporte */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: '2rem',
          background: '#e0e7ff',
          borderRadius: '8px',
          padding: '1rem 0',
          fontWeight: '700',
          color: '#1e40af'
        }}>
          <div>Reseñas: {totalReseñas}</div>
          <div>Lugares: {totalLugares}</div>
          <div>Usuarios: {totalUsuarios}</div>
        </div>
        <h2 style={{textAlign:'center', color:'#2563eb', marginBottom:'2rem'}}>Reporte de Reseñas</h2>
        <div style={{marginBottom:'2rem'}}>
          <Bar data={ratingsData} options={chartOptions} />
        </div>
        <div style={{marginBottom:'2rem'}}>
          <Bar data={lugaresData} options={lugaresOptions} />
        </div>
        <div style={{marginBottom:'2rem'}}>
          <Bar data={lugaresPromedioData} options={lugaresPromedioOptions} />
        </div>
        <div>
          <Bar data={usuariosData} options={usuariosOptions} />
        </div>
      </div>
    </div>
  );
}
