import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import { BuildMetaInfo } from './build-meta-info.type';

export const BuildType = new GraphQLObjectType({
  name: 'BuildType',
  fields: {
    file: {
      type: new GraphQLList(BuildMetaInfo),
    },
    typings: {
      type: new GraphQLList(BuildMetaInfo),
    },
    module: {
      type: new GraphQLList(BuildMetaInfo),
    },
    status: {
      type: GraphQLString,
    },
  },
});
