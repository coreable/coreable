import { sequelize } from "../../lib/sequelize";
import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from "graphql";

import { CoreableError } from "../../models/CoreableError";
import { UserGroupCompositeCommand } from "../resolvers/command/composite/UserGroupCompositeCommand";
import { User } from "../../models/User";
import { Team } from "../../models/Team";

export default {
  type: UserGroupCompositeCommand,
  args: {
    userID: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    inviteCode: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let user: any;
    let group: any;
    if (!context.USER) {
      errors.push({ code: 'ER_AUTH_FAILURE', path: 'JWT', message: 'User unauthenticated' });
    }
    if (!errors.length) {
      user = await sequelize.models.User.findOne({ where: { 'userID': args.userID } });
      if (!user) {
        errors.push({ code: 'ER_USER_UNKNOWN', message: `Unable to locate user with userID ${args.userID}`, path: `userID` });
      } else {
        user.Groups = await user.getGroups();
      }
    }
    if (!errors.length) {
      group = await sequelize.models.Group.findOne({ where: { 'inviteCode': args.inviteCode } });
      if (!group) {
        errors.push({ code: 'ER_GROUP_UNKNOWN', message: `Unable to locate group with inviteCode ${args.inviteCode}`, path: 'inviteCode' });
      }
    }
    if (!errors.length) {
      for (const groups of user.Groups) {
        if (groups.groupID === group.groupID) {
          errors.push({ code: 'ER_USER_IN_GROUP', message: `User with userID ${user.userID} is already in group with groupID ${group.groupID}`, path: 'userID' });
          break;
        }
      }
    }
    if (!errors.length) {
      if (user.userID === context.USER.userID || context.USER.root === true) {
        try {
          await Team.create({
            userID: args.userID,
            groupID: group.groupID
          });
        } catch (err) {
          errors.push({ 'code': err.original.code, 'message': err.original.sqlMessage, 'path': '_' });
        }
      } else {
        errors.push({ code: 'ER_ACCESS_RESTRICTED', message: `User with userID ${context.USER.userID} tried to add user with userID ${user.userID} to group with groupID ${group.groupID} without being manager`, path: 'JWT' });
      }
    }
    return {
      'result': !errors.length ? {
        'user': user,
        'group': group,
      } : null,
      'errors': errors.length > 0 ? errors : null
    };
  }
}