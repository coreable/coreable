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
  // GraphQLList,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import { ReviewResolver } from '../../results/resolvers/Review';
import { Industry } from "../models/Industry";
import { GetIndustryAverages } from '../logic/GetIndustryAverages';

export const IndustryResolver: GraphQLObjectType<Industry> = new GraphQLObjectType({
  name: 'IndutryResolver',
  fields: () => {
    return {
      '_id': {
        type: GraphQLString,
        resolve(industry, args, context) {
          return industry._id;
        }
      },
      'name': {
        type: GraphQLString,
        resolve(industry, args, context) {
          return industry.name;
        }
      },
      'averages': {
        type: ReviewResolver,
        async resolve(industry, args, context) {
          // TODO:
          return await GetIndustryAverages(industry, args, context);
        }
      },
    }
  }
});