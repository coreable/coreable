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
import { User } from "../../models/User";
import { Manager } from "../../models/Manager";

export default {
  type: ReviewObjectCommand,
  args: {
    receiver_id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The user being reviewed'
    },
    team_id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The team they have in common'
    },
    // Reviews 
    emotionalResponse: {
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
      if (context.USER instanceof Manager) {
        errors.push({ code: 'ER_MANAGER', message: 'Managers can not submit reviews', path: 'JWT' });
      }
    }
    if (!errors.length) {
      userBeingReviewed = await sequelize.models.User.noCache().findOne({ where: { _id: args.receiver_id }, include: [{ model: Team, as: 'teams' }] });
      if (!userBeingReviewed) {
        errors.push({ code: 'ER_USER_UNKNOWN', path: '_id', message: `No user found with _id ${args.receiver_id}` });
      }
    }
    if (!errors.length) {
      let map: any = {};
      for (const userTeam of context.USER.teams) {
        if (!map[userTeam._id]) {
          map[userTeam._id] = userTeam._id;
        }
      }
      for (const userTeam of userBeingReviewed.teams) {
        if (map[userTeam._id] && map[userTeam._id] === args.team_id) {
          userCommonTeam = userTeam;
          break;
        }
      }
      if (!userCommonTeam) {
        errors.push({ code: 'ER_TEAM_UNKNOWN', path: '_id', message: `Logged in user with _id ${context.USER._id} and user being reviewed with _id ${args.receiver_id} have no common team with _id ${args.team_id}` });
      }
    }
    if (!errors.length) {
      subject = await userCommonTeam.getSubject();
      if (!subject) {
        errors.push({ code: 'ER_SUBJECT_UNKNOWN', path: '_id', message: `Team with _id ${userCommonTeam._id} belongs to no subject!` });
      }
      if ((args.receiver_id === context.USER._id) && subject.state !== 1) {
        errors.push({ code: 'ER_REFLECTION_STATE', path: 'subject', message: `A user can only submit a reflection review during subject state 1` });
      }
      if (subject.state === 4) {
        errors.push({ code: 'ER_SUBJECT_STATE', path: 'subject', message: `A user can only submit a review during subject states 1, 2 or 3` });
      }
    }
    if (!errors.length) {
      let hasCompleted = await sequelize.models.Review.findOne(
        {
          where: {
            receiver_id: args.receiver_id,
            submitter_id: context.USER._id,
            state: subject.state
          }
        }
      );
      if (hasCompleted) {
        errors.push({ code: 'ER_REVIEW_COMPLETE', path: '_id', message: `user with _id ${context.USER._id} has already submitted a reivew on user with _id ${args.receiver_id} for state ${subject.state}` });
      }
    }
    if (!errors.length) {
      try {
        await Review.create({
          receiver_id: args.receiver_id,
          submitter_id: context.USER._id,
          state: subject.state,
          emotionalResponse: args.emotionalResponse,
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
        'review': await sequelize.models.Review.findOne(
          { 
            where: { 
              receiver_id: args.receiver_id,
              submitter_id: context.USER._id,
              state: subject.state 
            }, 
            include: [
              { model: User, as: 'receiver' },
              { model: User, as: 'submitter' }
            ] 
          }
        )
      }: null,
      'errors': errors.length > 0 ? errors : null
    };
  }
}
