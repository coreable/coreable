import { createServer } from 'http';
import { app } from './app';
import { sequelize } from './sequelize';
import * as config from './config/config.json';

// import models
import * as Industry from './models/Industry';
import * as User from './models/User';
import * as Group from './models/Group';
import * as Team from './models/Team';
import * as Review from './models/Review';
import * as Session from './models/Session';

// init models
User.default;
Industry.default;
Group.default;
Team.default;
Review.default;

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