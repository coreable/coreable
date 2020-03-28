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
    userID: {
      type: new GraphQLNonNull(GraphQLString)
    },
    teamID: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let user: any;
    let team: any;
    if (!context.USER) {
      errors.push({ code: 'ER_AUTH_FAILURE', path: 'JWT' , message: 'User unauthenticated'});
    }
    if (!errors.length) {
      user = await sequelize.models.User.findOne({ where: { userID: args.userID }, include: [{ model: Team }]});
      if (!user) {
        errors.push({ code: 'ER_USER_UNKNOWN', message: `Unable to locate user with userID ${args.userID}`, path: 'userID' });
      }
    }
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
        errors.push({ code: 'ER_USER_NOT_IN_GROUP', message: `User with userID ${user.userID} is not in team with teamID ${team.teamID}`, path: 'userID'});
      }
    }
    if (!errors.length) {
      if (user.userID === context.USER.userID || context.USER.root === true) {
        try {
          user = await user.removeTeam(team);
        } catch (err) {
          errors.push({ code: err.original.code, message: err.original.sqlMessage, path: '_' });
        }
      } else {
        errors.push({ code: 'ER_ACCESS_RESTRICTED', message: `User with userID ${context.USER.userID} tried to remove user with userID ${user.userID} from team with teamID ${team.teamID} without being manager`, path: 'JWT' });
      }
    }
    return {
      'result': !errors.length ? {
        'user': user,
      } : null, 
      'errors': errors.length > 0 ? errors : null
    };
  }
}