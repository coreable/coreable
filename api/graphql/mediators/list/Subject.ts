/*
===========================================================================
Copyright (C) 2020 Coreable
This file is part of Coreable's source code.
Coreables source code is free software; you can redistribute it
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
