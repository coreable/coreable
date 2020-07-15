/*
  ===========================================================================
    Copyright (C) 2020 Coreable
    This file is part of Coreable's source code.
    Coreables source code is free software; you can redistribute it
    and/or modify it under the terms of the End-user license agreement.
    Coreable's source code is distributed in the hope that it will be
    useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
    You should have received a copy of the license along with the 
    Coreable source code.
  ===========================================================================
*/

import { Sequelize } from 'sequelize';
import { config } from '../config/config';

(async () => {
  await sequelize.query(`SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));`);
})().then(() => true);

import * as User from '../enterprise/university/models/User';
import * as Team from '../enterprise/university/models/Team';
import * as Review from '../enterprise/university/models/Review';
import * as Subject from '../enterprise/university/models/Subject';
import * as Industry from '../enterprise/university/models/Industry';
import * as IndustryAverage from '../enterprise/university/models/IndustryAverage';
import * as SubjectAverage from '../enterprise/university/models/SubjectAverage';
import * as TeamAverage from '../enterprise/university/models/TeamAverage';

var fs = require('fs');
var path = require('path');
var walk = function (dir: string, done: Function) {
  let results: any[] = [];
  fs.readdir(dir, function (err: any, list: any) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function (file: any) {
      file = path.resolve(dir, file);
      fs.stat(file, function (err: any, stat: any) {
        if (stat && stat.isDirectory()) {
          walk(file, function (err: any, res: any) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

const _sequelize = Object.assign(Sequelize);
_sequelize.prototype.constructor = Sequelize;

const sequelize = new _sequelize({
  username: config.MYSQL_USERNAME,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE,
  dialect: 'mysql',
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  logging: config.NODE_ENV === "development" ? console.log : null,
  dialectOptions: {
    socketPath: config.MYSQL_SOCKETPATH,
    supportBigNumbers: true,
    decimalNumbers: true
  }
});

_sequelize.sync = (async () => {
  User.sync(sequelize);
  Team.sync(sequelize);
  Review.sync(sequelize);
  Subject.sync(sequelize);
  Industry.sync(sequelize);
  IndustryAverage.sync(sequelize);
  TeamAverage.sync(sequelize);
  SubjectAverage.sync(sequelize);
})();

_sequelize.assosciate = (async () => {
  User.assosciate();
  Team.assosciate();
  Review.assosciate();
  Subject.assosciate();
  Industry.assosciate();
  IndustryAverage.assosciate();
  TeamAverage.assosciate();
  SubjectAverage.assosciate();
})();

export { sequelize };
