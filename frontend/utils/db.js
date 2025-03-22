import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon('postgresql://neondb_owner:npg_gYIW16yZDfKr@ep-yellow-meadow-a87skw56-pooler.eastus2.azure.neon.tech/neondb?sslmode=require');
export const db = drizzle(sql,{schema});
