"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const history_package_type_1 = require("./history-package.type");
const history_ipfs_type_1 = require("./history-ipfs.type");
exports.HistoryType = new graphql_1.GraphQLObjectType({
    name: 'HistoryType',
    fields: {
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
        previews: {
            type: new graphql_1.GraphQLList(graphql_1.GraphQLString)
        },
        dependencies: {
            type: new graphql_1.GraphQLList(graphql_1.GraphQLString)
        },
        packages: {
            type: new graphql_1.GraphQLList(history_package_type_1.HistoryPackageType)
        },
        ipfs: {
            type: new graphql_1.GraphQLList(history_ipfs_type_1.HistoryIpfsType)
        },
    }
});
//# sourceMappingURL=history.type.js.map