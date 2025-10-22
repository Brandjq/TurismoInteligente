import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Asegúrate de configurar esta variable de entorno
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Por favor, define la variable de entorno MONGODB_URI en tu archivo .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // Usar una conexión global en desarrollo para evitar múltiples conexiones
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En producción, crear una nueva conexión
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  return client.db(); // Retorna la base de datos predeterminada
}
