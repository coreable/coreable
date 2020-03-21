import { createServer } from 'http';
import { app } from './app';
import { sequelize } from './sequelize';
import * as config from './config/config.json';

// init models and sync database
import * as Industry from './models/Industry';
import * as User from './models/User';
import * as Group from './models/Group';
import * as Team from './models/Team';
import * as Review from './models/Review';

User.default;
Industry.default;
Group.default;
Team.default;
Review.default;

// Data Generator
import { generator } from './data/generator';

// run server
(async () => {
  if (process.env.NODE_ENV === "development") {
    await generator();
  }
  await sequelize.authenticate();
  createServer(app).listen(config.HTTP.PORT, () => console.log(`Server running on http://localhost:${config.HTTP.PORT}`));
})();