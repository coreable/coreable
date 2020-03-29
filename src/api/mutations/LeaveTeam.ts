import { sequelize } from "../../lib/sequelize";
import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from "graphql";

import { Team } from "../../models/Team";
import { CoreableError } from "../../models/CoreableError";
import { UserObjectCommand } from "../command/object/User";

export default {
  type: UserObjectCommand,
  args: {
    teamID: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let user: any = context.USER;
    let team: any;
    if (!context.USER) {
      errors.push({ code: 'ER_AUTH_FAILURE', path: 'JWT', message: 'User unauthenticated' });
    }
    // if (!errors.length) {
    //   user = await sequelize.models.User.findOne({ where: { userID: args.userID }, include: [{ model: Team }]});
    //   if (!user) {
    //     errors.push({ code: 'ER_USER_UNKNOWN', message: `Unable to locate user with userID ${args.userID}`, path: 'userID' });
    //   }
    // }
    // if (!errors.length) {
    //   team = await sequelize.models.Team.findOne({ where: { teamID: args.teamID } });
    //   if (!team) {
    //     errors.push({ code: 'ER_GROUP_UNKNOWN', message: `Unable to locate team with inviteCode ${args.inviteCode}`, path: 'inviteCode' });
    //   }
    // }
    if (!errors.length) {
      let isInGroup = false;
      for (const teams of user.Teams) {
        if (teams.teamID === args.teamID) {
          team = teams;
          isInGroup = true;
          break;
        }
      }
      if (!isInGroup) {
        errors.push({ code: 'ER_USER_NOT_IN_GROUP', message: `User with userID ${user.userID} is not in team with teamID ${team.teamID}`, path: 'userID' });
      }
    }
    if (!errors.length) {
      try {
        user = await user.removeTeam(team);
      } catch (err) {
        errors.push({ code: err.original.code, message: err.original.sqlMessage, path: '_' });
      }
    }
    return {
      'data': !errors.length ? {
        'user': user,
      } : null,
      'errors': errors.length > 0 ? errors : null
    };
  }
}