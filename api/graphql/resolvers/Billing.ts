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