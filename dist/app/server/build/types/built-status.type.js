"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.BuildStatus = new graphql_1.GraphQLObjectType({
    name: 'BuildStatus',
    fields: {
        status: {
            type: graphql_1.GraphQLString
        },
        message: {
            type: graphql_1.GraphQLString
        }
    }
});
exports.BuildStatusType = new graphql_1.GraphQLObjectType({
    name: 'BuildStatusType',
    fields: {
        file: {
            type: exports.BuildStatus
        },
        typings: {
            type: exports.BuildStatus
        },
        module: {
            type: exports.BuildStatus
        }
    }
});
//# sourceMappingURL=built-status.type.js.map