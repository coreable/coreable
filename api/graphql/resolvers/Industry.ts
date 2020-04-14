import { Industry } from "../../models/Industry";
import { GraphQLObjectType, GraphQLString } from "graphql";

export const IndustryResolver: GraphQLObjectType<Industry> = new GraphQLObjectType({
  name: 'IndustryResolver',
  description: 'IndustryResolver',
  fields: () => {
    return {
      '_id': {
        type: GraphQLString,
        resolve(industry, args, context) {
          return industry._id;
        }
      },
      'name': {
        type: GraphQLString,
        resolve(industry, args, context) {
          return industry.name;
        }
      }
    }
  }
});