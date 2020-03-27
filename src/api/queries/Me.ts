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
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let user;
    if (!context.USER) {
      errors.push({ code: 'ER_UNAUTH', path: 'JWT' , message: 'User unauthenticated'});
    }
    if (!errors.length) {
      user = await sequelize.models.User.findAll({ where: { userID: context.USER.userID } , include: [{ model: Team }] });
      if (!user || !user.length) {
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
