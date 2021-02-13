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
  GraphQLString
} from "graphql";

import { CoreableError } from "../../../models/CoreableError";

export const UniversityCoreableErrorResolver: GraphQLObjectType<CoreableError> = new GraphQLObjectType({
  name: 'UniversityCoreableErrorResolver',
  description: 'UniversityCoreableErrorResolver',
  fields: () => {
    return {
      'message': {
        type: GraphQLString,
        resolve(error) {
          return error.message;
        }
      },
      'path': {
        type: GraphQLString,
        resolve(error) {
          return error.path
        }
      },
      'code': {
        type: GraphQLString,
        resolve(error) {
          return error.code;
        }
      }
    }
  }
});