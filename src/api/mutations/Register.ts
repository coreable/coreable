import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt, 
  GraphQLObjectType,
  GraphQLList
 } from "graphql";
import { encodeJWT } from "../../lib/hash";

import { sequelize } from "../../lib/sequelize";

import { ErrorResolver } from "../resolvers/Error";
import { AuthorizationResolver } from "../resolvers/Authorization";

import { JsonWebToken } from "../../models/JsonWebToken";
import { CoreableError } from "../../models/Error";

export default {
  type: new GraphQLObjectType({
    name: 'RegisterMutation', 
    description: 'Register Mutation Return Values',
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
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let user;
    let session: JsonWebToken = {};
    if (context.USER) {
      errors.push({ code: 'ER_AUTH_FAILURE', path: 'JWT' , message: 'User is already logged in'});
    }
    if (!errors.length) {
      if (args.password.length < 6) {
        errors.push({ code: 'ER_PASSWORD_LENGTH', path: 'password', message: 'Password does not meet minimum length requirements' });
      }
    }
    if (!errors.length) {
      try {
        user = await sequelize.models.User.create({
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email.toLowerCase(),
          industryID: args.industryID,
          password: args.password
        }) as any;
      } catch (err) {
        errors.push({ code: err.original.code, message: err.original.sqlMessage, path: 'email' });
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
    }
  }
}