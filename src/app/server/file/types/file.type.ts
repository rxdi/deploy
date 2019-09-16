import { GraphQLObjectType, GraphQLList } from 'graphql';
import { FolderStructureType } from './folder-structure.type';

export const FileType = new GraphQLObjectType({
  name: 'FileType',
  fields: {
    paths: {
      type: new GraphQLList(FolderStructureType),
    },
  },
});
