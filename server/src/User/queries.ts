import { User, Event, AGGREGATE_TYPE } from './types';
import { listEvents } from '../store/events';
import { reducer } from './reducer';

export async function getUserById(id: string): Promise<User | null> {
  const events: Event[] = await listEvents<Event>({ aggregateTypes: [AGGREGATE_TYPE], aggregateIds: [id] });
  return events.reduce<User | null>(reducer, null);
}

export async function getUserByUsername(username: string): Promise<User | null> {
  /*
    Yes, we are really reading ever user event here. 
    No, this is not efficient.
  
    To make this more performant, there needs to be a read model set up.
    When that happens, you'll need to solve for the problem of usernames needing to be unique
    at time of user creation.
    */
  const users = await listUsers();

  return users.find((user) => user.username === username) || null;
}

export async function listUsers(): Promise<User[]> {
  const events: Event[] = await listEvents<Event>({ aggregateTypes: [AGGREGATE_TYPE] });

  const users = events.reduce((acc, event) => {
    acc[event.aggregateId] = reducer(acc[event.aggregateId], event);
    return acc;
  }, {} as Map<string, User>);

  return Object.values(users);
}
