import Image from 'next/image';
import { eventosSolola } from '../../data/eventos';

export default function Recomendaciones() {
  return (
    <main style={{
      maxWidth: '1100px',
      margin: '2.5rem auto',
      padding: '2.5rem 1.5rem',
      background: 'linear-gradient(135deg, #e0f7fa 0%, #fff 100%)',
      borderRadius: '24px',
      boxShadow: '0 4px 32px rgba(0,0,0,0.10)'
    }}>
      <h1 style={{
        fontSize: '2.8rem',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1976d2',
        marginBottom: '2.2rem',
        textShadow: '2px 2px 12px #b2ebf2',
        fontFamily: 'Montserrat, Poppins, Arial, sans-serif',
      }}>
        Recomendaciones y Eventos en Sololá
      </h1>
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2.5rem',
        alignItems: 'center',
        width: '100%'
      }}>
        {eventosSolola.length === 0 && (
          <p style={{textAlign:'center',color:'#888'}}>No hay eventos registrados por el momento.</p>
        )}
        {eventosSolola.map((evento, idx) => (
          <div key={idx} style={{
            background: evento.destacado ? 'linear-gradient(90deg, #26c6da 60%, #1abc9c 100%)' : 'rgba(255,255,255,0.97)',
            borderRadius: '20px',
            boxShadow: '0 2px 24px rgba(52,152,219,0.13)',
            padding: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '2.2rem',
            width: '100%',
            maxWidth: '900px',
            color: evento.destacado ? '#fff' : '#263238',
            fontFamily: 'Poppins, Arial, sans-serif',
            position: 'relative',
          }}>
            <Image src={evento.imagen || '/lago.jpg'} alt={evento.nombre} width={180} height={120} style={{borderRadius:'14px',objectFit:'cover',boxShadow:'0 2px 12px rgba(26,188,156,0.13)'}} />
            <div>
              <h2 style={{fontSize:'2rem',fontWeight:'bold',marginBottom:'0.7rem',color: evento.destacado ? '#fff' : '#1976d2'}}>{evento.nombre}</h2>
              <div style={{fontSize:'1.1rem',marginBottom:'0.5rem'}}><b>Fecha:</b> {evento.fecha} &nbsp; <b>Lugar:</b> {evento.lugar}</div>
              <div style={{fontSize:'1.15rem',marginBottom:'0.5rem'}}>{evento.descripcion}</div>
              <div style={{fontSize:'0.95rem',color: evento.destacado ? '#e0f7fa' : '#888'}}>Fuente: {evento.fuente}</div>
            </div>
          </div>
        ))}
      </section>
      <div style={{marginTop:'2.5rem',textAlign:'center',color:'#888',fontSize:'1.1rem'}}>
        <b>¿Quieres ver eventos en tiempo real?</b> Próximamente podrás conectar eventos de Google o Facebook aquí.<br/>
        <span style={{fontSize:'0.95rem'}}>Por ahora, los eventos son agregados manualmente y verificados por el administrador.</span>
      </div>
    </main>
  );
}