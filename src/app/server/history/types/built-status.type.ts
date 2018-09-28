import { GraphQLObjectType, GraphQLString } from "graphql";

export const BuildStatusType = new GraphQLObjectType({
    name: 'BuildStatusType',
    fields: {
        status: {
            type: GraphQLString
        }
    }
});
