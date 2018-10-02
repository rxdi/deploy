import { GraphQLObjectType, GraphQLString } from "graphql";

export const FileRawType = new GraphQLObjectType({
    name: 'FileRawType',
    fields: {
        file: {
            type: GraphQLString
        }
    }
})