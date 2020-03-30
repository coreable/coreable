import { sequelize } from "../../lib/sequelize";
import { 
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt
} from "graphql";

import { ReviewObjectCommand } from "../command/object/Review";
import { CoreableError } from "../../models/CoreableError";
import { Team } from "../../models/Team";
import { Review } from "../../models/Review";

export default {
  type: ReviewObjectCommand,
  args: {
    userID: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The user being reviewed'
    },
    teamID: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The team they have in common'
    },
    // Reviews 
    emotionalReponse: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    empathy: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    managesOwn: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    faith: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    cooperatively: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    positiveBelief: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    resilienceFeedback: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    calm: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    change: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    newIdeas: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    workDemands: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    proactive: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    influences: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    clearInstructions: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    preventsMisunderstandings: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    easilyExplainsComplexIdeas: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    openToShare: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    tone: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    crossTeam: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    distractions: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    eyeContact: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    signifiesInterest: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    verbalAttentiveFeedback: {
      type: new GraphQLNonNull(GraphQLInt),
    }
  },
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let userSubmittingReview: any;
    let userSubmittingReviewTeams: any;
    let userBeingReviewed: any;
    let review: any;
    let userCommonTeam: any;
    let subject: any;
    if (!context.USER) {
      errors.push({ code: 'ER_AUTH_FAILURE', path: 'JWT', message: 'User unauthenticated' });
    }
    if (!errors.length) {
      userSubmittingReview = context.USER;
      userSubmittingReview.Teams = userSubmittingReview.getTeams(); // We do this in case the cache isn't updated
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
      if (!subject) {
        errors.push({ code: 'ER_SUBJECT_UNKNOWN', path: 'teamID', message: `Team with teamID ${userCommonTeam.teamID} belongs to no subject!` });
      }
    }
    if (!errors.length) {
      let hasCompleted = await sequelize.models.Review.findOne({ where: { userID: userBeingReviewed.userID, submittedByID: userSubmittingReview.userID, stage: subject.stage }});
      if (!!hasCompleted) {
        errors.push({ code: 'ER_REVIEW_COMPLETE', path: 'userID', message: `user with userID ${userSubmittingReview.userID} has already submitted a reivew on user with user ID ${userBeingReviewed.userID} for stage ${subject.stage}` });
      }
    }
    if (!errors.length) {
      try {
        review = await Review.create({
          userID: userBeingReviewed.userID,
          submittedByID: userSubmittingReview.userID,
          stage: subject.stage,
          emotionalReponse: args.emotionalReponse,
          empathy: args.empathy,
          managesOwn: args.managesOwn,
          faith: args.faith,
          cooperatively: args.cooperatively,
          positiveBelief: args.positiveBelief,
          resilienceFeedback: args.resilienceFeedback,
          calm: args.calm,
          change: args.change,
          newIdeas: args.newIdeas,
          workDemands: args.workDemans,
          proactive: args.proactive,
          influences: args.influences,
          clearInstructions: args.clearInstructions,
          preventsMisunderstandings: args.preventsMisunderstandings,
          easilyExplainsComplexIdeas: args.easilyExplainsComplexIdeas,
          openToShare: args.openToShare,
          tone: args.tone,
          crossTeam: args.crossTeam,
          distractions: args.distractions,
          eyeContact: args.eyeContact,
          signifiesInterest: args.signifiesInterest,
          verbalAttentiveFeedback: args.verbalAttentiveFeedback
        });
      } catch (err) {
        errors.push({ 'code': err.original.code, 'message': err.original.sqlMessage, 'path': 'SQL' });
      }
    }
    return {
      'data': !errors.length ? {
        'review': review
      }: null,
      'errors': errors.length > 0 ? errors : null
    };
  }
}
