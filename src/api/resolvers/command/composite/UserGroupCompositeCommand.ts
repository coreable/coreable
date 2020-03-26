import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import { CoreableErrorResolver } from "../../models/CoreableErrorResolver";
import { UserGroupCompositeMediator } from "../../mediators/composite/UserGroupCompositeMediator";

export const UserGroupCompositeCommand: GraphQLObjectType = new GraphQLObjectType({
  name: 'UserGroupCompositeCommand',
  description: 'UserGroupCompositeCommand',
  fields: () => {
    return {
      'result': {
        type: UserGroupCompositeMediator,
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
