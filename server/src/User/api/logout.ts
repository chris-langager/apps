import { RequestHandler } from 'express';
import * as authMiddleware from '../../authMiddleware';

export const logout: RequestHandler = async (req, res) => {
  authMiddleware.logout(res);
  res.json({ user: null });
};
