CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY NOT NULL,
  date_created TIMESTAMP WITH TIME ZONE DEFAULT (now() at time zone 'utc'),
  type TEXT NOT NULL,
  aggregate_type TEXT NOT NULL,
  aggregate_id TEXT NOT NULL,
  version INTEGER NOT NULL,
  payload JSON NOT NULL,
  UNIQUE (aggregate_id, version)
);

CREATE INDEX IF NOT EXISTS type_index ON events (type);
CREATE INDEX IF NOT EXISTS aggregate_id_index ON events (aggregate_id);