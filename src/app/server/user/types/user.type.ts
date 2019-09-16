import { GraphQLObjectType, GraphQLString } from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    message: {
      type: GraphQLString,
    },
  },
});
