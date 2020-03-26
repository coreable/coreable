import { 
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from "graphql";

import { sequelize } from "../../lib/sequelize";

import { Group } from "../../models/Group";

import { CoreableError } from "../../models/CoreableError";
import { UserGroupCompositeCommand } from "../resolvers/command/composite/UserGroupCompositeCommand";

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
    let user;
    let group;
    if (!context.USER) {
      errors.push({ code: 'ER_AUTH_FAILURE', path: 'JWT' , message: 'User unauthenticated'});
    }
    if (!errors.length) {
      user = await sequelize.models.User.findOne({ where: { userID: args.userID }, include: [{ model: Group }] }) as any;
      if (!user) {
        errors.push({ code: 'ER_USER_UNKNOWN', message: `Unable to locate user with userID ${args.userID}`, path: 'userID' });
      }
    }
    if (!errors.length) {
      group = await sequelize.models.Group.findOne({ where: { inviteCode: args.inviteCode } });
      if (!group) {
        errors.push({ code: 'ER_GROUP_UNKNOWN', message: `Unable to locate group with inviteCode ${args.inviteCode}`, path: 'inviteCode' });
      }
    }
    if (!errors.length) {
      if (user.userID === group.groupLeaderID) {
        errors.push({ code: 'ER_USER_IN_GROUP', message: `User with userID ${user.userID} is already in ${group.groupID}`, path: 'userID'});
      }
    }
    if (!errors.length) {
      for (const ug of user.Groups) {
        if (ug.groupID === group.groupID) {
          errors.push({ code: 'ER_USER_IN_GROUP', message: `User with userID ${user.userID} is already in group with groupID ${group.groupID}`, path: 'userID'});
          break;
        }
      }
    }
    if (!errors.length) {
      if (user.userID === context.USER.userID || context.USER.root === true) {
        try {
          await user.addGroup(group.groupID);
        } catch (err) {
          errors.push({ code: err.original.code, message: err.original.sqlMessage, path: '_' });
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