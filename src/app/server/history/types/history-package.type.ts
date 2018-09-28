import { GraphQLObjectType, GraphQLString } from "graphql";

export const HistoryPackageType = new GraphQLObjectType({
    name: 'HistoryPackageType',
    fields: {
        name: {
            type: GraphQLString
        },
        version: {
            type: GraphQLString
        }
    }
})