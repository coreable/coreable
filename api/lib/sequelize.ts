/*
===========================================================================
Copyright (C) 2020 Coreable
This file is part of Coreable's source code.
Corables source code is free software; you can redistribute it
and/or modify it under the terms of the End-user license agreement.
Coreable's source code is distributed in the hope that it will be
useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
You should have received a copy of the license along with the 
Coreable source code.
===========================================================================
*/ 

import { Sequelize } from 'sequelize';

import * as User from '../models/User';
import * as Team from '../models/Team';
import * as Review from '../models/Review';
import * as Subject from '../models/Subject';
import * as Manager from '../models/Manager';

import dotenv from 'dotenv';

const env: string = `.env.${process.env.NODE_ENV}`;
let config: any = dotenv.config({ path: env });
config = config.parsed;

const _sequelize = Object.assign(Sequelize);
_sequelize.prototype.constructor = Sequelize;

const sequelize = new _sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    dialectOptions: {
      socketPath: process.env.MYSQL_SOCKETPATH
    }
  }
);
 
_sequelize.sync = (async () => {
  User.sync(sequelize);
  Team.sync(sequelize);
  Review.sync(sequelize);
  Subject.sync(sequelize);
  Manager.sync(sequelize);
})();

_sequelize.assosciate = (async () => {
  User.assosciate();
  Team.assosciate();
  Review.assosciate();
  Subject.assosciate();
  Manager.assosciate();
})();

export { sequelize };