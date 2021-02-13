/*
  ===========================================================================
    Copyright (C) 2021 Coreable
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

import { ReferenceCoreableErrorResolver } from "../resolvers/CoreableError";
import { ReferenceMeMediator } from "../mediators/Me";

export const ReferenceMeCommand: GraphQLObjectType = new GraphQLObjectType({
  name: 'ReferenceMeCommand',
  description: 'ReferenceMeCommand',
  fields: () => {
    return {
      'data': {
        type: ReferenceMeMediator,
        resolve(value) {
          return value.data;
        }
      },
      'errors': {
        type: new GraphQLList(ReferenceCoreableErrorResolver),
        resolve(value) {
          return value.errors;
        }
      }
    }
  }
});