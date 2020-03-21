import { createServer } from 'http';
import { app } from './app';
import { sequelize } from './sequelize';
import * as config from './config/config.json';

// Data Generator
import { generator } from './data/generator';

// import models
import * as User from './models/User';
import * as Industry from './models/Industry';
import * as Group from './models/Group';
import * as Team from './models/Team';

// init models
User.default;
Industry.default;
Group.default;
Team.default;

// run server
(async () => {
  await sequelize.authenticate();
  if (config.ENV === "DEVELOPMENT") {
    generator.then(() => console.log('done'));
  }
  createServer(app).listen(config.HTTP.PORT, () => console.log(`Server running on port ${config.HTTP.PORT}`));
})();


console.log(process.argv);