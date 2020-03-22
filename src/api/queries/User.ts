import { GraphQLList, GraphQLInt, GraphQLString } from "graphql";
import { sequelize } from "../../sequelize";
import { UserResolver } from "../resolvers/User";

export default {
  type: new GraphQLList(UserResolver),
  args: {
    userID: {
      type: GraphQLInt
    },
    email: {
      type: GraphQLString
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    }
  },
  resolve(root: any, args: any) {
    return sequelize.models.User.findAll({ where: args });
  }
}
