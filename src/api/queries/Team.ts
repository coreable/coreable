import { GraphQLList, GraphQLInt } from "graphql";
import { sequelize } from "../../lib/sequelize";
import { TeamResolver } from "../resolvers/Team";

export default {
  type: new GraphQLList(TeamResolver),
  args: {
    groupID: {
      type: GraphQLInt,
    },
    userID: {
      type: GraphQLInt
    }
  },
  resolve(root: any, args: any) {
    return sequelize.models.Team.findAll({ where: args });
  }
};
