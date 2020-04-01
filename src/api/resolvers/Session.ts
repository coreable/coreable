import { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean
} from "graphql";
import { Manager } from "../../models/Manager";

export const SessionResolver = new GraphQLObjectType({
  name: 'SessionResolver',
  description: 'Accessible after authentication',
  fields: () => {
    return {
      '_id': {
        type: GraphQLString,
        resolve(user, args, context) {
          return user._id;
        }
      },
      'email': {
        type: GraphQLString,
        resolve(user, args, context) {
          return user.email
        }
      },
      'firstName': {
        type: GraphQLString,
        resolve(user, args, context) {
          return user.firstName;
        }
      },
      'manager': {
        type: GraphQLBoolean,
        resolve(user, args, context) {
          return user instanceof Manager;
        }
      }
    }
  }
});