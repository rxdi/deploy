import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

export const HistoryIpfsType = new GraphQLObjectType({
  name: 'HistoryIpfsType',
  fields: {
    provider: {
      type: GraphQLString,
    },
    dependencies: {
      type: new GraphQLList(GraphQLString),
    },
  },
});
