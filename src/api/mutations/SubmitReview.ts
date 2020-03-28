import { 
  GraphQLNonNull,
  GraphQLString
} from "graphql";

import { CoreableError } from "../../models/CoreableError";

import { sequelize } from "../../lib/sequelize";
import { ReviewObjectCommand } from "../command/object/Review";
import { Team } from "../../models/Team";

export default {
  type: ReviewObjectCommand,
  args: {
    userID: {
      type: new GraphQLNonNull(GraphQLString)
    },
    teamID: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let userSubmittingReview: any = context.USER;
    let userBeingReviewed: any;
    let review: any;
    let userCommonTeam: any;
    let subject: any;
    
    if (!context.USER) {
      errors.push({ code: 'ER_AUTH_FAILURE', path: 'JWT', message: 'User unauthenticated' });
    }
    if (!errors.length) {
      userBeingReviewed = await sequelize.models.User.findOne({ where: { email: args.userID }, include: [{ model: Team }] });
      if (!userBeingReviewed) {
        errors.push({ code: 'ER_USER_UNKNOWN', path: 'userID', message: `No user found with userID ${args.userID}` });
      }
    }
    if (!errors.length) {
      const map: any = {};
      for (let i = 0; i < userSubmittingReview.Teams.length; i++) {
        let element = userSubmittingReview.Teams[i];
        if (!map[element]) {
          map[userSubmittingReview.Teams[i]] = true;
        }
      }
      for (let i = 0; i < userBeingReviewed.Teams.length; i++) {
        let element = userBeingReviewed.Teams[i];
        if (map[element] && element.teamID === args.teamID) {
          userCommonTeam = element;
          break;
        }
      }
      if (!userCommonTeam) {
        errors.push({ code: 'ER_TEAM_UNKOWN', path: 'teamID', message: `Logged in user with user id ${userSubmittingReview.userID} and user being reviewed with user ID ${userBeingReviewed.userID} have no common team with teamID ${args.teamID}` });
      }
    }
    if (!errors.length) {
      subject = await userCommonTeam.getSubject();
      if (!userCommonTeam) {
        errors.push({ code: 'ER_SUBJECT_UNKNOWN', path: 'teamID', message: `Logged in user with user id ${userSubmittingReview.userID} and user being reviewed with user ID ${userBeingReviewed.userID} have no common team with teamID ${args.teamID}` });
      }
    }
    if (!errors.length) {
      let hasCompleted = await sequelize.models.Review.findOne({ where: { userID: userBeingReviewed.userID, submittedByID: userSubmittingReview.userID, stage: subject.stage }});
      if (hasCompleted) {
        errors.push({ code: 'ER_REVIEW_COMPLETE', path: 'userID', message: `user with userID ${userSubmittingReview.userID} has already submitted a reivew on user with user ID ${userBeingReviewed.userID} for stage ${subject.stage}` });
      }
    }
    return {
      'result': !errors.length ? {
        'review': review
      }: null,
      'errors': errors.length > 0 ? errors : null
    };
  }
}
