import { UserSessionResolver } from "../resolvers/UserSession";
import { GraphQLNonNull, GraphQLString, GraphQLInt } from "graphql";
import { Session } from "../../models/Session";
import { encodeJWT } from "../../lib/hash";
import { sequelize } from "../../sequelize";

export default {
  type: UserSessionResolver,
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
    const session: Session = {
      token: isValid ? encodeJWT({ id: user.id, email: user.email, root: user.root }) : null,
      userID: isValid ? user.userID : null
    };
    return { user, session };
  }
}