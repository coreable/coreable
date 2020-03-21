"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../../sequelize");
const graphql_1 = require("graphql");
const Group_1 = require("./Group");
const User_1 = require("./User");
exports.TeamResolver = new graphql_1.GraphQLObjectType({
    name: 'Team',
    description: 'This represents a Team',
    fields: () => {
        return {
            'groupID': {
                type: graphql_1.GraphQLInt,
                resolve(team) {
                    return team.groupID;
                }
            },
            'userID': {
                type: graphql_1.GraphQLInt,
                resolve(team) {
                    return team.userID;
                }
            },
            'group': {
                type: graphql_1.GraphQLList(Group_1.GroupResolver),
                resolve(team) {
                    return sequelize_1.sequelize.models.Group.findAll({ where: { groupID: team.dataValues.groupID } });
                }
            },
            'user': {
                type: graphql_1.GraphQLList(User_1.UserResolver),
                resolve(team) {
                    return sequelize_1.sequelize.models.User.findAll({ where: { userID: team.dataValues.userID } });
                }
            }
        };
    }
});
