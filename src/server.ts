import { createServer, Server } from 'http';
import { app } from './app';
import { sequelize } from './lib/sequelize';
import * as config from './config/config.json';

// Data Generator
import { generator } from './lib/generator';

// server
let server = Object.create(Server);
server.prototype.constructor = Server;

// run the server
server.load = (async () => {

  if (process.env.NODE_ENV === "development") {
    // generate fake data for testing
    await generator();
  }

  if (process.env.NODE_ENV !== "test") {
    // test we are connected to the database
    await sequelize.authenticate();
  }

  // start the server 
  server = createServer(app).listen(config.HTTP.PORT, () => process.env.NODE_ENV === 'development' ? console.log(`Server running on http://localhost:${config.HTTP.PORT}`) : null);

  // set server.load = true;
})().then(() => true);

export { server };