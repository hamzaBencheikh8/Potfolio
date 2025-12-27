import pool from '../config/database.js';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runMigration() {
    try {
        console.log('🚀 Running migration: Seed initial projects...\n');

        // Read migration SQL
        const migrationSQL = await fs.readFile(
            join(__dirname, '003_seed_initial_projects.sql'),
            'utf-8'
        );

        // Split SQL statements (simple approach)
        const statements = migrationSQL
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

        // Execute each statement
        for (const statement of statements) {
            if (statement.toLowerCase().includes('insert into')) {
                await pool.query(statement);
                console.log('✅ Projects inserted successfully');
            } else if (statement.toLowerCase().includes('select')) {
                const result = await pool.query(statement);
                console.log('\n📊 Current projects in database:');
                console.table(result.rows);
            }
        }

        console.log('\n✅ Migration completed successfully!\n');

        await pool.end();
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error.message);
        console.error('Full error:', error);
        await pool.end();
        process.exit(1);
    }
}

runMigration();
