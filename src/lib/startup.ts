import { Server } from 'http';
import { sequelize } from './sequelize';
import * as config from '../config/config.json';
import { generator } from './generator';

// server
let server = Object.create(Server);
server.prototype.constructor = Server;

// run the startup config
server.startup = (async () => {
  if (process.env.NODE_ENV === "development") {
    await sequelize.sync({ force: true });
    if (config.DATABASE.HOST === "localhost") {
      await generator();
    }
  }
})().then(() => true);

export { server };