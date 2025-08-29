"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const sololaImages = [
  '/mirador-atitlan.jpg',
  '/cerro.jpg',
  '/azul.jpg',
  '/lacustre.jpg',
  '/mapa.jpg',
  '/nahuala.jpg',
];

export default function HistoriaSolola() {
  // Estado para bloques de información agregados por el admin
  const [infoBlocks, setInfoBlocks] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [newText, setNewText] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [newLink, setNewLink] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingBlock, setPendingBlock] = useState(null);
  // Detecta si el usuario es admin desde la cookie de sesión
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const match = document.cookie.match(/session=([^;]+)/);
    if (match) {
      try {
        const session = JSON.parse(decodeURIComponent(match[1]));
        setIsAdmin(session.isAdmin === true);
      } catch {}
    }
  }, []);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (isMounted) {
      const saved = localStorage.getItem('historiaBlocks');
      if (saved) setInfoBlocks(JSON.parse(saved));
    }
  }, [isMounted]);
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('historiaBlocks', JSON.stringify(infoBlocks));
    }
  }, [infoBlocks, isMounted]);
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sololaImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main style={{
      maxWidth: '1200px',
      margin: '2.5rem auto',
      padding: '2.5rem 1.5rem',
      background: 'linear-gradient(135deg, #fffde7 0%, #e0f7fa 100%)',
      borderRadius: '28px',
      boxShadow: '0 4px 32px rgba(26,188,156,0.10)',
      width: '100%'
    }}>
      <style>{`
        .municipios-lista ul {
          font-size: 2.1rem;
        }
        .municipios-lista li {
          display: flex;
          align-items: center;
          gap: 0.7em;
          margin-bottom: 0.9em;
        }
        .municipio-mapa-icon {
          width: 2em;
          height: 2em;
          vertical-align: middle;
          color: #1976d2;
          flex-shrink: 0;
        }
        .municipio-nombre {
          font-weight: bold;
          font-size: 1.1em;
          letter-spacing: 0.5px;
        }
        .carrusel-solola {
          width: 100%;
          max-width: 1000px;
          aspect-ratio: 16/9;
          margin: 0 auto 2.5rem auto;
          border-radius: 28px;
          box-shadow: 0 8px 48px rgba(26,188,156,0.18);
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e0f7fa;
        }
        .carrusel-solola img, .carrusel-solola picture, .carrusel-solola span {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 28px;
          transition: opacity 0.7s;
        }
        .carrusel-indicadores {
          position: absolute;
          bottom: 18px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
        }
        .carrusel-indicador {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #1abc9c;
          opacity: 0.7;
          cursor: pointer;
        }
        .carrusel-indicador.activo {
          background: #1abc9c;
          opacity: 1;
        }
        .mapa-solola {
          width: 100%;
          max-width: 900px;
          height: auto;
          border-radius: 28px;
          margin: 0 auto 2.5rem auto;
          box-shadow: 0 8px 48px rgba(26,188,156,0.18);
          display: block;
        }
        .municipios-lista {
          background: #fff;
          border-radius: 22px;
          box-shadow: 0 2px 18px rgba(52,152,219,0.10);
          padding: 2.2rem 2rem;
          margin: 2.5rem auto 2.5rem auto;
          max-width: 900px;
        }
        .municipios-lista h2 {
          color: #1abc9c;
          font-size: 2.1rem;
          font-weight: bold;
          margin-bottom: 1.2rem;
        }
        .municipios-lista ul {
          columns: 2;
          font-size: 1.18rem;
          color: #263238;
          margin: 0;
          padding-left: 1.5rem;
        }
        @media (max-width: 900px) {
          .municipios-lista ul { columns: 1; }
        }
        .historia-solola {
          background: linear-gradient(120deg, #e1f5fe 60%, #fff 100%);
          border-radius: 22px;
          box-shadow: 0 2px 18px rgba(26,188,156,0.10);
          padding: 2.5rem 2.2rem;
          margin: 0 auto 2.5rem auto;
          max-width: 1000px;
          font-size: 1.22rem;
          color: #263238;
          line-height: 1.7;
        }
        .historia-solola h2 {
          color: #1976d2;
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1.2rem;
        }
        .historia-solola h3 {
          color: #009688;
          font-size: 1.4rem;
          font-weight: bold;
          margin-top: 2rem;
          margin-bottom: 0.8rem;
        }
        /* RESPONSIVE STYLES */
        @media (max-width: 900px) {
          main {
            padding: 1.2rem 0.5rem !important;
            border-radius: 18px !important;
          }
          .carrusel-solola {
            max-width: 100vw;
            border-radius: 18px;
            aspect-ratio: 16/10;
          }
          .municipios-lista {
            padding: 1.2rem 0.7rem;
            border-radius: 14px;
            max-width: 98vw;
          }
          .historia-solola {
            padding: 1.2rem 0.7rem;
            border-radius: 14px;
            max-width: 98vw;
            font-size: 1rem;
          }
          .historia-solola h2 {
            font-size: 1.4rem;
          }
          .historia-solola h3 {
            font-size: 1.1rem;
          }
        }
        @media (max-width: 600px) {
          main {
            padding: 0.5rem 0.1rem !important;
            border-radius: 10px !important;
          }
          .carrusel-solola {
            max-width: 100vw;
            border-radius: 10px;
            aspect-ratio: 16/12;
          }
          .municipios-lista {
            padding: 0.7rem 0.2rem;
            border-radius: 8px;
            max-width: 99vw;
          }
          .historia-solola {
            padding: 0.7rem 0.2rem;
            border-radius: 8px;
            max-width: 99vw;
            font-size: 0.95rem;
          }
          .historia-solola h2 {
            font-size: 1.1rem;
          }
          .historia-solola h3 {
            font-size: 0.95rem;
          }
          .municipios-lista ul {
            font-size: 1rem;
          }
        }
        /* Flex containers responsive */
        @media (max-width: 900px) {
          .historia-solola > div,
          .historia-solola > section,
          .historia-solola > .flex {
            flex-direction: column !important;
            gap: 1.2rem !important;
            align-items: stretch !important;
          }
        }
        @media (max-width: 600px) {
          .historia-solola > div,
          .historia-solola > section,
          .historia-solola > .flex {
            flex-direction: column !important;
            gap: 0.7rem !important;
            align-items: stretch !important;
          }
        }
      `}</style>
      <h1 style={{
        fontSize: '3.2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1a237e',
        marginBottom: '2.2rem',
        textShadow: '2px 2px 12px #b2ebf2',
        wordBreak: 'break-word',
        lineHeight: '1.1',
        maxWidth: '98vw'
      }}>
        Historia y Datos del Departamento de Sololá
      </h1>
      <div className="carrusel-solola">
        <Image
          src={sololaImages[current]}
          alt="Lugar turístico de Sololá"
          width={1280}
          height={720}
          style={{
            objectFit: 'contain',
            width: '100%',
            height: '100%',
            maxWidth: '100vw',
            maxHeight: '60vh'
          }}
        />
        <div className="carrusel-indicadores">
          {sololaImages.map((_, idx) => (
            <span
              key={idx}
              className={"carrusel-indicador" + (current === idx ? " activo" : "")}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>
      <section className="municipios-lista">
        <h2>Municipios de Sololá</h2>
        <ul>
          {[
            { nombre: 'Sololá (cabecera departamental)', maps: 'Sololá,+Guatemala' },
            { nombre: 'Concepción', maps: 'Concepción,+Sololá,+Guatemala' },
            { nombre: 'Panajachel', maps: 'Panajachel,+Sololá,+Guatemala' },
            { nombre: 'Santa Catarina Palopó', maps: 'Santa+Catarina+Palopó,+Sololá,+Guatemala' },
            { nombre: 'San Antonio Palopó', maps: 'San+Antonio+Palopó,+Sololá,+Guatemala' },
            { nombre: 'Santa Clara La Laguna', maps: 'Santa+Clara+La+Laguna,+Sololá,+Guatemala' },
            { nombre: 'Santa Cruz La Laguna', maps: 'Santa+Cruz+La+Laguna,+Sololá,+Guatemala' },
            { nombre: 'Santa Lucía Utatlán', maps: 'Santa+Lucía+Utatlán,+Sololá,+Guatemala' },
            { nombre: 'Santa María Visitación', maps: 'Santa+María+Visitación,+Sololá,+Guatemala' },
            { nombre: 'San Andrés Semetabaj', maps: 'San+Andrés+Semetabaj,+Sololá,+Guatemala' },
            { nombre: 'San José Chacayá', maps: 'San+José+Chacayá,+Sololá,+Guatemala' },
            { nombre: 'San Juan La Laguna', maps: 'San+Juan+La+Laguna,+Sololá,+Guatemala' },
            { nombre: 'San Lucas Tolimán', maps: 'San+Lucas+Tolimán,+Sololá,+Guatemala' },
            { nombre: 'San Marcos La Laguna', maps: 'San+Marcos+La+Laguna,+Sololá,+Guatemala' },
            { nombre: 'San Pablo La Laguna', maps: 'San+Pablo+La+Laguna,+Sololá,+Guatemala' },
            { nombre: 'San Pedro La Laguna', maps: 'San+Pedro+La+Laguna,+Sololá,+Guatemala' },
            { nombre: 'San Juan La Laguna', maps: 'San+Juan+La+Laguna,+Sololá,+Guatemala' },
            { nombre: 'San Jorge La Laguna', maps: 'San+Jorge+La+Laguna,+Sololá,+Guatemala' },
            { nombre: 'Santiago Atitlán', maps: 'Santiago+Atitlán,+Sololá,+Guatemala' },
          ].map((m, idx) => (
            <li key={idx}>
              <a href={`https://www.google.com/maps/place/${m.maps}`} target="_blank" rel="noopener noreferrer" style={{display:'flex',alignItems:'center',gap:'0.7em',color:'#1976d2',textDecoration:'none'}}>
                <svg className="municipio-mapa-icon" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="10" r="3.5" stroke="#1976d2" strokeWidth="2"/><path d="M12 21c-4.5-5-7-8.5-7-12A7 7 0 0 1 19 9c0 3.5-2.5 7-7 12z" stroke="#1976d2" strokeWidth="2" fill="#b3e5fc"/></svg>
                <span className="municipio-nombre">{m.nombre}</span>
              </a>
            </li>
          ))}
        </ul>
        <div style={{marginTop:'1.5rem',fontSize:'1.08rem',color:'#1976d2'}}>
          <b>Superficie:</b> 1,061 km² &nbsp;|&nbsp; <b>Población:</b> ~421,583 (2023) &nbsp;|&nbsp; <b>Altitud:</b> 2,114 msnm
        </div>
      </section>
      <section className="historia-solola">
        <h2>Historia de Sololá</h2>
        <div style={{display:'flex',gap:'2.2rem',flexWrap:'wrap',alignItems:'center',marginBottom:'2.2rem'}}>
          <div style={{flex:'1 1 320px',minWidth:260,maxWidth:400}}>
            <Image src="/habitantes.jpg" alt="Habitantes de Sololá" width={400} height={260} style={{borderRadius:18,objectFit:'cover',width:'100%',marginBottom:8}} />
            <Image src="/textiles.jpg" alt="Textiles de Sololá" width={400} height={260} style={{borderRadius:18,objectFit:'cover',width:'100%'}} />
          </div>
          <div style={{flex:'2 1 420px',minWidth:320}}>
            <p>
              El departamento de Sololá, ubicado en la región occidental de Guatemala, es uno de los más emblemáticos por su riqueza cultural, histórica y natural. Su nombre proviene del vocablo kaqchikel &quot;tz&apos;oloj ya&apos;&quot;, que significa &quot;agua de sauce&quot;. Sololá es conocido por su impresionante Lago de Atitlán, rodeado de volcanes y pueblos mayas que conservan tradiciones ancestrales.
            </p>
          </div>
        </div>
        <h3>Época Precolombina</h3>
        <div style={{display:'flex',gap:'2.2rem',flexWrap:'wrap',alignItems:'center',marginBottom:'2.2rem'}}>
          <div style={{flex:'2 1 420px',minWidth:320}}>
            <p>
              Antes de la llegada de los españoles, la región de Sololá estuvo habitada principalmente por los pueblos mayas Kaqchikel, Tz&apos;utujil y K&apos;iche&apos;. Estos grupos establecieron ciudades-estado alrededor del lago y desarrollaron una economía basada en la agricultura, la pesca y el comercio. El lago era considerado sagrado y centro de numerosas leyendas y rituales.
            </p>
          </div>
          <div style={{flex:'1 1 320px',minWidth:260,maxWidth:400}}>
            <Image src="/mirador-atitlan.jpg" alt="Mirador Atitlán" width={400} height={260} style={{borderRadius:18,objectFit:'cover',width:'100%'}} />
          </div>
        </div>
        <h3>Conquista y Época Colonial</h3>
        <div style={{display:'flex',gap:'2.2rem',flexWrap:'wrap',alignItems:'center',marginBottom:'2.2rem'}}>
          <div style={{flex:'1 1 320px',minWidth:260,maxWidth:400}}>
            <Image src="/iglesia.jpg" alt="Iglesia colonial" width={400} height={260} style={{borderRadius:18,objectFit:'cover',width:'100%'}} />
          </div>
          <div style={{flex:'2 1 420px',minWidth:320}}>
            <p>
              En 1524, los conquistadores españoles, liderados por Pedro de Alvarado, llegaron a la región. Tras intensos enfrentamientos, los pueblos mayas fueron sometidos y se establecieron encomiendas. Durante la colonia, Sololá fue un importante centro administrativo y religioso. Se construyeron iglesias, conventos y caminos, y la evangelización transformó la vida social y cultural de la región.
            </p>
          </div>
        </div>
        <h3>Independencia y Siglo XIX</h3>
        <p>
          Tras la independencia de Guatemala en 1821, Sololá se constituyó oficialmente como departamento en 1839. Durante el siglo XIX, la región experimentó cambios políticos y sociales, incluyendo la reforma liberal, que afectó la tenencia de la tierra y la organización comunitaria. Sin embargo, las tradiciones indígenas se mantuvieron vivas.
        </p>
        <h3>Siglo XX: Modernización y Conflicto Armado</h3>
        <div style={{display:'flex',gap:'2.2rem',flexWrap:'wrap',alignItems:'center',marginBottom:'2.2rem'}}>
          <div style={{flex:'2 1 420px',minWidth:320}}>
            <p>
              El siglo XX trajo consigo la modernización de la infraestructura, el auge del turismo y la llegada de nuevas tecnologías. Sin embargo, Sololá también fue escenario de episodios del conflicto armado interno (1960-1996), que afectó a muchas comunidades. A pesar de las dificultades, la población mantuvo su identidad y tradiciones.
            </p>
          </div>
          <div style={{flex:'1 1 320px',minWidth:260,maxWidth:400}}>
            <Image src="/agricultura.jpg" alt="Agricultura en Sololá" width={400} height={260} style={{borderRadius:18,objectFit:'cover',width:'100%'}} />
          </div>
        </div>
        <h3>Actualidad</h3>
        <div style={{display:'flex',gap:'2.2rem',flexWrap:'wrap',alignItems:'center',marginBottom:'2.2rem'}}>
          <div style={{flex:'1 1 320px',minWidth:260,maxWidth:400}}>
            <Image src="/rostro.jpg" alt="Rostro Maya" width={400} height={260} style={{borderRadius:18,objectFit:'cover',width:'100%'}} />
          </div>
          <div style={{flex:'2 1 420px',minWidth:320}}>
            <p>
              Hoy, Sololá es un destino turístico de renombre internacional. El Lago de Atitlán es considerado uno de los más bellos del mundo. Los municipios que rodean el lago son famosos por su cultura, textiles, gastronomía y paisajes. La economía local se basa en el turismo, la agricultura (maíz, café, frutas), la pesca y la artesanía.
            </p>
          </div>
        </div>
        <h3>Datos Culturales y Sociales</h3>
        <ul>
          <li><b>Idiomas:</b> Kaqchikel, Tz&apos;utujil, K&apos;iche&apos; y español.</li>
          <li><b>Vestimenta:</b> Los trajes típicos varían por municipio y son reconocidos por sus colores y bordados.</li>
          <li><b>Fiestas:</b> Cada municipio celebra su feria patronal con música, danzas, procesiones y gastronomía típica.</li>
          <li><b>Artesanías:</b> Textiles, cerámica, tallados en madera y máscaras tradicionales.</li>
        </ul>
        <h3>Lugares Emblemáticos</h3>
        <ul>
          <li><b>Lago de Atitlán:</b> Rodeado de volcanes (San Pedro, Atitlán, Tolimán) y pueblos pintorescos.</li>
          <li><b>Miradores:</b> San Jorge, Santa Catarina Palopó, Cerro de la Cruz.</li>
          <li><b>Iglesias coloniales:</b> Sololá, Santiago Atitlán, San Juan La Laguna.</li>
          <li><b>Mercados:</b> El mercado de Sololá es uno de los más coloridos y auténticos de Guatemala.</li>
        </ul>
        <h3>Municipios y Breve Descripción</h3>
        <ul>
          <li><b>Sololá:</b> Cabecera departamental, centro administrativo y cultural.</li>
          <li><b>Panajachel:</b> Principal destino turístico, puerta de entrada al lago.</li>
          <li><b>Santiago Atitlán:</b> Famoso por su historia, arte y la deidad Maximón.</li>
          <li><b>San Pedro La Laguna:</b> Conocido por su ambiente relajado y escuelas de español.</li>
          <li><b>San Juan La Laguna:</b> Destacado por sus cooperativas de arte y textiles.</li>
          <li><b>Santa Catarina Palopó:</b> Famoso por sus casas pintadas y vistas al lago.</li>
          <li><b>San Lucas Tolimán:</b> Agricultura y vistas al volcán Tolimán.</li>
          <li><b>Santa Cruz La Laguna:</b> Accesible solo por lancha, tranquilidad y naturaleza.</li>
          <li><b>San Marcos La Laguna:</b> Espiritualidad, yoga y retiros.</li>
          <li><b>San Pablo, San Jorge, San Antonio, Santa Clara, Santa María, San Andrés, San José, Concepción:</b> Municipios con tradiciones propias, paisajes y cultura viva.</li>
        </ul>
        <h3>Gastronomía</h3>
<div style={{display:'flex',gap:'2.2rem',flexWrap:'wrap',alignItems:'center',marginBottom:'2.2rem'}}>
  <div style={{flex:'2 1 420px',minWidth:320}}>
    <p>
      Entre las leyendas más conocidas está la del &quot;Rostro Maya&quot;, la historia de Maximón y relatos sobre el origen del lago. 
      Personajes históricos incluyen líderes indígenas y promotores de la cultura local.
    </p>
  </div>
</div>

        <h3>Retos y Futuro</h3>
        <p>
          Sololá enfrenta desafíos como la conservación ambiental del lago, el desarrollo sostenible del turismo y la preservación de su cultura. Sin embargo, la fortaleza de sus comunidades y su riqueza natural y cultural auguran un futuro prometedor.
        </p>
        <div style={{marginTop:'2.5rem',textAlign:'center'}}>
          <Link href="/">
            <button style={{
              background: 'linear-gradient(90deg, #1abc9c 0%, #3498db 100%)',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              border: 'none',
              borderRadius: '18px',
              padding: '1rem 3rem',
              cursor: 'pointer',
              boxShadow: '0 6px 32px rgba(52,152,219,0.18)',
              transition: 'background 0.3s, transform 0.2s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1.2rem',
              fontFamily: 'Montserrat, Poppins, Arial, sans-serif',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Volver al inicio
            </button>
          </Link>
        </div>
      </section>
      {/* Bloques de información agregados por el admin, al final de la página */}
      {isMounted && infoBlocks.length > 0 && (
        <section style={{ margin: "2.5rem auto 0 auto", maxWidth: 900, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ fontSize: "2rem", color: "#2d3748", marginBottom: "1rem", textAlign: 'center' }}>Información adicional</h2>
          {infoBlocks.map((block, idx) => (
            <div key={idx} style={{ background: "#f7fafc", borderRadius: 12, padding: 16, marginBottom: 16, position: "relative", maxWidth: 420, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {block.image && (
                <Image src={block.image} alt="Imagen info" width={320} height={220} style={{ maxWidth: 320, borderRadius: 8, marginBottom: 8, display: 'block', marginLeft: 'auto', marginRight: 'auto', objectFit: 'cover' }} />
              )}
              <div style={{ fontSize: "1.1rem", color: "#222", marginBottom: 8, textAlign: 'center' }}>{block.text}</div>
              {block.link && (
                <a href={block.link} target="_blank" rel="noopener noreferrer">
                  <button style={{ background: "#3182ce", color: "white", border: "none", borderRadius: 8, padding: "0.5rem 1.2rem", fontWeight: "bold", fontSize: "1rem", cursor: "pointer", boxShadow: "0 2px 12px #3182ce33", marginBottom: 8 }}>
                    Ir al enlace
                  </button>
                </a>
              )}
              <button
                style={{ position: "absolute", top: 8, right: 8, background: "#e53e3e", color: "white", border: "none", borderRadius: "50%", width: 28, height: 28, fontSize: "1.1rem", cursor: "pointer" }}
                title="Suprimir bloque"
                onClick={() => {
                  setInfoBlocks(infoBlocks.filter((_, i) => i !== idx));
                }}
              >×</button>
            </div>
          ))}
        </section>
      )}
  {/* Editor local solo para admin al final */}
  {isMounted && isAdmin && (
        <section style={{ background: "#f8fafc", borderRadius: 16, padding: 28, margin: "2.5rem auto 2rem auto", maxWidth: 900, boxShadow: "0 4px 24px #3182ce22" }}>
          <h2 style={{ fontSize: "1.5rem", color: "#2b6cb0", marginBottom: 18, fontWeight: 700, letterSpacing: 0.5 }}>Agregar información dinámica</h2>
          <form style={{ display: "flex", flexDirection: "column", gap: 18 }} onSubmit={e => {
            e.preventDefault();
            if (newText.trim() !== "" || newImage || newLink) {
              setPendingBlock({ text: newText, image: newImage, link: newLink });
              setShowConfirm(true);
            }
          }}>
            <input
              type="url"
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              placeholder="Enlace (opcional, ej: https://...)"
              style={{ fontSize: "1rem", borderRadius: 8, border: "1px solid #90cdf4", padding: "10px 14px", background: "#fff" }}
            />
            {newLink && (
              <span style={{ color: newLink.startsWith('http') ? '#38a169' : '#e53e3e', fontSize: '0.98rem', marginTop: 2 }}>
                {newLink.startsWith('http') ? 'Enlace listo para guardar.' : 'El enlace debe comenzar con http:// o https://'}
              </span>
            )}
            <textarea
              value={newText}
              onChange={e => setNewText(e.target.value)}
              placeholder="Escribe la información aquí..."
              style={{ width: "100%", minHeight: 70, borderRadius: 8, border: "1px solid #90cdf4", padding: 10, fontSize: "1.08rem", background: "#fff" }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <label htmlFor="file-upload" style={{ fontWeight: 500, color: "#2b6cb0", marginBottom: 0 }}>Imagen (opcional):</label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={e => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = ev => setNewImage(ev.target.result);
                    reader.readAsDataURL(file);
                  } else {
                    setNewImage(null);
                  }
                }}
              />
              <label htmlFor="file-upload" style={{ background: "#3182ce", color: "white", borderRadius: 8, padding: "0.5rem 1.2rem", fontWeight: "bold", fontSize: "1rem", cursor: "pointer", boxShadow: "0 2px 12px #3182ce33", border: "none", marginRight: 8 }}>
                Seleccionar archivo
              </label>
              <span style={{ fontSize: "0.98rem", color: "#2b6cb0" }}>{newImage ? "Archivo seleccionado" : "Ningún archivo seleccionado"}</span>
            </div>
            {newImage && (
              <Image src={newImage} alt="Preview" width={220} height={140} style={{ maxWidth: 220, borderRadius: 10, marginBottom: 8, boxShadow: "0 2px 12px #3182ce33", objectFit: 'cover' }} />
            )}
            <button
              type="submit"
              style={{ background: "linear-gradient(90deg,#3182ce 60%,#63b3ed 100%)", color: "white", border: "none", borderRadius: 8, padding: "0.7rem 1.5rem", fontWeight: "bold", fontSize: "1.15rem", cursor: "pointer", boxShadow: "0 2px 12px #3182ce33", marginTop: 8, transition: "background 0.2s" }}
            >Agregar bloque</button>
          </form>
        </section>
      )}
      {showNotif && (
        <div style={{ background: '#38a169', color: 'white', padding: '18px 24px', borderRadius: 12, fontWeight: 'bold', fontSize: '1.15rem', marginBottom: 14, textAlign: 'center', boxShadow: '0 2px 18px #38a16933', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '1.25rem', marginBottom: 6 }}>✅ Información publicada</span>
          <button onClick={() => setShowNotif(false)} style={{ background: '#fff', color: '#38a169', border: 'none', borderRadius: 8, padding: '6px 22px', fontWeight: 'bold', fontSize: '1.08rem', cursor: 'pointer', boxShadow: '0 1px 6px #38a16922', marginTop: 4 }}>Aceptar</button>
        </div>
      )}
      {showConfirm && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: '#fff', padding: '32px 28px', borderRadius: 16, boxShadow: '0 2px 24px #2224', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, minWidth: 320 }}>
            <span style={{ fontSize: '1.18rem', fontWeight: 'bold', marginBottom: 8 }}>¿Estás de acuerdo en publicar esta información?</span>
            <div style={{ display: 'flex', gap: 24 }}>
              <button onClick={() => {
                if (pendingBlock) {
                  const updatedBlocks = [...infoBlocks, pendingBlock];
                  setInfoBlocks(updatedBlocks);
                  localStorage.setItem('historiaBlocks', JSON.stringify(updatedBlocks));
                  setNewText('');
                  setNewImage(null);
                  setNewLink("");
                  setShowNotif(true);
                }
                setShowConfirm(false);
                setPendingBlock(null);
              }} style={{ background: '#38a169', color: 'white', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 'bold', fontSize: '1.25rem', cursor: 'pointer', boxShadow: '0 1px 8px #38a16922' }}>✔️</button>
              <button onClick={() => { setShowConfirm(false); setPendingBlock(null); }} style={{ background: '#e53e3e', color: 'white', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 'bold', fontSize: '1.25rem', cursor: 'pointer', boxShadow: '0 1px 8px #e53e3e22' }}>❌</button>
            </div>
          </div>
        </div>
      )}
  </main>
  );
}
