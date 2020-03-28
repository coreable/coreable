import {
  GraphQLInt,
  GraphQLString,
  GraphQLFloat
} from "graphql";

import { CoreableError } from "../../models/CoreableError";
import { APICommand } from "../command/API";

export default {
  type: APICommand,
  args: {
    time: {
      type: GraphQLFloat
    },
    mode: {
      type: GraphQLString
    }
  },
  resolve(root: any, args: any) {
    let errors: CoreableError[] = [];
    if (process.env.NODE_ENV !== "production") {
      errors.push({ code: "ER_NODE_ENV", path: "NODE.JS", message: `WARNING: Node.JS is running in ${process.env.NODE_ENV} mode! Do not ship this mode` });
    }
    return {
      'result': {
        'API': {
          'time': Date.now(),
          'env': process.env.NODE_ENV
        }
      },
      'errors': errors.length > 0 ? errors : null
    }
  }
}