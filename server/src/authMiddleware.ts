import { RequestHandler } from 'express';
import { v4 as newId } from 'uuid';
import * as jwt from 'jsonwebtoken';
import { User, createUser, getUserById } from './User';
import { ENV } from './env';

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const { token } = req.cookies;

  let user = await getUserFromToken(token);

  if (!user) {
    user = {
      id: newId(),
      username: 'anonymous',
    };

    await createUser(user);
  }

  const updatedToken = await newToken(user);
  res.cookie('token', updatedToken, {
    httpOnly: true,
    expires: new Date('01 12 2050'),
  });

  req.user = user;
  next();
};

async function newToken(user: User): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(user, ENV.JWT_SECRET, (err, token) => {
      if (err || !token) {
        reject(err || 'token not present after signing');
      } else {
        resolve(token);
      }
    });
  });
}

async function getUserFromToken(token: string): Promise<User | null> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, ENV.JWT_SECRET, async (err, payload) => {
      if (err) {
        reject(err);
      } else {
        console.log({ payload });
        //@ts-ignore
        const user = await getUserById(payload.id);
        resolve(user);
      }
    });
  });
}
