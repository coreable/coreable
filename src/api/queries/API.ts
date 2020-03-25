import {
  GraphQLList,
  GraphQLInt,
  GraphQLString
} from "graphql";

import { APIResolver } from "../resolvers/API";

export default {
  type: APIResolver,
  args: {
    time: {
      type: GraphQLInt
    },
    mode: {
      type: GraphQLString
    }
  },
  resolve(root: any, args: any) {
    return {
      'time': Date.now(),
      'mode': process.env.NODE_ENV
    }
  }
}