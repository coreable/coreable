import {
  GraphQLObjectType,
  GraphQLList
} from "graphql";
import { UserObjectMediator } from "../../mediators/object/User";
import { CoreableErrorResolver } from "../../resolvers/CorableError";

export const UserObjectCommand: GraphQLObjectType = new GraphQLObjectType({
  name: 'UserObjectCommand',
  description: 'UserObjectCommand',
  fields: () => {
    return {
      'result': {
        type: UserObjectMediator,
        resolve(value) {
          return value.result;
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