import { Event } from './types';

export interface Row {
  id: number;
  date_created: string;
  type: string;
  aggregate_type: string;
  aggregate_id: string;
  version: number;
  payload: object;
}

export function parseRow(row: Row): Event {
  return {
    id: row.id,
    dateCreated: row.date_created,
    type: row.type,
    aggregateType: row.aggregate_type,
    aggregateId: row.aggregate_id,
    version: row.version,
    payload: row.payload,
  };
}
