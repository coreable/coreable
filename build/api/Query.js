"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../sequelize");
const graphql_1 = require("graphql");
const User_1 = require("./resolvers/User");
const Industry_1 = require("./resolvers/Industry");
const Group_1 = require("./resolvers/Group");
const Team_1 = require("./resolvers/Team");
exports.Query = new graphql_1.GraphQLObjectType({
    name: 'Query',
    description: 'This is a root query',
    fields: () => {
        return {
            'user': {
                type: new graphql_1.GraphQLList(User_1.UserResolver),
                args: {
                    userID: {
                        type: graphql_1.GraphQLInt
                    },
                    email: {
                        type: graphql_1.GraphQLString
                    },
                    firstName: {
                        type: graphql_1.GraphQLString
                    },
                    lastName: {
                        type: graphql_1.GraphQLString
                    }
                },
                resolve(root, args) {
                    return sequelize_1.sequelize.models.User.findAll({ where: args });
                }
            },
            'industry': {
                type: new graphql_1.GraphQLList(Industry_1.IndustryResolver),
                args: {
                    industryID: {
                        type: graphql_1.GraphQLInt
                    },
                    industryName: {
                        type: graphql_1.GraphQLString
                    }
                },
                resolve(root, args) {
                    return sequelize_1.sequelize.models.Industry.findAll({ where: args });
                }
            },
            'group': {
                type: new graphql_1.GraphQLList(Group_1.GroupResolver),
                args: {
                    groupID: {
                        type: graphql_1.GraphQLInt
                    },
                    teamName: {
                        type: graphql_1.GraphQLString
                    },
                    groupLeader: {
                        type: graphql_1.GraphQLInt
                    },
                    industryID: {
                        type: graphql_1.GraphQLInt
                    }
                },
                resolve(root, args) {
                    return sequelize_1.sequelize.models.Group.findAll({ where: args });
                }
            },
            'team': {
                type: new graphql_1.GraphQLList(Team_1.TeamResolver),
                args: {
                    groupID: {
                        type: graphql_1.GraphQLInt,
                    },
                    userID: {
                        type: graphql_1.GraphQLInt
                    }
                },
                resolve(root, args) {
                    return sequelize_1.sequelize.models.Team.findAll({ where: args });
                }
            }
        };
    }
});
