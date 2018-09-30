import { GraphQLObjectType, GraphQLString } from "graphql";
import { BuildStatusType } from "./built-status.type";
// import { HistoryPackageType } from "./history-package.type";
// import { HistoryIpfsType } from "./history-ipfs.type";

export const HistoryType = new GraphQLObjectType({
    name: 'HistoryType',
    fields: {
        _id: {
            type: GraphQLString
        },
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
        status: {
            type: BuildStatusType
        },
        namespaceId: {
            type: GraphQLString
        },
        // previews: {
        //     type: new GraphQLList(GraphQLString)
        // },
        // dependencies: {
        //     type: new GraphQLList(GraphQLString)
        // },
        // packages: {
        //     type: new GraphQLList(HistoryPackageType)
        // },
        // ipfs: {
        //     type: new GraphQLList(HistoryIpfsType)
        // },
    }
});