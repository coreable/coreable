import { sequelize } from "../../lib/sequelize";
import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from "graphql";

import { CoreableError } from "../../models/CoreableError";
import { TeamObjectCommand } from "../command/object/Team";
import { Manager } from "../../models/Manager";

// export default {
//   type: TeamObjectCommand,
//   args: {
//     teamName: {
//       type: new GraphQLNonNull(GraphQLString)
//     },
//     subjectID: {
//       type: new GraphQLNonNull(GraphQLString)
//     }
//   },
//   async resolve(root: any, args: any, context: any) {
//     let errors: CoreableError[] = [];
//     let targetSubject: any;
//     if (!context.USER) {
//       errors.push({ code: 'ER_AUTH_FAILURE', path: 'JWT', message: 'User unauthenticated' });
//     }
//     if (!errors.length) {
//       targetSubject = await sequelize.models.Subject.findOne({ where: { subjectID: args.subjectID }, include: [{ model: Manager }] });
//       if (!targetSubject) {
//         errors.push({ code: 'ER_TEAM_UNKNOWN', message: `Unable to locate subject with subjectID ${args.subjectID}`, path: 'subjectID' });
//       }
//     }
//     if (!errors.length) {
//       let isInGroup = false;
//       for (const userTeam of context.USER.Teams) {
//         if (userTeam.teamID === targetSubject.teamID) {
//           isInGroup = true;
//           break;
//         }
//       }
//       if (!isInGroup) {
//         errors.push({ code: 'ER_USER_NOT_IN_TEAM', message: `User with userID ${context.USER.userID} is not in team with teamID ${targetTeam.teamID}`, path: 'teamID' });
//       }
//     }
//     if (!errors.length) {
//       try {
//         await context.USER.removeTeam(targetTeam);
//       } catch (err) {
//         errors.push({ code: err.original.code, message: err.original.sqlMessage, path: 'SQL' });
//       }
//     }
//     return {
//       'data': !errors.length ? {
//         'user': await sequelize.models.User.findOne({ where: { userID: context.USER.userID } }),
//       } : null,
//       'errors': errors.length > 0 ? errors : null
//     };
//   }
// } 