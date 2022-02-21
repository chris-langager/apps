import { RequestHandler } from 'express';
import * as queries from '../queries';

export const listUsers: RequestHandler = async (req, res) => {
  const users = await queries.listUsers();

  res.json({ users });
};
