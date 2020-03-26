import { sequelize } from "../../lib/sequelize";
import {
  GraphQLInt,
  GraphQLString
} from "graphql";

import { GroupSingletonCommand } from "../resolvers/command/singletons/GroupSingletonCommand";
import { CoreableError } from "../../models/CoreableError";

export default {
  type: GroupSingletonCommand,
  args: {
    groupID: {
      type: GraphQLInt
    },
    groupName: {
      type: GraphQLString
    },
    groupLeaderID: {
      type: GraphQLInt
    },
    industryID: {
      type: GraphQLInt
    },
    inviteCode: {
      type: GraphQLString
    }
  },
  async resolve(root: any, args: any) {
    let errors: CoreableError[] = [];
    let group = await sequelize.models.Group.findAll({ where: args });
    return {
      'result': !errors.length ? {
        'group': group
      } : null,
      'errors': errors.length > 0 ? errors : null
    }
  }
}