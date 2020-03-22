import { sequelize } from "../sequelize";
import { QueryInterface } from "sequelize/types";
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt
} from "graphql";

import { encodeJWT } from '../lib/hash';
import { SessionMutation } from "./mutations/Session";
import { Session } from "../models/Session";

export const Mutation: GraphQLObjectType<QueryInterface> = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Functions to create',
  fields: () => {
    return {
      'registerUser': {
        type: SessionMutation,
        args: {
          firstName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          lastName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
          industryID: {
            type: GraphQLInt
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        async resolve(root, args) {
          const user = await sequelize.models.User.create({
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email.toLowerCase(),
            industryID: args.industryID,
            password: args.password
          }) as any;
          const expiresAt: Date = new Date();
          expiresAt.setDate(expiresAt.getDate() + 30);
          const session: Session = {
            token: user ? encodeJWT({ id: user.id, email: user.email }) : null,
            expiresAt: expiresAt,
            userID: user.userID
          };
          return { user, session };
        }
      },
      'login': {
        type: SessionMutation,
        args: {
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        async resolve(root, args) {
          const user = await sequelize.models.User.findOne({ where: { email: args.email } }) as any;
          const isValid: boolean = await user.login(args.password);
          const expiresAt: Date = new Date();
          expiresAt.setDate(expiresAt.getDate() + 30);
          const session: Session = {
            token: isValid ? encodeJWT({ id: user.id, email: user.email }) : null,
            expiresAt: expiresAt,
            userID: user.userID
          };
          return { user, session };
        }
      }
    }
  }
});