import { GraphQLObjectType, GraphQLString } from 'graphql';

export const BuildMetaInfo = new GraphQLObjectType({
  name: 'BuildMetaInfo',
  fields: () => ({
    path: {
      type: GraphQLString
    },
    hash: {
      type: GraphQLString
    }
  })
});
