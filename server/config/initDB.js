import pool from './database.js';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function initializeDatabase() {
    try {
        // Read schema SQL
        const schemaSQL = await fs.readFile(join(__dirname, 'schema.sql'), 'utf-8');

        // Execute schema
        await pool.query(schemaSQL);

        console.log('✅ Database tables initialized successfully');
    } catch (error) {
        console.error('❌ Database initialization error:', error);
        throw error;
    }
}

export default initializeDatabase;
