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
import { config } from '../config/config';

import * as User from '../models/User';
import * as Team from '../models/Team';
import * as Review from '../models/Review';
import * as Subject from '../models/Subject';
import * as Manager from '../models/Manager';
import * as Industry from '../models/Industry';
import * as IndustryAverage from '../models/IndustryAverage';
import * as SubjectAverage from '../models/SubjectAverage';
import * as TeamAverage from '../models/TeamAverage';

const _sequelize = Object.assign(Sequelize);
_sequelize.prototype.constructor = Sequelize;

const sequelize = new _sequelize(
  {
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
  }
);

_sequelize.sync = (async () => {
  User.sync(sequelize);
  Team.sync(sequelize);
  Review.sync(sequelize);
  Subject.sync(sequelize);
  Manager.sync(sequelize);
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
  Manager.assosciate();
  Industry.assosciate();
  IndustryAverage.assosciate();
  TeamAverage.assosciate();
  SubjectAverage.assosciate();
})();

(async() => {
  await sequelize.query(`SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));`);
  const qantas = await Subject.Subject.create({
    name: 'Qantas',
    state: 2
  });
  const investible = await Subject.Subject.create({
    name: 'Investible',
    state: 2
  });
  const n2 = await Subject.Subject.create({
    name: 'N2',
    state: 2
  });
  const qantasT = await Team.Team.create({
    name: 'Qantas001',
    inviteCode: 'Qantas001',
    subject_id: qantas._id
  });
  const investibleT = await Team.Team.create({
    name: 'Investible001',
    inviteCode: 'Investible001',
    subject_id: investible._id
  });
  const n2T = await Team.Team.create({
    name: 'N2',
    inviteCode: 'N2',
    subject_id: n2._id
  });
  console.log(qantasT);
  console.log(investibleT);
  console.log(n2T);
})().then(() => true);

export { sequelize };
