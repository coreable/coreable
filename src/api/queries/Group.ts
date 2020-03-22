import { GraphQLList, GraphQLInt, GraphQLString } from "graphql";
import { sequelize } from "../../sequelize";
import { GroupResolver } from "../resolvers/Group";

export default {
  type: new GraphQLList(GroupResolver),
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
  resolve(root: any, args: any) {
    return sequelize.models.Group.findAll({ where: args });
  }
}