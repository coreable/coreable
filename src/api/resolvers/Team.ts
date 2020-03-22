import { sequelize } from '../../sequelize';
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';

import { GroupResolver } from './Group';
import { UserResolver } from './User';
import { Team } from '../../models/Team';
import { ReviewResolver } from './Review';

export const TeamResolver: GraphQLObjectType<Team> = new GraphQLObjectType({
  name: 'TeamQuery',
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
        resolve(team: any) {
          return sequelize.models.Group.findAll({ where: { groupID: team.groupID } });
        }
      },
      'user': {
        type: GraphQLList(UserResolver),
        resolve(team: any) {
          return sequelize.models.User.findAll({ where: { userID: team.userID } })
        }
      },
      // 'teamReviews': {
      //   type: new GraphQLList(ReviewResolver),
        
      // }
    }
  }
});
