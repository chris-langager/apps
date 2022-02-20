export const ENV = {
  PORT: process.env.RUN_PORT || '4000',
  JWT_SECRET: process.env.JWT_SECRET || 'so secret',
  POSTGRES_DATABASE_URL: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/postgres',
};
