export interface User {
  id: string;
  username: string;
}

export const AGGREGATE_TYPE = 'User' as const;

export interface UserCreated {
  id: number;
  dateCreated: string;
  type: 'UserCreated';
  aggregateType: typeof AGGREGATE_TYPE;
  aggregateId: string;
  version: number;
  payload: {
    id: string;
    username: string;
  };
}

export type Event = UserCreated;
