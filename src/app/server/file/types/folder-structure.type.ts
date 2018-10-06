import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from "graphql";
import { FileStatusType } from './file-status.type';

export const FolderStructureType = new GraphQLObjectType({
    name: 'FolderStructureType',
    fields: {
        path: {
            type: GraphQLString
        },
        directory: {
            type: GraphQLBoolean
        },
        file: {
            type: GraphQLBoolean
        },
        name: {
            type: GraphQLString
        },
        status: {
            type: FileStatusType
        }
    }
});