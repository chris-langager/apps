import * as store from './store';
import * as server from './server';

(async () => {
  console.log('running db migrations...');
  await store.migrate();

  server.start();
})();
