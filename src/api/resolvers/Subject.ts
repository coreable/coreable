import { sequelize } from '../../lib/sequelize';
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import { Subject } from '../../models/Subject';

export const TeamResolver: GraphQLObjectType<Subject> = new GraphQLObjectType({
  name: 'SubjectResolver',
  description: 'This represents a Subject',
  fields: () => {
    return {
      'subjectID': {
        type: GraphQLString,
        resolve(subject, args, context) {
          return subject.subjectID;
        }
      },
      'subjectName': {
        type: GraphQLString,
        resolve(subject, args, context) {
          return subject.subjectName;
        }
      }
    }
  }
});
