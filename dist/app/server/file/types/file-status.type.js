"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@gapi/core");
exports.FileStatusType = new core_1.GraphQLObjectType({
    name: 'FileStatusType',
    fields: {
        size: {
            type: core_1.GraphQLString
        },
        birthtime: {
            type: core_1.GraphQLString
        },
        ctime: {
            type: core_1.GraphQLString
        },
        mtime: {
            type: core_1.GraphQLString
        },
        atime: {
            type: core_1.GraphQLString
        },
        birthtimeMs: {
            type: core_1.GraphQLString
        },
        ctimeMs: {
            type: core_1.GraphQLString
        },
        mtimeMs: {
            type: core_1.GraphQLString
        },
        atimeMs: {
            type: core_1.GraphQLString
        },
        blocks: {
            type: core_1.GraphQLInt
        },
        ino: {
            type: core_1.GraphQLInt
        },
        blksize: {
            type: core_1.GraphQLInt
        },
        rdev: {
            type: core_1.GraphQLInt
        },
        gid: {
            type: core_1.GraphQLInt
        },
        uid: {
            type: core_1.GraphQLInt
        },
        nlink: {
            type: core_1.GraphQLInt
        },
        mode: {
            type: core_1.GraphQLInt
        },
        dev: {
            type: core_1.GraphQLInt
        },
    }
});
//# sourceMappingURL=file-status.type.js.map