import { sequelize } from '../../lib/sequelize';
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} from 'graphql';

import { User } from '../../models/User';
import { TeamResolver } from './Team';

export const UserResolver: GraphQLObjectType<User> = new GraphQLObjectType({
  name: 'UserResolver',
  description: 'This represents a User',
  fields: () => {
    return {
      'userID': {
        type: GraphQLString,
        resolve(user, args, context) {
          return user.userID;
        }
      },
      'firstName': {
        type: GraphQLString,
        resolve(user, args, context) {
          return user.firstName;
        }
      },
      'lastName': {
        type: GraphQLString,
        resolve(user, args, context) {
          return user.lastName;
        }
      },
      'email': {
        type: GraphQLString,
        resolve(user, args, context) {
          return user.email
        }
      },
      'teams': {
        type: GraphQLList(TeamResolver),
        resolve(user: any, args: any, context: any) {
          console.log(context);
          return user.getTeams();
        }
      },
      // 'reviewSelf': {
      //   type: ReviewResolver,
      //   async resolve(user: any, args: any, context: any) {
      //     args.subjectID = user.userID;
      //     args.completedByID = user.userID;
      //     return await sequelize.models.Review.findOne({ where: args });
      //   }
      // },
      // 'reviewResults': {
      //   type: GraphQLList(ReviewResolver),
      //   resolve(user: any, args, context: any) {
      //     args.subjectID = user.userID;
      //     return sequelize.models.Review.findAll({ where: args, attributes: { exclude: ['completedByID'] } });
      //   }
      // },
      // 'reviewSubmitted': {
      //   type: GraphQLList(ReviewResolver),
      //   resolve(user: any, args, context: any) {
      //     args.completedBy = user.userID;
      //     return sequelize.models.Review.findAll({ where: args, attributes: { exclude: ['subjectID'] } });
      //   }
      // }
    }
  }
});
