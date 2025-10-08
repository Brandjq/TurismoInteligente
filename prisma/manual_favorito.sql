-- Crea la tabla Favorito en Neon/Postgres usando la tabla users (con campos: id, name, email, password)

CREATE TABLE IF NOT EXISTS "Favorito" (
  id SERIAL PRIMARY KEY,
  "usuarioId" INTEGER NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  itinerario JSONB NOT NULL,
  "creadoEn" TIMESTAMP DEFAULT NOW()
);

