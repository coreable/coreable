import { Sequelize } from 'sequelize';
import SequelizeSimpleCache from 'sequelize-simple-cache';
import * as config from '../config/config.json';

import * as User from '../models/User';
import * as Team from '../models/Team';
import * as Review from '../models/Review';
import * as Subject from '../models/Subject';
import * as Manager from '../models/Manager';
// import * as Billing from '../models/Billing';

const _sequelize = Object.assign(Sequelize);
_sequelize.prototype.constructor = Sequelize;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

const sequelize = new _sequelize(
  config.DATABASE[process.env["NODE_ENV"]].SCHEMA,   // DATABASE
  config.DATABASE[process.env["NODE_ENV"]].USERNAME, // USERNAME
  config.DATABASE[process.env["NODE_ENV"]].PASSWORD, // PASSWORD
  {
    'dialect': config.DATABASE[process.env["NODE_ENV"]].DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | undefined,
    'host': config.DATABASE[process.env["NODE_ENV"]].HOST,
    'port': config.DATABASE[process.env["NODE_ENV"]].PORT,
    'logging': console.log
  }
);

_sequelize.sync = (async () => {
  User.sync(sequelize);
  Team.sync(sequelize);
  Review.sync(sequelize);
  Subject.sync(sequelize);
  Manager.sync(sequelize);
  // Billing.sync(sequelize);
})();

_sequelize.assosciate = (async () => {
  User.assosciate();
  Team.assosciate();
  Review.assosciate();
  Subject.assosciate();
  Manager.assosciate();
  // Billing.assosciate();
})();

sequelize._cache = new SequelizeSimpleCache({
  User: { ttl: 50, limit: 50 },
  Team: { ttl: 50, limit: 50 },
  Review: { ttl: 50, limit: 50 },
  Subject: { ttl: 50, limit: 50 },
  Manager: { ttl: 50, limit: 50 },
}, {
  debug: process.env.NODE_ENV === "development" ? console.log : false
});

_sequelize.replace = (async () => {
  sequelize.models['User'] = sequelize._cache.init(sequelize.modelManager.addModel(User.User));
  sequelize.models['Team'] = sequelize._cache.init(sequelize.modelManager.addModel(Team.Team));
  sequelize.models['Review'] = sequelize._cache.init(sequelize.modelManager.addModel(Review.Review));
  sequelize.models['Subject'] = sequelize._cache.init(sequelize.modelManager.addModel(Subject.Subject));
  sequelize.models['Manager'] = sequelize._cache.init(sequelize.modelManager.addModel(Manager.Manager));
})();

export { sequelize };