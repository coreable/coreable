import { AuthorizationResolver } from "../resolvers/Authorization";
import { GraphQLNonNull, GraphQLString, GraphQLObjectType, GraphQLList } from "graphql";
import { JsonWebToken } from "../../models/JsonWebToken";
import { encodeJWT } from "../../lib/hash";
import { sequelize } from "../../lib/sequelize";
import { ErrorResolver } from "../resolvers/Error";
import { CoreableError } from "../../models/Error";

export default {
  type: new GraphQLObjectType({
    name: 'Login', 
    description: 'Login Mutation Return Values',
    fields: () => {
      return {
        'auth': {
          type: AuthorizationResolver,
          resolve(result) {
            return result.auth;
          }
        },
        'error': {
          type: new GraphQLList(ErrorResolver),
          resolve(result) {
            return result.error;
          }
        }
      }
    }
  }),
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let user;
    let isCorrectPassword: boolean = false;
    let session: JsonWebToken = {};
    if (context.USER) {
      errors.push({ code: 'ER_AUTH_FAILURE', path: 'JWT' , message: 'User already authenticated'});
    }
    if (!errors.length) {
      user = await sequelize.models.User.findOne({ where: { email: args.email } }) as any;
      if (!user) {
        errors.push({ code: 'ER_AUTH_FAILURE', path: 'email', message: `No user found with email ${args.email}` });
      }
    }
    if (!errors.length) {
      isCorrectPassword = await user.login(args.password);
      if (!isCorrectPassword) {
        errors.push({ code: 'ER_AUTH_FAILURE', path: 'password', message: 'Password invalid' });
      }
    }
    if (!errors.length) {
      session = {
        token: await encodeJWT({ userID: user.userID, email: user.email }),
        userID: user.userID
      };
    }
    return {
      'auth': !errors.length ? { 
        'user': user,
        'session': session
      } : null,
      'error': errors.length > 0 ? errors : null
    };
  }
}