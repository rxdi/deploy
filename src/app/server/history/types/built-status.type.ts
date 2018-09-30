import { GraphQLObjectType, GraphQLString } from "graphql";


export const BuildStatus = new GraphQLObjectType({
    name: 'BuildStatus',
    fields: {
        status: {
            type: GraphQLString
        },
        message: {
            type: GraphQLString
        }
    }
});

export const BuildStatusType = new GraphQLObjectType({
    name: 'BuildStatusType',
    fields: {
        file: {
            type: BuildStatus
        },
        typings: {
            type: BuildStatus
        },
        module: {
            type: BuildStatus
        }
    }
});
