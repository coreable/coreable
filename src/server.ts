import { createServer } from 'http';
import { app } from './app';
import { sequelize } from './lib/sequelize';
import * as config from './config/config.json';

// Data Generator
import { generator } from './lib/generator';

// run server
(async () => {
  // generate fake data for testing
  if (process.env.NODE_ENV === "development") {
    await generator();
  }
  // test we are connected to the database
  await sequelize.authenticate();

  // start the server
  createServer(app).listen(config.HTTP.PORT, () => console.log(`Server running on http://localhost:${config.HTTP.PORT}`));
})();