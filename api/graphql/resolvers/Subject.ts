/*
===========================================================================
Copyright (C) 2020 Coreable
This file is part of Coreable's source code.
Corables source code is free software; you can redistribute it
and/or modify it under the terms of the End-user license agreement.
Coreable's source code is distributed in the hope that it will be
useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
You should have received a copy of the license along with the 
Coreable source code.
===========================================================================
*/ 

import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import { Subject } from '../../models/Subject';
import { TeamResolver } from './Team';
import { User } from '../../models/User';
import { Op } from 'sequelize';
import { Manager } from '../../models/Manager';

export const SubjectResolver: GraphQLObjectType<Subject> = new GraphQLObjectType({
  name: 'SubjectResolver',
  description: 'This represents a Subject',
  fields: () => {
    return {
      '_id': {
        type: GraphQLString,
        resolve(subject, args, context) {
          return subject._id;
        }
      },
      'name': {
        type: GraphQLString,
        resolve(subject, args, context) {
          return subject.name;
        }
      },
      'state': {
        type: GraphQLInt,
        resolve(subject, args, context) {
          return subject.state;
        }
      },
      'teams': {
        type: new GraphQLList(TeamResolver),
        resolve(subject, args, context) {
          if (context.USER instanceof User) {
            // For users only return the teams the user is in for security
            let teams_ids: string[] = [];
            for (const team of context.USER.teams) {
              teams_ids.push(team._id);
            }
            return (subject as any).getTeams({ where: { _id: { [Op.in]: teams_ids } }, include: [{ model: User, as: 'users' }] });
          } else if (context.USER instanceof Manager) {
            // Managers can see all teams and users in their subject
            return (subject as any).getTeams({ include: [{ model: User, as: 'users' }] });
          }
        }
      }
    }
  }
});
