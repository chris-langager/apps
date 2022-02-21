import { User, Event } from './types';
import { UnreachableCaseError } from '../errors';

export function reducer(user: User | null, event: Event): User {
  switch (event.type) {
    case 'UserCreated':
      return event.payload;
    default:
      throw new UnreachableCaseError(event.type);
  }
}
