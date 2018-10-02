import { GraphQLObjectType, GraphQLList, GraphQLInt } from "graphql";
import { NamespaceType } from './namespace.type';

export const NamespaceListType = new GraphQLObjectType({
    name: 'NamespaceListType',
    fields: {
        count: {
            type: GraphQLInt
        },
        rows: {
            type: new GraphQLList(NamespaceType)
        }
    }
});