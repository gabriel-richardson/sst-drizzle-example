import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate as mig } from 'drizzle-orm/node-postgres/migrator';
import { Config } from 'sst/node/config';
import { Pool } from 'pg';

const pool = new Pool({
  host: Config.DB_HOST,
  port: parseInt(Config.DB_PORT || ''),
  user: Config.DB_USER,
  password: Config.DB_PASS,
  database: Config.DB_NAME,
  ssl: true,
});

export const DB = drizzle(pool);
export const migrate = async (path: string) => {
  return mig(DB, { migrationsFolder: path });
};

export * as SQL from './index';
