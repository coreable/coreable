import { sequelize } from '../../sequelize';
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import { GroupResolver } from './Group';
import { UserResolver } from './User';
import { Team } from '../../models/Team';

export const TeamResolver: GraphQLObjectType<Team> = new GraphQLObjectType({
  name: 'TeamResolver',
  description: 'This represents a Team',
  fields: () => {
    return {
      'groupID': {
        type: GraphQLInt,
        resolve(team) {
          return team.groupID;
        }
      },
      'userID': {
        type: GraphQLInt,
        resolve(team) {
          return team.userID;
        }
      },
      'group': {
        description: 'Gets the full details of the group from the groupID',
        type: GroupResolver,
        resolve(team, args) {
          args.groupID = team.groupID
          return sequelize.models.Group.findOne({ where: args });
        }
      },
      'user': {
        description: 'Gets the full details of the user from the UserID',
        type: UserResolver,
        args: {
          firstName: {
            type: GraphQLString
          },
          lastName: {
            type: GraphQLString
          },
          email: {
            type: GraphQLString
          }
        },
        resolve(team, args) {
          args.userID = team.userID;
          return sequelize.models.User.findOne({ where: args });
        }
      },
    }
  }
});
