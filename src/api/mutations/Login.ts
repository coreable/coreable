import { 
  GraphQLNonNull,
  GraphQLString
} from "graphql";

import { CoreableError } from "../../models/CoreableError";

import { encodeJWT } from "../../lib/hash";
import { sequelize } from "../../lib/sequelize";
import { SessionObjectCommand } from "../command/object/Session";

export default {
  type: SessionObjectCommand,
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
    let user: any;
    let isCorrectPassword: boolean = false;
    let token: string | undefined;
    if (context.USER) {
      errors.push({ code: 'ER_AUTH_FAILURE', path: 'JWT' , message: 'User already authenticated'});
    }
    if (!errors.length) {
      user = await sequelize.models.User.findOne({ where: { email: args.email.toLowerCase() } });
      if (!user) {
        errors.push({ code: 'ER_USER_UNKNOWN', path: 'email', message: `No user found with email ${args.email}` });
      }
    }
    if (!errors.length) {
      isCorrectPassword = await user.login(args.password);
      if (!isCorrectPassword) {
        errors.push({ code: 'ER_AUTH_FAILURE', path: 'password', message: 'Password invalid' });
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
    };
  }
}
