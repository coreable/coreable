import { server } from './lib/startup';
import { app } from './lib/express';
import { createServer, Server } from 'http';
import * as config from './config/config.json';

export default (
  async(): Promise<Server> => {
    await server.startup;
    return createServer(app).listen(config.HTTP.PORT, () => process.env.NODE_ENV === 'development' ? console.log(`Server running on http://localhost:${config.HTTP.PORT}`) : null);
  }
)();