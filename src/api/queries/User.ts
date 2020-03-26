import {
  GraphQLInt,
  GraphQLString,
} from "graphql";

import { sequelize } from "../../lib/sequelize";

import { Team } from "../../models/Team";
import { CoreableError } from "../../models/CoreableError";
import { UserSingletonCommand } from "../resolvers/command/singletons/UserSingletonCommand";

export default {
  type: UserSingletonCommand, 
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
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let user;
    // if (!context.USER) {
    //   errors.push({ code: 'ER_UNAUTH', path: 'JWT' , message: 'User unauthenticated'});
    // }
    if (!errors.length) {
      user = await sequelize.models.User.findAll({ where: args , include: [{ model: Team }] });
    }
    return {
      'result': !errors.length ? {
        'user': user
      } : null,
      'errors': errors.length > 0 ? errors : null
    }
  }
}
