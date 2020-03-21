import { Sequelize, Model } from 'sequelize';
import * as config from './config/config.json';

export const sequelize = new Sequelize(
  config.DATABASE.SCHEMA, //database
  config.DATABASE.USERNAME, //username
  config.DATABASE.PASSWORD, //password
  {
    'dialect': 'mysql',
    'host': config.DATABASE.HOST,
    'port': config.DATABASE.PORT,
  }
);