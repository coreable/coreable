import _ from 'lodash';
import Faker from 'faker';
import { Industry } from '../models/Industry';
import { User } from '../models/User';
import { Group } from '../models/Group';
import { Team } from '../models/Team';
import { sequelize } from '../sequelize';

export const generator = new Promise((resolve, reject) => {
  let p = new Promise((resolve) => {
    // Start the chain
    resolve();
  })
  .then(() => {
    // Drop the database tables and rebuild
    return sequelize.sync({ force: true });
  })
  .then(() => {
    // Industry
    _.times(5, () => {
      return Industry.create({
        industryName: Faker.company.companyName(),
      });
    });
  })
  .then(() => {
    // Users
    _.times(15, () => {
      const industryID = Math.floor(Math.random() * (5-1) + 1);
      return User.create({
        firstName: Faker.name.firstName(),
        lastName: Faker.name.lastName(),
        email: Faker.internet.email(),
        industryID: industryID,
        cognitoID: Faker.random.alphaNumeric(5)
      });
    });
  })
  .then(() => {
    // Groups
    _.times(5, () => {
      const groupLeader = Math.floor(Math.random() * (15-1) + 1);
      const industryID = Math.floor(Math.random() * (5-1) + 1);
      return Group.create({
        teamName: Faker.company.companyName(),
        groupLeader: groupLeader,
        inviteCode: Faker.random.alphaNumeric(5),
        industryID: industryID
      });
    })
  })
  .then(() => {
    // Teams
    _.times(10, () => {
      const groupID = Math.floor(Math.random() * (5-1) + 1);
      const userID = Math.floor(Math.random() * (15-1) + 1);
      return Team.create({
        userID: userID,
        groupID: groupID
      });
    });
  })
  .catch((err) => reject(err))
  .then(() => resolve());
});
