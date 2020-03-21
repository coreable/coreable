import { sequelize } from '../../sequelize';
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';

import { GroupResolver } from './Group';
import { UserResolver } from './User';

export const TeamResolver: GraphQLObjectType = new GraphQLObjectType({
  name: 'Team',
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
        type: GraphQLList(GroupResolver),
        resolve(team) {
          return sequelize.models.Group.findAll({ where: { groupID: team.dataValues.groupID } });
        }
      },
      'user': {
        type: GraphQLList(UserResolver),
        resolve(team) {
          return sequelize.models.User.findAll({ where: { userID: team.dataValues.userID } })
        }
      }
    }
  }
});
