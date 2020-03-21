import { GraphQLSchema } from "graphql";
import { Query } from "./Query";

export const Schema: GraphQLSchema = new GraphQLSchema({
  query: Query
});