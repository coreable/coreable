import { sequelize } from '../../sequelize';
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';

import { UserResolver } from './User';
import { TeamResolver } from './Team';

export const GroupResolver: GraphQLObjectType = new GraphQLObjectType({
  name: 'Group',
  description: 'This represents a Group',
  fields: () => {
    return {
      'groupID': {
        type: GraphQLInt,
        resolve(group) {
          return group.groupID;
        }
      },
      'teamName': {
        type: GraphQLString,
        resolve(group) {
          return group.teamName;
        }
      },
      'groupLeader': {
        type: GraphQLList(UserResolver),
        resolve(group) {
          return sequelize.models.User.findAll({ where: { userID: group.dataValues.groupLeader }})
        }
      },
      'industryID': {
        type: GraphQLInt,
        resolve(group) {
          return group.industryID;
        }
      },
      'team': {
        type: GraphQLList(TeamResolver),
        resolve(group) {
          return sequelize.models.Team.findAll({ where: { groupID: group.dataValues.groupID } });
        }
      }
    }
  }
});
