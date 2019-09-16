import { GraphQLObjectType, GraphQLString } from 'graphql';

export const FileRawType = new GraphQLObjectType({
  name: 'FileRawType',
  fields: {
    package: {
      type: GraphQLString,
    },
    file: {
      type: GraphQLString,
    },
  },
});
