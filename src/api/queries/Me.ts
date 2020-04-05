import { sequelize } from "../../lib/sequelize";

import { CoreableError } from "../../models/CoreableError";
import { UserObjectCommand } from "../command/object/User";
import { Subject } from "../../models/Subject";
import { Team } from "../../models/Team";
import { User } from "../../models/User";

export default {
  type: UserObjectCommand, 
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let user;
    if (!context.USER) {
      errors.push({ code: 'ER_UNAUTH', path: 'JWT' , message: 'User unauthenticated'});
    }
    if (!errors.length) {
      if (!context.USER.manager) {
        user = await sequelize.models.User.noCache().findOne(
          {
            where:  { _id: context.USER._id },
            include: [
              {
                model: Team,
                as: 'teams', 
                include: [
                  { model: Subject, as: 'subject' },
                  { model: User, as: 'users' }
                ], 
                exclude: ['inviteCode']
              }
            ]
          }
        );
      } else if (context.USER.manager) {
        user = await sequelize.models.Manager.noCache().findOne(
          {
            where:  { _id: context.USER._id } ,
            include: [
              { model: Subject, as: 'subjects' }
            ]
          }
        );
      }
      if (!user) {
        errors.push({ code: 'ER_USER_UNKNOWN', path: `${args}`, message: `No user found with _id ${context.USER._id}` });
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