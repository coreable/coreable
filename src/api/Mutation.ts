import { QueryInterface } from "sequelize/types";
import {
  GraphQLObjectType,
} from "graphql";

import RegisterMutation from './mutations/Register';
import LoginMutation from './mutations/Login';
import JoinTeamMutation from './mutations/JoinTeam';
// import LeaveGroupMutation from './mutations/LeaveGroup';

export const Mutation: GraphQLObjectType<QueryInterface> = new GraphQLObjectType({
  name: 'Mutation',
  description: 'This is the root mutation',
  fields: () => {
    return {
      'register': RegisterMutation,
      'login': LoginMutation,
      'joinTeam': JoinTeamMutation,
      // 'leaveGroup': LeaveGroupMutation
    }
  }
});

