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
      'data': {
        type: UserObjectMediator,
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