import { IMain, IDatabase } from 'pg-promise';
import pgPromise from 'pg-promise';
import { ENV } from '../env';

const pgp: IMain = pgPromise({
  // Initialization Options
});

export const db: IDatabase<any> = pgp(ENV.POSTGRES_DATABASE_URL);
