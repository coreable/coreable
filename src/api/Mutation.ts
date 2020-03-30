import { QueryInterface } from "sequelize/types";
import {
  GraphQLObjectType,
} from "graphql";

import RegisterMutation from './mutations/Register';
import LoginMutation from './mutations/Login';
import JoinTeamMutation from './mutations/JoinTeam';
import LeaveTeamMutation from './mutations/LeaveTeam';
import SubmitReviewMutation from './mutations/SubmitReview';

export const Mutation: GraphQLObjectType<QueryInterface> = new GraphQLObjectType({
  name: 'Mutation',
  description: 'This is the root mutation',
  fields: () => {
    return {
      'register': RegisterMutation,
      'login': LoginMutation,
      'joinTeam': JoinTeamMutation,
      'leaveTeam': LeaveTeamMutation,
      'submitReview': SubmitReviewMutation
    }
  }
});

