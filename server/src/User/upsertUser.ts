// import { User } from '../../types';
// import { db } from '../db';
// import { parseRow, Row } from './row';

// export interface Input {
//   id: string;
//   name: string;
// }

// export async function upsertUser(input: Input): Promise<User> {
//   const query = `
// INSERT INTO users (id, name)
// VALUES ($(id), $(name))
// ON CONFLICT (id)
// DO UPDATE SET date_updated = (now() at time zone 'utc'), name = $(name)
// RETURNING *;`;

//   const [row] = await db.any<Row>(query, input);
//   return parseRow(row);
// }
