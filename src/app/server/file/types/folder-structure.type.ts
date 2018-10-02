import { GraphQLObjectType, GraphQLString } from "graphql";
import { FileStatusType } from './file-status.type';

export const FolderStructureType = new GraphQLObjectType({
    name: 'FolderStructureType',
    fields: {
        path: {
            type: GraphQLString
        },
        directory: {
            type: GraphQLString
        },
        file: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        status: {
            type: FileStatusType
        }
    }
});