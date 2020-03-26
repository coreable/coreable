import {
  GraphQLInt,
  GraphQLString
} from "graphql";

import { APISingletonCommand } from "../resolvers/command/singletons/APISingletonCommand";
import { CoreableError } from "../../models/CoreableError";

export default {
  type: APISingletonCommand,
  args: {
    time: {
      type: GraphQLInt
    },
    mode: {
      type: GraphQLString
    }
  },
  resolve(root: any, args: any) {
    let errors: CoreableError[] = [];
    if (process.env.NODE_ENV !== "production") {
      errors.push({ code: "ER_NODE_ENV", path: "NODE.JS", message: "WARNING: Node.JS is not running in production version! Do not ship this mode" });
    }
    return {
      'result': {
        'API': {
          'time': Date.now(),
          'mode': process.env.NODE_ENV
        }
      },
      'errors': errors.length > 0 ? errors : null
    }
  }
}