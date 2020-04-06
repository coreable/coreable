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
    if (config.DATABASE[process.env["NODE_ENV"]].HOST === "localhost") {
      await generator();
    }
  }
  if (process.env.NODE_ENV === "production") {
    await sequelize.authenticate();
  }
})().then(() => true);

export { server };