export interface NewEvent {
  type: string;
  aggregateType: string;
  aggregateId: string;
  version: number;
  payload: object;
}

export type Event = {
  id: number;
  dateCreated: string;
} & NewEvent;
