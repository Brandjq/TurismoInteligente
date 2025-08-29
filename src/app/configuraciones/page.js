"use client";
import { useState } from "react";

export default function ConfiguracionesPage() {
  const [nombre, setNombre] = useState("Usuario Ejemplo");
  const [apellido, setApellido] = useState("");
  const [foto, setFoto] = useState(null);
  const [actividades, setActividades] = useState([]);
  const [nuevaActividad, setNuevaActividad] = useState("");
  const [historial, setHistorial] = useState([
    { fecha: "2025-08-01", accion: "Actualizó nombre" },
    { fecha: "2025-07-15", accion: "Cambió foto de perfil" },
    { fecha: "2025-07-01", accion: "Registró cuenta" },
  ]);

  const handleFotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <main style={{
      maxWidth: "600px",
      margin: "2rem auto",
      padding: "2rem",
      background: "linear-gradient(135deg, #e0f7fa 0%, #fff 100%)",
      borderRadius: "24px",
      boxShadow: "0 4px 32px rgba(0,0,0,0.10)"
    }}>
      <h2 style={{fontSize: "2rem", fontWeight: 800, color: "#234e70", marginBottom: "1.2rem"}}>Configuraciones de usuario</h2>
      <form style={{marginBottom: "2.5rem"}}>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", marginBottom: "2.2rem"}}>
          <label htmlFor="foto" style={{fontWeight:600, color:'#234e70', marginBottom:'0.7rem'}}>Foto de perfil:</label>
          <div style={{width:160, height:160, borderRadius:'50%', overflow:'hidden', boxShadow:'0 2px 12px #3182ce22', background:'#eee', display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'1rem'}}>
            {foto ? (
              <img src={foto} alt="Foto de perfil" style={{width:'100%',height:'100%',objectFit:'cover'}} />
            ) : (
              <span style={{color:'#aaa',fontSize:'2.2rem',textAlign:'center',fontWeight:700}}>Sin foto</span>
            )}
          </div>
          <input type="file" id="foto" accept="image/*" onChange={handleFotoChange} style={{marginBottom:'0.5rem'}} />
        </div>
        <div style={{marginBottom: "1.2rem"}}>
          <label htmlFor="nombre" style={{fontWeight:600, color:'#234e70'}}>Nombre:</label><br/>
          <input type="text" id="nombre" value={nombre} onChange={e => setNombre(e.target.value)} style={{width:'100%',padding:'0.7rem',borderRadius:'8px',border:'1.5px solid #3182ce',fontSize:'1.1rem',marginTop:'0.3rem'}} />
        </div>
        <div style={{marginBottom: "1.2rem"}}>
          <label htmlFor="apellido" style={{fontWeight:600, color:'#234e70'}}>Apellido:</label><br/>
          <input type="text" id="apellido" value={apellido} onChange={e => setApellido(e.target.value)} style={{width:'100%',padding:'0.7rem',borderRadius:'8px',border:'1.5px solid #3182ce',fontSize:'1.1rem',marginTop:'0.3rem'}} />
        </div>
        <div style={{marginBottom: "1.2rem"}}>
          <label htmlFor="actividades" style={{fontWeight:600, color:'#234e70'}}>Actividades favoritas:</label><br/>
          <div style={{display:'flex',gap:'0.7rem',marginBottom:'0.7rem'}}>
            <input type="text" id="nuevaActividad" value={nuevaActividad} onChange={e => setNuevaActividad(e.target.value)} placeholder="Agregar actividad..." style={{flex:1,padding:'0.7rem',borderRadius:'8px',border:'1.5px solid #3182ce',fontSize:'1.1rem'}} />
            <button type="button" onClick={()=>{
              if(nuevaActividad.trim() && !actividades.includes(nuevaActividad.trim())){
                setActividades([...actividades, nuevaActividad.trim()]);
                setNuevaActividad("");
              }
            }} style={{background:'linear-gradient(90deg, #3182ce 60%, #38b2ac 100%)',color:'#fff',padding:'0.7rem 1.2rem',borderRadius:'8px',fontWeight:700,fontSize:'1.1rem',border:'none',cursor:'pointer'}}>Agregar</button>
          </div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'0.5rem'}}>
            {actividades.map((act,idx)=>(
              <span key={idx} style={{background:'#e0f7fa',color:'#234e70',borderRadius:'16px',padding:'0.5rem 1rem',fontWeight:600,boxShadow:'0 2px 8px #3182ce11',display:'flex',alignItems:'center',gap:'0.5rem'}}>
                {act}
                <button type="button" onClick={()=>setActividades(actividades.filter((a,i)=>i!==idx))} style={{background:'none',border:'none',color:'#e53e3e',fontWeight:700,cursor:'pointer',fontSize:'1.1rem',marginLeft:'0.3rem'}}>×</button>
              </span>
            ))}
          </div>
        </div>
        <button type="button" style={{background:'linear-gradient(90deg, #3182ce 60%, #38b2ac 100%)',color:'#fff',padding:'0.8rem 1.5rem',borderRadius:'8px',fontWeight:700,fontSize:'1.1rem',border:'none',marginTop:'0.7rem',cursor:'pointer'}}>Guardar cambios</button>
      </form>
      <h3 style={{fontSize:'1.2rem',fontWeight:700,color:'#234e70',marginBottom:'1rem'}}>Historial de usuario</h3>
      <ul style={{listStyle:'none',padding:0,color:'#234e70'}}>
        {historial.map((item, idx) => (
          <li key={idx} style={{marginBottom:'0.7rem',background:'#e0f7fa',borderRadius:'8px',padding:'0.7rem 1rem',boxShadow:'0 2px 8px #3182ce11'}}>
            <span style={{fontWeight:600}}>{item.fecha}:</span> {item.accion}
          </li>
        ))}
      </ul>
    </main>
  );
}
