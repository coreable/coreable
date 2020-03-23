import { AuthorizationResolver } from "../resolvers/Authorization";
import { GraphQLNonNull, GraphQLString } from "graphql";
import { JsonWebToken } from "../../models/JsonWebToken";
import { encodeJWT } from "../../lib/hash";
import { sequelize } from "../../lib/sequelize";

export default {
  type: AuthorizationResolver,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(root: any, args: any) {
    const user = await sequelize.models.User.findOne({ where: { email: args.email } }) as any;
    const isValid: boolean = await user.login(args.password);
    const session: JsonWebToken = {
      token: isValid ? await encodeJWT({ userID: user.userID, email: user.email, root: user.root }) : null,
      userID: isValid ? user.userID : null
    };
    return { user, session };
  }
}