import { AuthorizationResolver } from "../resolvers/Authorization";
import { GraphQLNonNull, GraphQLString, GraphQLInt } from "graphql";
import { JsonWebToken } from "../../models/JsonWebToken";
import { encodeJWT, decodeJWT } from "../../lib/hash";
import { sequelize } from "../../lib/sequelize";

export default {
  type: AuthorizationResolver,
  args: {
    firstName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    industryID: {
      type: GraphQLInt
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(root: any, args: any) {
    const user = await sequelize.models.User.create({
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email.toLowerCase(),
      industryID: args.industryID,
      password: args.password
    }) as any;
    const session: JsonWebToken = {
      token: user ? await encodeJWT({ userID: user.userID, email: user.email, root: user.root }) : null,
      userID: user ? user.userID : null,
    };
    return { user, session };
  }
}