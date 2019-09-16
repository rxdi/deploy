import { GraphQLObjectType } from '@gapi/core';
import { FileArguments } from './file.arguments';

export const FileStatusType = new GraphQLObjectType({
  name: 'FileStatusType',
  fields: FileArguments,
});
