// /*
// ===========================================================================
// Copyright (C) 2020 Coreable
// This file is part of Coreable's source code.
// Coreables source code is free software; you can redistribute it
// and/or modify it under the terms of the End-user license agreement.
// Coreable's source code is distributed in the hope that it will be
// useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
// You should have received a copy of the license along with the 
// Coreable source code.
// ===========================================================================
// */

// import { sequelize } from "../../../../lib/sequelize";
// import {
//   GraphQLNonNull,
//   GraphQLString,
// } from "graphql";

// import { CoreableError } from "../../../../models/CoreableError";
// import { UniversityUserObjectCommand } from "../command/object/User";
// // import { Manager } from "../../models/Manager";
// import { UniversityTeam } from "../../models/Team";
// import { UniversitySubject } from "../../models/Subject";
// import { UniversityIndustry } from "../../models/Industry";
// import { UniversityUser } from "../../models/User";

// export default {
//   type: UniversityUserObjectCommand,
//   args: {
//     industry_id: {
//       type: new GraphQLNonNull(GraphQLString)
//     }
//   },
//   async resolve(root: any, args: any, context: any) {
//     let errors: CoreableError[] = [];
//     let targetIndustry: any;
//     if (!context.USER) {
//       errors.push({ code: 'ER_AUTH_FAILURE', path: 'JWT', message: 'User unauthenticated' });
//     }
//     if (!errors.length) {
//       if (context.USER.industry_id === args.industry_id) {
//         errors.push({ code: 'ER_USER_IN_INDUSTRY', path: 'JWT', message: `User is already in industry with _id ${args.industry_id}` })
//       }
//     }
//     if (!errors.length) {
//       targetIndustry = await UniversityIndustry.findOne({ where: { '_id': args.industry_id } });
//       if (!targetIndustry) {
//         errors.push({ code: 'ER_INDUSTRY_UNKNOWN', message: `Unable to locate industry with _id ${args.industry_id}`, path: 'industry_id' });
//       }
//     }
//     if (!errors.length) {
//       try {
//         await context.USER.setIndustry(targetIndustry);
//       } catch (err) {
//         errors.push({ 'code': err.original.code, 'message': err.original.sqlMessage, 'path': 'SQL' });
//       }
//     }
//     return {
//       'data': !errors.length ? {
//         'user': await UniversityUser.findOne({
//           where: { user_id: context.USER._id }
//         })
//       } : null,
//       'errors': errors.length > 0 ? errors : null
//     };
//   }
// }
