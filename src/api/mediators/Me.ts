import { 
  GraphQLObjectType
} from "graphql";

import { UserResolver } from "../resolvers/User";
import { ManagerResolver } from '../resolvers/Manager';

export const MeMediator: GraphQLObjectType = new GraphQLObjectType({
  name: 'MeMediator',
  description: 'MeMediator',
  fields: () => {
    return {
      'manager': {
        type: ManagerResolver,
        resolve(data) {
          return data.manager;
        }
      },
      'user': {
        type: UserResolver,
        resolve(data) {
          return data.user;
        }
      }
    }
  }
});