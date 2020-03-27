import { sequelize } from '../../../lib/sequelize';
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';

import { Group } from '../../../models/Group';
import { UserResolver } from './UserResolver';
import { TeamResolver } from './TeamResolver';
import { IndustryResolver } from './IndustryResolver';

export const GroupResolver: GraphQLObjectType<Group> = new GraphQLObjectType({
  name: 'GroupResolver',
  description: 'This represents a Group',
  fields: () => {
    return {
      'groupID': {
        type: GraphQLInt,
        resolve(group, args, context) {
          return group.groupID;
        }
      },
      'groupName': {
        type: GraphQLString,
        resolve(group, args, context) {
          return group.groupName;
        }
      },
      'groupLeaderID': {
        type: GraphQLInt,
        resolve(group, args, context) {
          return group.groupLeaderID;
        }
      },
      'groupLeader': {
        type: UserResolver,
        resolve(group, args, context) {
          args.userID = group.groupLeaderID;
          return sequelize.models.User.findOne({ where: args });
        }
      },
      'industryID': {
        type: GraphQLInt,
        resolve(group, args, context) {
          return group.industryID;
        }
      },
      'industry': {
        description: 'The full industry details for the group',
        type: IndustryResolver,
        args: {
          industryID: {
            type: GraphQLInt
          },
          industryName: {
            type: GraphQLString
          }
        },
        resolve(group, args, context) {
          args.industryID = group.industryID;
          return sequelize.models.Industry.findOne({ where: args });
        }
      },
      'team': {
        description: 'The members of the group',
        type: GraphQLList(TeamResolver),
        resolve(group, args, context) {
          args.groupID = group.groupID;
          return sequelize.models.Team.findAll({ where: args });
        }
      }
    }
  }
});