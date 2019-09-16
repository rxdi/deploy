import { GraphQLString, GraphQLInt } from 'graphql';

export const FileArguments = {
  size: {
    type: GraphQLString,
  },
  birthtime: {
    type: GraphQLString,
  },
  ctime: {
    type: GraphQLString,
  },
  mtime: {
    type: GraphQLString,
  },
  atime: {
    type: GraphQLString,
  },
  birthtimeMs: {
    type: GraphQLString,
  },
  ctimeMs: {
    type: GraphQLString,
  },
  mtimeMs: {
    type: GraphQLString,
  },
  atimeMs: {
    type: GraphQLString,
  },
  blocks: {
    type: GraphQLInt,
  },
  ino: {
    type: GraphQLInt,
  },
  blksize: {
    type: GraphQLInt,
  },
  rdev: {
    type: GraphQLInt,
  },
  gid: {
    type: GraphQLInt,
  },
  uid: {
    type: GraphQLInt,
  },
  nlink: {
    type: GraphQLInt,
  },
  mode: {
    type: GraphQLInt,
  },
  dev: {
    type: GraphQLInt,
  },
};
