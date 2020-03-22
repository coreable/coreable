import { QueryInterface } from "sequelize/types";
import {
  GraphQLObjectType,
} from "graphql";

import RegisterMutation from './mutations/Register';
import LoginMutation from './mutations/Login';

export const Mutation: GraphQLObjectType<QueryInterface> = new GraphQLObjectType({
  name: 'Mutation',
  description: 'This is the root mutation',
  fields: () => {
    return {
      'registerUser': RegisterMutation,
      'login': LoginMutation
    }
  }
});