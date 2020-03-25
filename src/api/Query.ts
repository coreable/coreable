import { QueryInterface } from 'sequelize/types';
import { 
  GraphQLObjectType,
} from "graphql";

import UserQuery from './queries/User';
import IndustryQuery from './queries/Industry';
import GroupQuery from './queries/Group';
import ReviewQuery from './queries/Review';
import TeamQuery from './queries/Team';
import APIQuery from './queries/API';

export const Query: GraphQLObjectType<QueryInterface> = new GraphQLObjectType({
  name: 'Query',
  description: 'This is the root query',
  fields: () => {
    return {
      'user': UserQuery,
      'industry': IndustryQuery,
      'group': GroupQuery,
      'review': ReviewQuery,
      'team': TeamQuery,
      'API': APIQuery
    }
  }
});
