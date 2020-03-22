import { GraphQLList, GraphQLInt, GraphQLString } from "graphql";
import { sequelize } from "../../lib/sequelize";
import { IndustryResolver } from "../resolvers/Industry";

export default {
  type: new GraphQLList(IndustryResolver),
  args: {
    industryID: {
      type: GraphQLInt
    },
    industryName: {
      type: GraphQLString
    }
  },
  resolve(root: any, args: any) {
    return sequelize.models.Industry.findAll({ where: args });
  }
}