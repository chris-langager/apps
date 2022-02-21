import { RequestHandler } from 'express';

export const self: RequestHandler = async (req, res) => {
  res.json({ user: req.user || null });
};
