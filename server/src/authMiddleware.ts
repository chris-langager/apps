import { RequestHandler, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { User, getUserById } from './User';
import { ENV } from './env';

declare global {
  namespace Express {
    interface Request {
      user: User | null;
    }
  }
}

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const { token } = req.cookies;

  let user = await getUserFromToken(token);

  if (!user) {
    req.user = null;
    next();
    return;
  }

  const updatedToken = await newToken(user);
  res.cookie('token', updatedToken, {
    httpOnly: true,
    expires: new Date('01 12 2050'),
  });

  req.user = user;
  next();
};

export async function login(req: Request, res: Response, user: User) {
  const updatedToken = await newToken(user);
  res.cookie('token', updatedToken, {
    httpOnly: true,
    expires: new Date('01 12 2050'),
  });

  req.user = user;
}

export async function logout(res: Response) {
  res.clearCookie('token');
}

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
  if (!token) {
    return null;
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, ENV.JWT_SECRET, async (err, payload) => {
      if (err) {
        reject(err);
      } else {
        //@ts-ignore
        const user = await getUserById(payload.id);
        resolve(user);
      }
    });
  });
}
