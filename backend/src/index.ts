import { findServer } from 'src/server';

(async () => {
  const server = await findServer();
  console.log('The Lowest Priority Server: ', server);
})();
