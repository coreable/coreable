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
  GraphQLString,
} from 'graphql';

import { Billing } from '../../models/Billing';

export const BillingResolver: GraphQLObjectType<Billing> = new GraphQLObjectType({
  name: 'BillingResolver',
  description: 'This represents Billing',
  fields: () => {
    return {
      'billingID': {
        type: GraphQLString,
        resolve(billing, args, context) {
          return billing.bilingID;
        }
      },
      'contactEmail': {
        type: GraphQLString,
        resolve(billing, args, context) {
          return billing.contactEmail;
        }
      },
      'contactPhone': {
        type: GraphQLString,
        resolve(billing, args, context) {
          return billing.contactPhone;
        }
      },
    }
  }
});
