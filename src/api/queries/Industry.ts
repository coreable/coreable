import {
  GraphQLList,
  GraphQLInt,
  GraphQLString
} from "graphql";

import { sequelize } from "../../lib/sequelize";

import { IndustryResolver } from "../resolvers/models/IndustryResolver";
import { CoreableError } from "../../models/CoreableError";

export default {
  type: new GraphQLList(IndustryResolver),
  args: {
    industryID: {
      type: GraphQLInt
    },
    industryName: {
      type: GraphQLString
    }
  },
  async resolve(root: any, args: any) {
    let errors: CoreableError[] = [];
    let industry = await sequelize.models.Industry.findAll({ where: args });
    return {
      'result': !errors.length ? {
        'industry': industry
      }: null,
      'errors': errors.length > 0 ? errors : null
    }
  }
}