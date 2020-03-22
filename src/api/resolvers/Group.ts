import { sequelize } from '../../sequelize';
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';

import { UserResolver } from './User';
import { TeamResolver } from './Team';
import { Group } from '../../models/Group';

export const GroupResolver: GraphQLObjectType<Group> = new GraphQLObjectType({
  name: 'GroupQuery',
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
        resolve(group: any) {
          return sequelize.models.User.findAll({ where: { userID: group.groupLeader }})
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
        resolve(group: any) {
          return sequelize.models.Team.findAll({ where: { groupID: group.groupID } });
        }
      }
    }
  }
});
