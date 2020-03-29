import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt
 } from "graphql";
 
import { encodeJWT } from "../../lib/hash";
import { sequelize } from "../../lib/sequelize";
 
import { CoreableError } from "../../models/CoreableError";
import { SessionObjectCommand } from "../command/object/Session";

export default {
  type: SessionObjectCommand,
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
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let user;
    let token: string | undefined;
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
          password: args.password
        });
      } catch (err) {
        errors.push({ code: err.original.code, message: err.original.sqlMessage, path: 'email' });
      }
    }
    if (!errors.length) {
      token = await encodeJWT({ userID: user.userID, email: user.email });
    }
    return {
      'result': !errors.length ? {
        'user': user, 
        'token': token
      } : null,
      'errors': errors.length > 0 ? errors : null
    }
  }
}