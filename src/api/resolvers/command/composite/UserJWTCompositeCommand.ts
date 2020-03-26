import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import { CoreableErrorResolver } from "../../models/CoreableErrorResolver";
import { UserJWTCompositeMediator } from "../../mediators/composite/UserJWTCompositeMediator";

export const UserJWTCompositeCommand: GraphQLObjectType = new GraphQLObjectType({
  name: 'UserJWTCompositeCommand',
  description: 'UserJWTCompositeCommand',
  fields: () => {
    return {
      'result': {
        type: UserJWTCompositeMediator,
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