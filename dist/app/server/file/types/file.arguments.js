"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.FileArguments = {
    size: {
        type: graphql_1.GraphQLString
    },
    birthtime: {
        type: graphql_1.GraphQLString
    },
    ctime: {
        type: graphql_1.GraphQLString
    },
    mtime: {
        type: graphql_1.GraphQLString
    },
    atime: {
        type: graphql_1.GraphQLString
    },
    birthtimeMs: {
        type: graphql_1.GraphQLString
    },
    ctimeMs: {
        type: graphql_1.GraphQLString
    },
    mtimeMs: {
        type: graphql_1.GraphQLString
    },
    atimeMs: {
        type: graphql_1.GraphQLString
    },
    blocks: {
        type: graphql_1.GraphQLInt
    },
    ino: {
        type: graphql_1.GraphQLInt
    },
    blksize: {
        type: graphql_1.GraphQLInt
    },
    rdev: {
        type: graphql_1.GraphQLInt
    },
    gid: {
        type: graphql_1.GraphQLInt
    },
    uid: {
        type: graphql_1.GraphQLInt
    },
    nlink: {
        type: graphql_1.GraphQLInt
    },
    mode: {
        type: graphql_1.GraphQLInt
    },
    dev: {
        type: graphql_1.GraphQLInt
    },
};
//# sourceMappingURL=file.arguments.js.map