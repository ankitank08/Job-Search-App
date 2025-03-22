/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://neondb_owner:npg_gYIW16yZDfKr@ep-yellow-meadow-a87skw56-pooler.eastus2.azure.neon.tech/neondb?sslmode=require',
    },
};