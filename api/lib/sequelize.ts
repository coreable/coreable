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

// Identity
import * as User from '../identity/models/User';

// University
import * as UniveristyManager from '../enterprise/university/models/Manager';

import * as UniversityOrganisation from '../enterprise/university/models/Organisation';
import * as UniversityOrganisationAverage from '../enterprise/university/models/OrganisationAverage';

import * as UniversityUser from '../enterprise/university/models/User';
import * as UniversityUserAverage from '../enterprise/university/models/UserAverage';
import * as UniversityUserReflectionAverage from '../enterprise/university/models/UserReflectionAverage';

import * as UniversityReview from '../enterprise/university/models/Review';

import * as UniversityTeam from '../enterprise/university/models/Team';
import * as UniversityTeamAverage from '../enterprise/university/models/TeamAverage';

import * as UniveristyTutorial from '../enterprise/university/models/Tutorial';
import * as UniversityTutorialAverage from '../enterprise/university/models/TutorialAverage';

import * as UniversitySubject from '../enterprise/university/models/Subject';
import * as UniversitySubjectAverage from '../enterprise/university/models/SubjectAverage';

import * as UniversityIndustry from '../enterprise/university/models/Industry';
import * as UniversityIndustryAverage from '../enterprise/university/models/IndustryAverage';

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

(async () => {
  try {
    await sequelize.query(`SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));`);
  } catch (err) {
    await sequelize.query(`SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));`);
  }
})().then(() => true);

_sequelize.sync = (async () => {
  // Identity
  User.sync(sequelize);

  // University
  UniveristyManager.sync(sequelize);

  UniversityOrganisation.sync(sequelize);
  UniversityOrganisationAverage.sync(sequelize);

  UniversityUser.sync(sequelize);
  UniversityUserAverage.sync(sequelize);
  UniversityUserReflectionAverage.sync(sequelize);

  UniversityTeam.sync(sequelize);
  UniversityTeamAverage.sync(sequelize);

  UniversityReview.sync(sequelize);

  UniversitySubject.sync(sequelize);
  UniversitySubjectAverage.sync(sequelize);

  UniversityIndustry.sync(sequelize);
  UniversityIndustryAverage.sync(sequelize);

  UniveristyTutorial.sync(sequelize);
  UniversityTutorialAverage.sync(sequelize);
})();

_sequelize.assosciate = (async () => {
  // Identity
  User.assosciate();

  // University
  UniveristyManager.assosciate();

  UniversityOrganisation.assosciate();
  UniversityOrganisationAverage.assosciate();

  UniversityUser.assosciate();
  UniversityUserAverage.assosciate();
  UniversityUserReflectionAverage.assosciate();

  UniversityTeam.assosciate();
  UniversityTeamAverage.assosciate();

  UniversityReview.assosciate();

  UniversitySubject.assosciate();
  UniversitySubjectAverage.assosciate();

  UniversityIndustry.assosciate();
  UniversityIndustryAverage.assosciate();

  UniveristyTutorial.assosciate();
  UniversityTutorialAverage.assosciate();
})();

export { sequelize };
