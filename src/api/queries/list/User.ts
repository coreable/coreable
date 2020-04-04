import { sequelize } from "../../../lib/sequelize";
import {
  GraphQLInt,
  GraphQLString,
} from "graphql";

import { CoreableError } from "../../../models/CoreableError";
import { UserListCommand } from "../../command/list/User";
import { Team } from "../../../models/Team";
import { Review } from "../../../models/Review";
import { Manager } from "../../../models/Manager";

export default {
  type: UserListCommand, 
  args: {
    _id: {
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
    },
    limit: {
      type: GraphQLInt
    },
    offset: {
      type: GraphQLInt
    }
  },
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let user: any;
    let limit = args.limit;
    let offset = args.offset;
    delete args.offset;
    delete args.limit;
    if (!context.USER) {
      errors.push({ code: 'ER_UNAUTH', path: 'JWT' , message: 'User unauthenticated'});
    }
    if (!errors.length) {
      if (!(context.USER instanceof Manager)) {
        errors.push({ code: 'ER_UNAUTH', message: 'Unauthorised access', path: 'JWT' });
      }
    }
    if (!errors.length) {
      user = await sequelize.models.User.findAll(
        { 
          where: args,
          include: [
            { model: Team, as: 'teams', exclude: ['inviteCode'] },
            { model: Review, as: 'reviews', exclude: ['receiver_id'] },
            { model: Review, as: 'submissions', exclude: ['submitter_id'] }
          ],
          limit: limit,
          offset: offset
        }
      );
      if (!user.length) {
        errors.push({ code: 'ER_USER_UNKNOWN', path: `${args}`, message: `No user found with args ${args}` });
      }
    }
    return {
      'data': !errors.length ? {
        'user': user
      } : null,
      'errors': errors.length > 0 ? errors : null
    }
  }
}