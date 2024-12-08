const { Client } = require('pg');

const client = new Client({
  connectionString: "postgresql://postgres.eycfbsdbtrxqoyfvjqho:Quickwrite1231234@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true",
  ssl: {
    rejectUnauthorized: false
  }
});

async function testConnection() {
  try {
    await client.connect();
    console.log('Connected to database!');
    const result = await client.query('SELECT NOW()');
    console.log('Database time:', result.rows[0].now);
  } catch (err) {
    console.error('Error connecting to database:', err);
  } finally {
    await client.end();
  }
}

testConnection(); 