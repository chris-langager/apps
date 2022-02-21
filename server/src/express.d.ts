import { User } from './User/types';

declare namespace Express {
  interface Request {
    user: User | null;
  }
}
