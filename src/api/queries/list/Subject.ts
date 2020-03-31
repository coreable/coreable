import {
  GraphQLString,
  GraphQLInt
} from "graphql";

import { sequelize } from "../../../lib/sequelize";
import { CoreableError } from "../../../models/CoreableError";
import { SubjectListCommand } from "../../command/list/Subject";

export default {
  type: SubjectListCommand,
  args: {
    subjectID: {
      type: GraphQLString,
    },
    subjectName: {
      type: GraphQLString,
    },
    state: {
      type: GraphQLInt
    }
  },
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let subject: any;
    if (!context.USER) {
      errors.push({ code: 'ER_UNAUTH', path: 'JWT' , message: 'User unauthenticated'});
    }
    if (!errors.length) {
      if (!args.subjectID && !args.subjectName && !args.state) {
        errors.push({ code: 'ER_ARGS', message: 'A subjectID, a subjectName or state must be passed as arguments', path: 'args' });
      }
    }
    if (!errors.length) {
      subject = await sequelize.models.Subject.findAll({ where: args });
      if (!subject) {
        errors.push({ code: 'ER_SUBJECT_UNKNOWN', message: `A subject with args ${args} could not be found`, path: 'args' });
      }
    }
    return {
      'data': !errors.length ? {
        'subject': subject
      }: null,
      'errors': errors.length > 0 ? errors : null
    }
  }
}