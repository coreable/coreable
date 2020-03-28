import { sequelize } from "../../lib/sequelize";
import {
  GraphQLNonNull,
  GraphQLString,
} from "graphql";

import { CoreableError } from "../../models/CoreableError";

import { Team } from "../../models/Team";
import { UserObjectCommand } from "../command/object/User";

export default {
  type: UserObjectCommand,
  args: {
    userID: {
      type: new GraphQLNonNull(GraphQLString)
    },
    inviteCode: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let user: any;
    let team: any;
    if (!context.USER) {
      errors.push({ code: 'ER_AUTH_FAILURE', path: 'JWT', message: 'User unauthenticated' });
    }
    if (!errors.length) {
      user = await sequelize.models.User.findOne({ where: { 'userID': args.userID }, include: [{ model: Team }] });
      if (!user) {
        errors.push({ code: 'ER_USER_UNKNOWN', message: `Unable to locate user with userID ${args.userID}`, path: `userID` });
      }
    }
    if (!errors.length) {
      team = await sequelize.models.Team.findOne({ where: { 'inviteCode': args.inviteCode } });
      if (!team) {
        errors.push({ code: 'ER_GROUP_UNKNOWN', message: `Unable to locate group with inviteCode ${args.inviteCode}`, path: 'inviteCode' });
      }
    }
    if (!errors.length) {
      for (const teams of user.Team) {
        if (teams.teamID === team.groupID) {
          errors.push({ code: 'ER_USER_IN_GROUP', message: `User with userID ${user.userID} is already in team with teamID ${team.teamID}`, path: 'userID' });
          break;
        }
      }
    }
    if (!errors.length) {
      if (user.userID === context.USER.userID || context.USER.root === true) {
        try {
          user = await user.addTeam(team);
        } catch (err) {
          errors.push({ 'code': err.original.code, 'message': err.original.sqlMessage, 'path': '_' });
        }
      } else {
        errors.push({ code: 'ER_ACCESS_RESTRICTED', message: `User with userID ${context.USER.userID} tried to add user with userID ${user.userID} to team with teamID ${team.teamID} without being manager`, path: 'JWT' });
      }
    }
    return {
      'result': !errors.length ? {
        'user': user
      } : null,
      'errors': errors.length > 0 ? errors : null
    };
  }
}
