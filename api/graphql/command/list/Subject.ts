import {
  GraphQLObjectType,
  GraphQLList
} from "graphql";

import { CoreableErrorResolver } from "../../resolvers/CorableError";
import { SubjectListMediator } from "../../mediators/list/Subject";

export const SubjectListCommand: GraphQLObjectType = new GraphQLObjectType({
  name: 'SubjectListCommand',
  description: 'SubjectListCommand',
  fields: () => {
    return {
      'data': {
        type: SubjectListMediator,
        resolve(value) {
          return value.data;
        }
      },
      'errors': {
        type: new GraphQLList(CoreableErrorResolver),
        resolve(value) {
          return value.errors;
        }
      }
    }
  }
});
 