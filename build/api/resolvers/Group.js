"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../../sequelize");
const graphql_1 = require("graphql");
const User_1 = require("./User");
const Team_1 = require("./Team");
exports.GroupResolver = new graphql_1.GraphQLObjectType({
    name: 'Group',
    description: 'This represents a Group',
    fields: () => {
        return {
            'groupID': {
                type: graphql_1.GraphQLInt,
                resolve(group) {
                    return group.groupID;
                }
            },
            'teamName': {
                type: graphql_1.GraphQLString,
                resolve(group) {
                    return group.teamName;
                }
            },
            'groupLeader': {
                type: graphql_1.GraphQLList(User_1.UserResolver),
                resolve(group) {
                    return sequelize_1.sequelize.models.User.findAll({ where: { userID: group.dataValues.groupLeader } });
                }
            },
            'industryID': {
                type: graphql_1.GraphQLInt,
                resolve(group) {
                    return group.industryID;
                }
            },
            'team': {
                type: graphql_1.GraphQLList(Team_1.TeamResolver),
                resolve(group) {
                    return sequelize_1.sequelize.models.Team.findAll({ where: { groupID: group.dataValues.groupID } });
                }
            }
        };
    }
});
