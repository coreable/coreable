"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const Query_1 = require("./Query");
exports.Schema = new graphql_1.GraphQLSchema({
    query: Query_1.Query
});
