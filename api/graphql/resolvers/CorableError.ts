import { 
  GraphQLObjectType,
  GraphQLString
} from "graphql";
import { CoreableError } from "../../models/CoreableError";

export const CoreableErrorResolver: GraphQLObjectType<CoreableError> = new GraphQLObjectType({
  name: 'CoreableErrorResolver',
  description: 'CoreableErrorResolver',
  fields: () => {
    return {
      'message': {
        type: GraphQLString,
        resolve(error) {
          return error.message;
        }
      },
      'path': {
        type: GraphQLString,
        resolve(error) {
          return error.path
        }
      },
      'code': {
        type: GraphQLString,
        resolve(error) {
          return error.code;
        }
      }
    }
  }
});