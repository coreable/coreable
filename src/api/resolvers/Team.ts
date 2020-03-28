import { sequelize } from '../../lib/sequelize';
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import { Team } from '../../models/Team';

export const TeamResolver: GraphQLObjectType<Team> = new GraphQLObjectType({
  name: 'TeamResolver',
  description: 'This represents a Team',
  fields: () => {
    return {
      'teamID': {
        type: GraphQLString,
        resolve(team, args, context) {
          return team.teamID;
        }
      },
      'teamName': {
        type: GraphQLString,
        resolve(team, args, context) {
          return team.teamName;
        }
      },
      'inviteCode': {
        type: GraphQLString,
        resolve(team, args, context) {
          return team.inviteCode;
        }
      }
    }
  }
});
