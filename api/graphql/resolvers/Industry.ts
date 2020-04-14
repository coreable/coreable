import { Industry } from "../../models/Industry";
import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList } from "graphql";
import { ReviewResolver } from "./Review";
import { sequelize } from "../../lib/sequelize";
import { User } from "../../models/User";
import { Review } from "../../models/Review";

export const IndustryResolver: GraphQLObjectType<Industry> = new GraphQLObjectType({
  name: 'IndustryResolver',
  description: 'IndustryResolver',
  fields: () => {
    return {
      '_id': {
        type: GraphQLString,
        resolve(industry, args, context) {
          return industry._id;
        }
      },
      'name': {
        type: GraphQLString,
        resolve(industry, args, context) {
          return industry.name;
        }
      },
      'report': {
        type: new GraphQLObjectType({
          name: 'IndustryAverageReport',
          fields: () => {
            return {
              'average': {
                type: ReviewResolver,
                resolve(average, args, context) {
                  return average;
                }
              },
              'sorted': {
                type: new GraphQLList(new GraphQLObjectType({
                  name: 'IndustrySortedAverageArray',
                  fields: () => {
                    return {
                      'field': {
                        type: GraphQLString,
                        resolve(sortable, args, context) {
                          return sortable[0];
                        }
                      },
                      'value': {
                        type: GraphQLFloat,
                        resolve(sortable, args, context) {
                          return sortable[1];
                        }
                      }
                    }
                  }
                })),
                resolve(average, args, context) {
                  const sortable = [];
                  for (const field in average) {
                    if (!isNaN(average[field])) {
                      sortable.push([field, average[field]]);
                    }
                  }
                  sortable.sort((a, b) => {
                    return a[1] - b[1]
                  });
                  return sortable;
                }
              }
            }
          }
        }),
        async resolve(industry, args, context) {
          let averages = await sequelize.models.Industry.findOne({
            where: { _id: industry._id },
            group: ['_id'],
            attributes: {
              exclude: [
                '_id',
                'name',
                'updatedAt',
                'createdAt'
              ],
              include: [
                [
                  sequelize.fn('avg',
                    sequelize.col('users.reviews.calm')),
                  'calm'
                ],
                [
                  sequelize.fn('avg',
                    sequelize.col('users.reviews.change')),
                  'change'
                ],
                [
                  sequelize.fn('avg',
                    sequelize.col('users.reviews.clearInstructions')),
                  'clearInstructions'
                ],
                [
                  sequelize.fn('avg',
                    sequelize.col('users.reviews.cooperatively')),
                  'cooperatively'
                ],
                [
                  sequelize.fn('avg',
                    sequelize.col('users.reviews.crossTeam')),
                  'crossTeam'
                ],
                [
                  sequelize.fn('avg',
                    sequelize.col('users.reviews.distractions')),
                  'distractions'
                ],
                [
                  sequelize.fn('avg',
                    sequelize.col('users.reviews.easilyExplainsComplexIdeas')),
                  'easilyExplainsComplexIdeas'
                ],
                [
                  sequelize.fn('avg',
                    sequelize.col('users.reviews.emotionalResponse')),
                  'emotionalResponse'
                ],
                [
                  sequelize.fn('avg',
                    sequelize.col('users.reviews.empathy')),
                  'empathy'
                ],
                [
                  sequelize.fn('avg',
                    sequelize.col('users.reviews.eyeContact')),
                  'eyeContact'
                ],
                [
                  sequelize.fn('avg',
                    sequelize.col('users.reviews.faith')),
                  'faith'
                ],
                [
                  sequelize.fn('avg',
                    sequelize.col('users.reviews.influences')),
                  'influences'
                ],
                [
                  sequelize.fn('avg',
                    sequelize.col('users.reviews.managesOwn')),
                  'managesOwn'
                ],
                [
                  sequelize.fn('avg',
                    sequelize.col('users.reviews.newIdeas')),
                  'newIdeas'
                ],
                [
                  sequelize.fn('avg',
                    sequelize.col('users.reviews.openToShare')),
                  'openToShare'
                ],
                [
                  sequelize.fn('avg',
                    sequelize.col('users.reviews.positiveBelief')),
                  'positiveBelief'
                ],
                [
                  sequelize.fn('avg',
                    sequelize.col('users.reviews.preventsMisunderstandings')),
                  'preventsMisunderstandings'
                ],
                [
                  sequelize.fn('avg',
                    sequelize.col('users.reviews.proactive')),
                  'proactive'
                ],
                [
                  sequelize.fn('avg',
                    sequelize.col('users.reviews.resilienceFeedback')),
                  'resilienceFeedback'
                ],
                [
                  sequelize.fn('avg',
                    sequelize.col('users.reviews.signifiesInterest')),
                  'signifiesInterest'
                ],
                [
                  sequelize.fn('avg',
                    sequelize.col('users.reviews.tone')),
                  'tone'
                ],
                [
                  sequelize.fn('avg',
                    sequelize.col('users.reviews.verbalAttentiveFeedback')),
                  'verbalAttentiveFeedback'
                ],
                [
                  sequelize.fn('avg',
                    sequelize.col('users.reviews.workDemands')),
                  'workDemands'
                ]
              ]
            },
            include: [{
              model: User,
              as: 'users',
              group: ['_id'],
              attributes: {
                exclude: [
                  'firstName',
                  'lastName',
                  'email',
                  'password',
                  'passwordResetToken',
                  'passwordResetExpiry',
                  'createdAt',
                  'updatedAt'
                ]
              },
              include: [
                {
                  model: Review,
                  as: 'reviews',
                  attributes: {
                    exclude: [
                      'updatedAt',
                      'createdAt'
                    ]
                  },
                  group: ['_id'],
                }
              ]
            }]
          });
          return averages.dataValues;
        }
      }
    }
  }
});