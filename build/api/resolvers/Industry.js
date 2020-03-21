"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.IndustryResolver = new graphql_1.GraphQLObjectType({
    name: 'Industry',
    description: 'This represents a Industry',
    fields: () => {
        return {
            'industryID': {
                type: graphql_1.GraphQLInt,
                resolve(industry) {
                    return industry.industryID;
                }
            },
            'industryName': {
                type: graphql_1.GraphQLString,
                resolve(industry) {
                    return industry.industryName;
                }
            }
        };
    }
});
