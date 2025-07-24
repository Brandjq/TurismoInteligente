'use client';

export default function Contacto() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Contacto</h1>
      <p style={styles.description}>
        ¡Hola! Soy <strong>Brandon Nájera</strong>, encantado de ayudarte.
      </p>
      
      <div style={styles.infoBox}>
        <p><strong>Teléfono:</strong> <a href="tel:+50555315760" style={styles.link}>5531 5760</a></p>
        <p><strong>Email:</strong> <a href="mailto:brandonjnaujera0803@gmail.com" style={styles.link}>brandonjnaujera0803@gmail.com</a></p>
      </div>

      <h2 style={styles.subTitle}>¡Conectemos!</h2>
      <p style={styles.text}>
        Si tienes alguna pregunta o quieres colaborar, no dudes en contactarme.
        Estoy disponible para proyectos, asesorías o simplemente para charlar sobre tecnología y desarrollo web.
      </p>

      <div style={styles.socialContainer}>
        {/* Puedes agregar iconos o links a redes sociales aquí */}
        <a href="https://linkedin.com/in/brandon-najera" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
          LinkedIn
        </a>
        <a href="https://github.com/brandonnajera" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
          GitHub
        </a>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '3rem auto',
    padding: '1rem 2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#222',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    userSelect: 'none',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '0.5rem',
    textAlign: 'center',
    color: '#1e40af',
  },
  description: {
    fontSize: '1.25rem',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#334155',
  },
  infoBox: {
    backgroundColor: '#e0e7ff',
    padding: '1rem 2rem',
    borderRadius: '8px',
    fontSize: '1.1rem',
    marginBottom: '2rem',
    textAlign: 'center',
    color: '#1e3a8a',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: '600',
  },
  subTitle: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#1e40af',
    textAlign: 'center',
  },
  text: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    textAlign: 'center',
    color: '#475569',
    marginBottom: '2rem',
  },
  socialContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
  },
  socialLink: {
    fontSize: '1.15rem',
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: '700',
    borderBottom: '2px solid transparent',
    transition: 'border-color 0.3s ease',
    cursor: 'pointer',
  }
};
