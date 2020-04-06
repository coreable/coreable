import { Server } from 'http';
import { sequelize } from './sequelize';
import { generator } from './generator';

// server
let server = Object.create(Server);
server.prototype.constructor = Server;

// run the startup config
server.startup = (async () => {
  if (process.env.NODE_ENV === "development") {
    if (process.env.DATA_GENERATE) {
      await sequelize.sync({ force: true });
      await generator();
    }
  }
  if (process.env.NODE_ENV === "production") {
    await sequelize.authenticate();
  }
})().then(() => true);

export { server };