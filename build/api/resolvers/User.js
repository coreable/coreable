"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../../sequelize");
const graphql_1 = require("graphql");
const Industry_1 = require("./Industry");
const Team_1 = require("./Team");
exports.UserResolver = new graphql_1.GraphQLObjectType({
    name: 'User',
    description: 'This represents a User',
    fields: () => {
        return {
            'userID': {
                type: graphql_1.GraphQLInt,
                resolve(user) {
                    return user.userID;
                }
            },
            'firstName': {
                type: graphql_1.GraphQLString,
                resolve(user) {
                    return user.firstName;
                }
            },
            'lastName': {
                type: graphql_1.GraphQLString,
                resolve(user) {
                    return user.lastName;
                }
            },
            'email': {
                type: graphql_1.GraphQLString,
                resolve(user) {
                    return user.email;
                }
            },
            'industryID': {
                type: graphql_1.GraphQLInt,
                resolve(user) {
                    return user.industryID;
                }
            },
            'cognitoID': {
                type: graphql_1.GraphQLString,
                resolve(user) {
                    return user.cognitoID;
                }
            },
            'industry': {
                type: Industry_1.IndustryResolver,
                resolve(user) {
                    return user.getIndustry();
                }
            },
            'team': {
                type: graphql_1.GraphQLList(Team_1.TeamResolver),
                resolve(user) {
                    return sequelize_1.sequelize.models.Team.findAll({ where: { userID: user.dataValues.userID } });
                }
            }
        };
    }
});
