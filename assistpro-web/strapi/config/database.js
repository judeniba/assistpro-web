module.exports = ({ env }) => ({
  connection: {
    client: env('DATABASE_CLIENT'),
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'assistpro'),
      user: env('DATABASE_USERNAME', 'assistpro'),
      password: env('DATABASE_PASSWORD', 'assistpro'),
      ssl: env.bool('DATABASE_SSL', false),
    },
    debug: false,
  },
});
