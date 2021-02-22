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
import * as User from '../graphql/identity/models/User';
import * as Manager from '../graphql/identity/models/Manager';
import * as Industry from '../graphql/identity/models/Industry';
import * as IndustryAverage from '../graphql/identity/models/IndustryAverage';

// Results
import * as Review from '../graphql/results/models/Review';

// University
import * as UniversityOrganisation from '../graphql/university/models/Organisation';
import * as UniversityOrganisationAverage from '../graphql/university/models/OrganisationAverage';
import * as UniversityUser from '../graphql/university/models/User';
import * as UniversityUserAverage from '../graphql/university/models/UserAverage';
import * as UniversityUserReflectionAverage from '../graphql/university/models/UserReflectionAverage';
import * as UniversityTeam from '../graphql/university/models/Team';
import * as UniversityTeamAverage from '../graphql/university/models/TeamAverage';
import * as UniveristyTutorial from '../graphql/university/models/Tutorial';
import * as UniversityTutorialAverage from '../graphql/university/models/TutorialAverage';
import * as UniversitySubject from '../graphql/university/models/Subject';
import * as UniversitySubjectAverage from '../graphql/university/models/SubjectAverage';

// Reference
import * as ReferenceUser from '../graphql/reference/models/User';
import * as ReferenceInvite from '../graphql/reference/models/Invite';

// Replace the sequelize object to add custom methods
const _sequelize = Object.assign(Sequelize);
_sequelize.prototype.constructor = Sequelize;

// Create connection
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

// Update the cloud to fix my shitty SQL queries
(async () => {
  try {
    await sequelize.query(`SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));`);
  } catch (err) {
    await sequelize.query(`SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));`);
  }
})().then(() => true);

// Create all the tabels without associations
_sequelize.sync = (async () => {
  // Identity
  User.sync(sequelize);
  Manager.sync(sequelize);
  Industry.sync(sequelize);
  IndustryAverage.sync(sequelize);

  // Results
  Review.sync(sequelize);

  // University
  UniversityOrganisation.sync(sequelize);
  UniversityOrganisationAverage.sync(sequelize);
  UniversityUser.sync(sequelize);
  UniversityUserAverage.sync(sequelize);
  UniversityUserReflectionAverage.sync(sequelize);
  UniversityTeam.sync(sequelize);
  UniversityTeamAverage.sync(sequelize);
  UniversitySubject.sync(sequelize);
  UniversitySubjectAverage.sync(sequelize);
  UniveristyTutorial.sync(sequelize);
  UniversityTutorialAverage.sync(sequelize);

  // Reference
  ReferenceUser.sync(sequelize);
  ReferenceInvite.sync(sequelize);
})();

// Create table associations
_sequelize.assosciate = (async () => {
  // Identity
  User.assosciate();
  Manager.assosciate();
  Industry.assosciate();
  IndustryAverage.assosciate();

  // Results
  Review.assosciate();

  // University
  UniversityOrganisation.assosciate();
  UniversityOrganisationAverage.assosciate();
  UniversityUser.assosciate();
  UniversityUserAverage.assosciate();
  UniversityUserReflectionAverage.assosciate();
  UniversityTeam.assosciate();
  UniversityTeamAverage.assosciate();
  UniversitySubject.assosciate();
  UniversitySubjectAverage.assosciate();
  UniveristyTutorial.assosciate();
  UniversityTutorialAverage.assosciate();

  // Reference
  ReferenceUser.assosciate();
  ReferenceInvite.assosciate();
})();

export { sequelize };
