import { NewEvent } from './types';
import { db } from '../db';
import { Row } from './row';

export async function createEvent(newEvent: NewEvent) {
  const query = `
INSERT INTO events (type, aggregate_type, aggregate_id, version, payload) 
VALUES ($(type), $(aggregateType), $(aggregateId), $(version), $(payload));`;

  await db.any<Row>(query, newEvent);
}
