import { GraphQLObjectType, GraphQLList, GraphQLInt } from "graphql";
import { HistoryType } from "./history.type";

export const HistoryListType = new GraphQLObjectType({
    name: 'HistoryListType',
    fields: {
        count: {
            type: GraphQLInt
        },
        rows: {
            type: new GraphQLList(HistoryType)
        }
    }
});