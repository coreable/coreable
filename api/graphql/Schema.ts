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

import { GraphQLSchema } from "graphql";
import { RootQuery } from "./Query";
import { RootMutation } from './Mutation';

// Here we import the Query and Mutation schemas and combine them to use
// in the /api/lib/express.ts file with the graphql-express package.
export const RootSchema: GraphQLSchema = new GraphQLSchema({
  'query': RootQuery,
  'mutation': RootMutation
});
