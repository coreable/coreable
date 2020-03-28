import { sequelize } from "../../../lib/sequelize";
import {
  GraphQLInt,
  GraphQLString,
} from "graphql";

import { CoreableError } from "../../../models/CoreableError";
import { UserListCommand } from "../../command/list/User";

export default {
  type: UserListCommand, 
  args: {
    userID: {
      type: GraphQLString
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
    let user: any;
    if (!context.USER) {
      errors.push({ code: 'ER_UNAUTH', path: 'JWT' , message: 'User unauthenticated'});
    }
    if (!errors.length) {
      user = await sequelize.models.User.findAll({ where: args });
      if (!user.length) {
        errors.push({ code: 'ER_USER_UNKNOWN', path: `${args}`, message: `No user found with args ${args}` });
      }
    }
    return {
      'result': !errors.length ? {
        'user': user
      } : null,
      'errors': errors.length > 0 ? errors : null
    }
  }
}