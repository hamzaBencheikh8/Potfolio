import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test connection
pool.on('connect', () => {
    console.log('PostgreSQL Connected ✅');
});

pool.on('error', (err) => {
    console.error('PostgreSQL Error:', err);
});

export default pool;
