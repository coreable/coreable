import { UserSessionResolver } from "../resolvers/UserSession";
import { GraphQLNonNull, GraphQLString, GraphQLInt } from "graphql";
import { Session } from "../../models/Session";
import { encodeJWT } from "../../lib/hash";
import { sequelize } from "../../sequelize";

export default {
  type: UserSessionResolver,
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
    const session: Session = {
      token: user ? encodeJWT({ id: user.id, email: user.email, root: user.root }) : null,
      userID: user.userID
    };
    return { user, session };
  }
}