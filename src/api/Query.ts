import { sequelize } from '../sequelize';
import { QueryInterface } from 'sequelize/types';
import { 
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString
} from "graphql";

import { UserResolver } from "./resolvers/User";
import { IndustryResolver } from './resolvers/Industry';
import { GroupResolver } from './resolvers/Group';
import { TeamResolver } from './resolvers/Team';
import { ReviewResolver } from './resolvers/Review';

export const Query: GraphQLObjectType<QueryInterface> = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: () => {
    return {
      'user': {
        type: new GraphQLList(UserResolver),
        args: {
          userID: {
            type: GraphQLInt
          },
          email: {
            type: GraphQLString
          },
          firstName: {
            type: GraphQLString
          },
          lastName: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          return sequelize.models.User.findAll({ where: args });
        }
      },
      'industry': {
        type: new GraphQLList(IndustryResolver),
        args: {
          industryID: {
            type: GraphQLInt
          },
          industryName: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          return sequelize.models.Industry.findAll({ where: args });
        }
      },
      'group': {
        type: new GraphQLList(GroupResolver),
        args: {
          groupID: {
            type: GraphQLInt
          },
          teamName: {
            type: GraphQLString
          },
          groupLeader: {
            type: GraphQLInt
          },
          industryID: {
            type: GraphQLInt
          },
          inviteCode: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          return sequelize.models.Group.findAll({ where: args });
        }
      },
      'team': {
        type: new GraphQLList(TeamResolver),
        args: {
          groupID: {
            type: GraphQLInt,
          },
          userID: {
            type: GraphQLInt
          }
        },
        resolve(root, args) {
          return sequelize.models.Team.findAll({ where: args });
        }
      },
      'review': {
        type: new GraphQLList(ReviewResolver),
        args: {
          reviewID: {
            type: GraphQLInt,
          },
          subjectID: {
            type: GraphQLInt,
          },
          completedBy: {
            type: GraphQLInt,
          }
        },
        resolve(root, args) {
          return sequelize.models.Review.findAll({ where: args });
        }
      }
    };
  }
});