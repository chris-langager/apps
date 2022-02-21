// export { getUser } from './getUser';
// export { upsertUser } from './upsertUser';

import { NewEvent, createEvent, listEvents } from '../store/events';

export interface User {
  id: string;
  username: string;
}

interface UserCreated {
  id: number;
  dateCreated: string;
  type: 'UserCreated';
  aggregateType: 'User';
  aggregateId: string;
  version: number;
  payload: {
    id: string;
    username: string;
  };
}

type Event = UserCreated;

export async function createUser(user: User) {
  const event: NewEvent = {
    type: 'UserCreated',
    aggregateType: 'User',
    aggregateId: user.id,
    version: 0,
    payload: user,
  };

  await createEvent(event);
}

export async function getUser({ id, username }: { id?: string; username?: string }) {}

export async function getUserById(id: string): Promise<User | null> {
  const events: Event[] = await listEvents<Event>();
  return events.reduce<User | null>(reducer, null);
}
// const reducer = (user: User, event: Event) => {
//   switch (event.type) {
//     case 'UserCreated':
//       return event.payload;
//     default:
//       ((type: never) => {
//         throw new Error(`did not account for type ${type}`);
//       })(event.type);
//   }
// };
function reducer(user: User | null, event: Event): User {
  switch (event.type) {
    case 'UserCreated':
      return event.payload;
    default:
      ((type: never) => {
        throw new Error(`did not account for type ${type}`);
      })(event.type);
  }
}
