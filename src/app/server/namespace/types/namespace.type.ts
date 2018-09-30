import { GraphQLObjectType, GraphQLString } from "graphql";

export const NamespaceType = new GraphQLObjectType({
    name: 'Namespacetype',
    fields: {
        _id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        }
    }
});