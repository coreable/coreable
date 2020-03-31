import { 
  GraphQLObjectType, 
  GraphQLList
} from "graphql";

import { SubjectResolver } from "../../resolvers/Subject";

export const SubjectListMediator: GraphQLObjectType = new GraphQLObjectType({
  name: 'SubjectListMediator',
  description: 'SubjectListMediator',
  fields: () => {
    return {
      'subject': {
        type: new GraphQLList(SubjectResolver),
        resolve(data) {
          return data.subject;
        }
      }
    }
  }
});
