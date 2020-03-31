import {
  GraphQLObjectType,
  GraphQLList
} from "graphql";

import { CoreableErrorResolver } from "../../resolvers/CorableError";
import { SubjectObjectMediator } from "../../mediators/object/Subject";

export const SubjectObjectCommand: GraphQLObjectType = new GraphQLObjectType({
  name: 'SubjectObjectCommand',
  description: 'SubjectObjectCommand',
  fields: () => {
    return {
      'data': {
        type: SubjectObjectMediator,
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
 