import { GraphQLObjectType, GraphQLString } from "graphql";

export const BuildType = new GraphQLObjectType({
    name: 'BuildType',
    fields: {
        status: {
            type: GraphQLString
        }
    }
});