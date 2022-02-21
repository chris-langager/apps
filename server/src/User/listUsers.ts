// import { db } from '../db';
// import { User } from '../../types';
// import { parseRow, Row } from './row';

// export interface Input {
//   ids?: string[];
// }

// export interface Output {
//   users: User[];
// }

// export async function listUsers(input: Input = {}): Promise<Output> {
//   if (input.ids?.length === 0) {
//     return {
//       users: [],
//     };
//   }
//   const [conditionalsSQL, args] = buildWhereClause(input);

//   const query = `
//   SELECT *
//   FROM users
//   ${conditionalsSQL};`;

//   const rows = await db.any<Row>(query, args);

//   const users = rows.map(parseRow);
//   return { users };
// }

// function buildWhereClause(input: Input): [string, object] {
//   const conditionals: string[] = [];
//   if (input.ids) {
//     conditionals.push(`id in ($(ids:csv))`);
//   }

//   if (conditionals.length === 0) return ['', {}];
//   return [`WHERE ${conditionals.join(' AND ')}`, input];
// }
