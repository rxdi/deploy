"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const built_status_type_1 = require("./built-status.type");
exports.HistoryType = new graphql_1.GraphQLObjectType({
    name: 'HistoryType',
    fields: {
        _id: {
            type: graphql_1.GraphQLString
        },
        name: {
            type: graphql_1.GraphQLString
        },
        typings: {
            type: graphql_1.GraphQLString
        },
        module: {
            type: graphql_1.GraphQLString
        },
        metadata: {
            type: graphql_1.GraphQLString
        },
        message: {
            type: graphql_1.GraphQLString
        },
        hash: {
            type: graphql_1.GraphQLString
        },
        date: {
            type: graphql_1.GraphQLString
        },
        status: {
            type: built_status_type_1.BuildStatusType
        },
        namespaceId: {
            type: graphql_1.GraphQLString
        },
    }
});
//# sourceMappingURL=history.type.js.map