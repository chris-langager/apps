import express from 'express';
import cookieParser from 'cookie-parser';

import { ENV } from './env';
import { authMiddleware } from './authMiddleware';

import * as userApi from './User/api';

const app = express();
const port = parseInt(ENV.PORT);

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(authMiddleware);

app.use(express.static('../client/dist'));

app.get('/api/message', (req, res) => res.json({ message: 'hello from the server' }));

app.get('/api/self', userApi.self);
app.get('/api/logout', userApi.logout);
app.post('/api/users', userApi.createUser);
app.get('/api/users', userApi.listUsers);

export function start() {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}...`);
  });
}
