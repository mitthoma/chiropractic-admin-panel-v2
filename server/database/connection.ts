import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

let db: PostgresJsDatabase | null = null;

export function getDbConnection() {
  if (!db) {
    const config = useRuntimeConfig();

    const connectionString = `postgres://${config.public.DB_USERNAME}:${config.public.DB_PASSWORD}@${config.public.DB_HOST}:${config.public.DB_PORT}/${config.public.DB_DATABASE}`;

    const client = postgres(connectionString);

    db = drizzle(client);
  }

  return db;
}

export default getDbConnection;