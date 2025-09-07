
import path from 'path';

export default ({ env }) => {
  // Check if the DATABASE_URL environment variable is set.
  const databaseUrl = env('DATABASE_URL');

  // If a DATABASE_URL is found, it means we are in a production or staging environment
  // and should use the PostgreSQL connection.
  if (databaseUrl) {
    return {
      connection: {
        client: 'postgres',
        connection: databaseUrl,
        // The ssl: true is required for a secure connection to Neon.
        ssl: {
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
      },
    };
  }

  // If no DATABASE_URL is set, fall back to a local SQLite database for local development.
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };
};

