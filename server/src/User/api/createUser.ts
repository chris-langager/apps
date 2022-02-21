import { RequestHandler } from 'express';
import { v4 as newId } from 'uuid';
import { login } from '../../authMiddleware';
import * as commands from '../commands';
import { UsernameAlreadyExists } from '../errors';

export const createUser: RequestHandler = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    res.statusCode = 400;
    res.json({ message: 'username is required' });
    return;
  }

  const user = { id: newId(), username };

  try {
    await commands.createUser(user);
  } catch (error) {
    if (error instanceof UsernameAlreadyExists) {
      res.statusCode = 400;
      res.json({ message: error.message });
      return;
    }
    res.statusCode = 500;
    console.log(error);
    res.json(error);
    return;
  }

  await login(req, res, user);
  res.json({ user });
};
