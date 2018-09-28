import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import { HistoryPackageType } from "./history-package.type";
import { HistoryIpfsType } from "./history-ipfs.type";

export const HistoryType = new GraphQLObjectType({
    name: 'HistoryType',
    fields: {
        name: {
            type: GraphQLString
        },
        typings: {
            type: GraphQLString
        },
        module: {
            type: GraphQLString
        },
        metadata: {
            type: GraphQLString
        },
        message: {
            type: GraphQLString
        },
        hash: {
            type: GraphQLString
        },
        date: {
            type: GraphQLString
        },
        previews: {
            type: new GraphQLList(GraphQLString)
        },
        dependencies: {
            type: new GraphQLList(GraphQLString)
        },
        packages: {
            type: new GraphQLList(HistoryPackageType)
        },
        ipfs: {
            type: new GraphQLList(HistoryIpfsType)
        },
    }
});