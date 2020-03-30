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
    let userBeingReviewed: any;
    let userCommonTeam: any;
    let subject: any;
    if (!context.USER) {
      errors.push({ code: 'ER_AUTH_FAILURE', path: 'JWT', message: 'User unauthenticated' });
    }
    if (!errors.length) {
      userBeingReviewed = await sequelize.models.User.findOne({ where: { userID: args.userID }, include: [{ model: Team }] });
      if (process.env.NODE_ENV === "test") {
        userBeingReviewed = await sequelize.models.User.noCache().findOne({ where: { userID: args.userID }, include: [{ model: Team }] });
      }
      if (!userBeingReviewed) {
        errors.push({ code: 'ER_USER_UNKNOWN', path: 'userID', message: `No user found with userID ${args.userID}` });
      }
    }
    if (!errors.length) {
      let map: any = {};
      for (const userTeam of context.USER.Teams) {
        if (!map[userTeam.teamID]) {
          map[userTeam.teamID] = userTeam.teamID;
        }
      }
      for (const userTeam of userBeingReviewed.Teams) {
        if (map[userTeam.teamID] && map[userTeam.teamID] === args.teamID) {
          userCommonTeam = userTeam;
          break;
        }
      }
      if (!userCommonTeam) {
        errors.push({ code: 'ER_TEAM_UNKNOWN', path: 'teamID', message: `Logged in user with user id ${context.USER.userID} and user being reviewed with user ID ${args.userID} have no common team with teamID ${args.teamID}` });
      }
    }
    if (!errors.length) {
      subject = await userCommonTeam.getSubject();
      if (!subject) {
        errors.push({ code: 'ER_SUBJECT_UNKNOWN', path: 'teamID', message: `Team with teamID ${userCommonTeam.teamID} belongs to no subject!` });
      }
    }
    if (!errors.length) {
      let hasCompleted = await sequelize.models.Review.findOne(
        {
          where: {
            userID: args.userID,
            submittedByID: context.USER.userID,
            state: subject.state
          }
        }
      );
      if (hasCompleted) {
        errors.push({ code: 'ER_REVIEW_COMPLETE', path: 'userID', message: `user with userID ${context.USER.userID} has already submitted a reivew on user with user ID ${args.userID} for stage ${subject.stage}` });
      }
    }
    if (!errors.length) {
      try {
        await Review.create({
          userID: args.userID,
          submittedByID: context.USER.userID,
          state: subject.state,
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
        'review': await sequelize.models.Review.findOne({ where: { userID: args.userID, submittedByID: context.USER.userID, state: subject.state }})
      }: null,
      'errors': errors.length > 0 ? errors : null
    };
  }
}
