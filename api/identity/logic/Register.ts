import { CoreableError } from "../../../models/CoreableError";
import { User } from "../../models/User";
import { encodeJWT } from "./JWT";

export async function Register(root: any, args: any, context: any) {
  let errors: CoreableError[] = [];
  let user: any;
  let token: string | undefined;
  if (context.USER) {
    errors.push({
      code: 'ER_AUTH_FAILURE',
      path: 'JWT',
      message: 'User is already logged in'
    });
  }
  if (!errors.length) {
    if (args.password.length < 6) {
      errors.push({
        code: 'ER_PASSWORD_LENGTH',
        path: 'password',
        message: 'Password does not meet minimum length requirements'
      });
    }
  }
  if (!errors.length) {
    let isRegistered = await User.findOne({
      where: { email: args.email.toLowerCase() }
    });
    if (isRegistered) {
      errors.push({
        code: 'ER_EMAIL_REGISTERED',
        path: 'email',
        message: `A user has already registered with email address ${args.email.toLowerCase()}`
      });
    }
  }
  if (!errors.length) {
    try {
      user = await User.create({
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email.toLowerCase(),
        password: args.password
      });
    } catch (err) {
      errors.push({ code: err.original.code, message: err.original.sqlMessage, path: 'SQL' });
    }
  }
  if (!errors.length) {
    token = await encodeJWT({
      _id: user._id,
      email: user.email
    });
  }
  return {
    'data': !errors.length ? {
      'user': user, 
      'token': token
    } : null,
    'errors': errors.length > 0 ? errors : null
  }
}