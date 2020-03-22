import { sequelize } from '../../sequelize';
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} from 'graphql';

import { IndustryResolver } from './Industry';
import { User } from '../../models/User';
import { TeamResolver } from './Team';
import { ReviewResolver } from './Review';

export const UserResolver: GraphQLObjectType<User> = new GraphQLObjectType({
  name: 'UserResolver',
  description: 'This represents a User',
  fields: () => {
    return {
      'userID': {
        type: GraphQLInt,
        resolve(user) {
          return user.userID;
        }
      },
      'firstName': {
        type: GraphQLString,
        resolve(user) {
          return user.firstName;
        }
      },
      'lastName': {
        type: GraphQLString,
        resolve(user) {
          return user.lastName;
        }
      },
      'email': {
        type: GraphQLString,
        resolve(user) {
          return user.email
        }
      },
      'industryID': {
        type: GraphQLInt,
        resolve(user) {
          return user.industryID;
        }
      },
      'root': {
        type: GraphQLBoolean,
        resolve(user) {
          return user.root;
        }
      },
      'industry': {
        type: IndustryResolver,
        resolve(user: any) {
          return user.getIndustry();
        }
      },
      'teams': {
        type: GraphQLList(TeamResolver),
        resolve(user: any, args: any) {
          args.userID = user.userID;
          return sequelize.models.Team.findAll({ where: args });
        }
      },
      'selfReview': {
        type: ReviewResolver,
        resolve(user: any, args: any) {
          return sequelize.models.Review.findOne({ where: { subjectID: user.userID, completedByID: user.userID }});
        }
      },
      'reviews': {
        type: GraphQLList(ReviewResolver),
        resolve(user: any) {
          return sequelize.models.Review.findAll({ where: { subjectID: user.userID } });
        }
      },
      'reviewsCompleted': {
        type: GraphQLList(ReviewResolver),
        resolve(user: any) {
          return sequelize.models.Review.findAll({ where: { completedBy: user.userID } });
        }
      }
    }
  }
});