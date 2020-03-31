import { 
  GraphQLObjectType, 
  GraphQLList
} from "graphql";

import { SubjectResolver } from "../../resolvers/Subject";

export const SubjectObjectMediator: GraphQLObjectType = new GraphQLObjectType({
  name: 'SubjectObjectMediator',
  description: 'SubjectObjectMediator',
  fields: () => {
    return {
      'subject': {
        type: SubjectResolver,
        resolve(data) {
          return data.subject;
        }
      }
    }
  }
});
