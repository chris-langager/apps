import { db } from '../db';
import { Event } from './types';
import { parseRow, Row } from './row';

export interface Input {
  types?: string[];
  aggregateTypes?: string[];
  aggregateIds?: string[];
}

export async function listEvents<T extends Event>(input: Input = {}): Promise<T[]> {
  const [conditionalsSQL, args] = buildWhereClause(input);

  const query = `
  SELECT *
  FROM users
  ${conditionalsSQL}
  ORDER BY id ASC
  LIMIT 2000;`;

  const rows = await db.any<Row>(query, args);

  return rows.map(parseRow) as T[];
}

function buildWhereClause(input: Input): [string, object] {
  const conditionals: string[] = [];
  if (input.types) {
    conditionals.push(`type in ($(types:csv))`);
  }

  if (input.aggregateTypes) {
    conditionals.push(`aggregate_types in ($(aggregateTypes:csv))`);
  }

  if (input.aggregateIds) {
    conditionals.push(`aggregate_id in ($(aggregateIds:csv))`);
  }

  if (conditionals.length === 0) return ['', {}];
  return [`WHERE ${conditionals.join(' AND ')}`, input];
}
