import express from 'express';

import { ENV } from './env';

console.log('starting up!', { ENV });
const app = express();
const port = parseInt(ENV.PORT);

app.use(express.json());

app.use(express.static('../client/dist'));

app.get('/api/message', (req, res) => res.json({ message: 'hello from the server' }));

export function start() {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}...`);
  });
}
