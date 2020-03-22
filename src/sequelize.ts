import { Sequelize, Model } from 'sequelize';
import * as config from './config/config.json';

// export database
export const sequelize = new Sequelize(
  config.DATABASE.SCHEMA, //database
  config.DATABASE.USERNAME, //username
  config.DATABASE.PASSWORD, //password
  {
    'dialect': config.DATABASE.DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | undefined,
    'host': config.DATABASE.HOST,
    'port': config.DATABASE.PORT,
  }
);