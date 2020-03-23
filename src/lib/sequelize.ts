import { Sequelize } from 'sequelize';
import { SequelizeSimpleCache } from './cache';
import * as config from '../config/config.json';

// A hack to assign more properties to the library
const sqlcache = Object.assign(Sequelize);
// assign the Sequelize constructor to new library object
sqlcache.prototype.constructor = Sequelize;
// create the DAO with the Sequelize constructor
const sequelize = new sqlcache(config.DATABASE.SCHEMA, //database
  config.DATABASE.USERNAME, //username
  config.DATABASE.PASSWORD, //password
  {
    'dialect': config.DATABASE.DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | undefined,
    'host': config.DATABASE.HOST,
    'port': config.DATABASE.PORT,
});

// Import models
import * as Industry from '../models/Industry';
import * as User from '../models/User';
import * as Group from '../models/Group';
import * as Team from '../models/Team';
import * as Review from '../models/Review';

// Init models
Industry.sync(sequelize);
User.sync(sequelize);
Group.sync(sequelize);
Team.sync(sequelize);
Review.sync(sequelize);

Industry.assosciate();
User.assosciate();
Group.assosciate();
Team.associate();
Review.assosciate();

// register cache with sequelize models (5*60=5mins)
sequelize._cache = new SequelizeSimpleCache({
  User: { ttl: 5 * 60, limit: 50 },
  Industry: { ttl: 5 * 60, limit: 50 },
  Group: { ttl: 5 * 60, limit: 50 },
  Team: { ttl: 5 * 60, limit: 50 },
  Review: { ttl: 5 * 60, limit: 50 },
}, {
  debug: process.env.NODE_ENV === "development" ? true : false // debug output
});

// Replace the default model methods with the cache functions
// Caching can explicitly be bypassed like this:
// Model.noCache().findOne(...);
sequelize.models['Industry'] = sequelize._cache.init(sequelize.modelManager.addModel(Industry.Industry));
sequelize.models['User'] = sequelize._cache.init(sequelize.modelManager.addModel(User.User));
sequelize.models['Group'] = sequelize._cache.init(sequelize.modelManager.addModel(Group.Group));
sequelize.models['Team'] = sequelize._cache.init(sequelize.modelManager.addModel(Team.Team));
sequelize.models['Review'] = sequelize._cache.init(sequelize.modelManager.addModel(Review.Review));

export { sequelize };