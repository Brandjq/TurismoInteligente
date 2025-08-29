"use client";
import { useState } from "react";

const interesesOpciones = [
  "Senderismo",
  "Lagos",
  "Montañas",
  "Cultura Maya",
  "Artesanías",
  "Gastronomía",
  "Fotografía",
  "Kayak",
  "Yoga",
  "Historia",
  "Naturaleza",
];

export default function RegisterPage() {
  if (typeof window !== "undefined") {
    const navbar = document.querySelector(".navbar");
    if (navbar) navbar.style.display = "none";
  }
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [intereses, setIntereses] = useState([]);

  const handleInteresChange = (interes) => {
    setIntereses(prev =>
      prev.includes(interes)
        ? prev.filter(i => i !== interes)
        : [...prev, interes]
    );
  };

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // Validación de campos obligatorios
    if (!nombre.trim() || !apellido.trim() || !correo.trim() || !password.trim() || !password2.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (password !== password2) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (intereses.length < 3) {
      setError("Selecciona al menos 3 actividades que te gustan hacer");
      return;
    }
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nombre + " " + apellido,
          email: correo,
          password,
          intereses,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al registrar usuario");
      } else {
        setSuccess("Usuario registrado con éxito");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1800);
      }
    } catch (err) {
      setError("Error de red o servidor");
    }
  };

  return (
    <main style={{maxWidth:'480px',margin:'3rem auto',padding:'2rem',background:'linear-gradient(135deg,#e0f7fa 0%,#fff 100%)',borderRadius:'24px',boxShadow:'0 4px 32px rgba(0,0,0,0.10)'}}>
      {error && <div style={{color:'#e53e3e',marginBottom:'1rem',fontWeight:600}}>{error}</div>}
      {success && <div style={{color:'#38b2ac',marginBottom:'1rem',fontWeight:600}}>{success}</div>}
      <h2 style={{fontSize:'2rem',fontWeight:800,color:'#234e70',marginBottom:'1.2rem'}}>Registro de usuario</h2>
      <form onSubmit={handleSubmit}>
        <div style={{marginBottom:'1.2rem'}}>
          <label htmlFor="nombre" style={{fontWeight:600,color:'#234e70'}}>Nombre:</label><br/>
          <input type="text" id="nombre" value={nombre} onChange={e=>setNombre(e.target.value)} required style={{width:'100%',padding:'0.7rem',borderRadius:'8px',border:'1.5px solid #3182ce',fontSize:'1.1rem',marginTop:'0.3rem'}} />
        </div>
        <div style={{marginBottom:'1.2rem'}}>
          <label htmlFor="apellido" style={{fontWeight:600,color:'#234e70'}}>Apellido:</label><br/>
          <input type="text" id="apellido" value={apellido} onChange={e=>setApellido(e.target.value)} required style={{width:'100%',padding:'0.7rem',borderRadius:'8px',border:'1.5px solid #3182ce',fontSize:'1.1rem',marginTop:'0.3rem'}} />
        </div>
        <div style={{marginBottom:'1.2rem'}}>
          <label htmlFor="correo" style={{fontWeight:600,color:'#234e70'}}>Correo electrónico:</label><br/>
          <input type="email" id="correo" value={correo} onChange={e=>setCorreo(e.target.value)} required style={{width:'100%',padding:'0.7rem',borderRadius:'8px',border:'1.5px solid #3182ce',fontSize:'1.1rem',marginTop:'0.3rem'}} />
        </div>
        <div style={{marginBottom:'1.2rem',position:'relative'}}>
          <label htmlFor="password" style={{fontWeight:600,color:'#234e70'}}>Contraseña:</label><br/>
          <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={e=>setPassword(e.target.value)} required style={{width:'100%',padding:'0.7rem',borderRadius:'8px',border:'1.5px solid #3182ce',fontSize:'1.1rem',marginTop:'0.3rem',letterSpacing:'0.2em'}} />
          <button type="button" onClick={()=>setShowPassword(!showPassword)} style={{position:'absolute',right:'12px',top:'38px',background:'none',border:'none',cursor:'pointer'}} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
            {showPassword ? (
              <svg width="22" height="22" fill="none" stroke="#234e70" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
            ) : (
              <svg width="22" height="22" fill="none" stroke="#234e70" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.07 21.07 0 0 1 5.06-7.06"/><path d="M1 1l22 22"/></svg>
            )}
          </button>
        </div>
        <div style={{marginBottom:'1.2rem',position:'relative'}}>
          <label htmlFor="password2" style={{fontWeight:600,color:'#234e70'}}>Confirmar contraseña:</label><br/>
          <input type={showPassword2 ? "text" : "password"} id="password2" value={password2} onChange={e=>setPassword2(e.target.value)} required style={{width:'100%',padding:'0.7rem',borderRadius:'8px',border:'1.5px solid #3182ce',fontSize:'1.1rem',marginTop:'0.3rem',letterSpacing:'0.2em'}} />
          <button type="button" onClick={()=>setShowPassword2(!showPassword2)} style={{position:'absolute',right:'12px',top:'38px',background:'none',border:'none',cursor:'pointer'}} aria-label={showPassword2 ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
            {showPassword2 ? (
              <svg width="22" height="22" fill="none" stroke="#234e70" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
            ) : (
              <svg width="22" height="22" fill="none" stroke="#234e70" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.07 21.07 0 0 1 5.06-7.06"/><path d="M1 1l22 22"/></svg>
            )}
          </button>
        </div>
        <div style={{marginBottom:'1.5rem'}}>
          <label style={{fontWeight:600,color:'#234e70',marginBottom:'0.5rem',display:'block'}}>¿Qué te gusta hacer? <span style={{color:'#e53e3e'}}>*</span></label>
          <div style={{display:'flex',flexWrap:'wrap',gap:'0.7rem'}}>
            {interesesOpciones.map(opcion => (
              <label key={opcion} style={{background:'#e0f7fa',borderRadius:'8px',padding:'0.5rem 1rem',boxShadow:'0 2px 8px #3182ce11',cursor:'pointer',fontWeight:500}}>
                <input type="checkbox" checked={intereses.includes(opcion)} onChange={()=>handleInteresChange(opcion)} style={{marginRight:'0.5rem'}} />
                {opcion}
              </label>
            ))}
          </div>
          <div style={{color:'#e53e3e',fontSize:'0.98rem',marginTop:'0.5rem'}}>
            Debes seleccionar al menos 3 actividades.
          </div>
        </div>
        <button type="submit" style={{background:'linear-gradient(90deg,#3182ce 60%,#38b2ac 100%)',color:'#fff',padding:'0.8rem 1.5rem',borderRadius:'8px',fontWeight:700,fontSize:'1.1rem',border:'none',marginTop:'0.7rem',cursor:'pointer'}}>Registrarme</button>
      </form>
    </main>
  );
}
