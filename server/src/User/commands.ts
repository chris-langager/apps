import { AGGREGATE_TYPE, User } from './types';
import { UsernameAlreadyExists } from './errors';
import { NewEvent, createEvent } from '../store/events';
import { getUserByUsername } from './queries';

export async function createUser(user: User) {
  const existingUser = await getUserByUsername(user.username);
  if (existingUser) {
    throw new UsernameAlreadyExists(user.username);
  }

  const event: NewEvent = {
    type: 'UserCreated',
    aggregateType: AGGREGATE_TYPE,
    aggregateId: user.id,
    version: 0,
    payload: user,
  };

  await createEvent(event);
}
