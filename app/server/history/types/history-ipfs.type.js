"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.HistoryIpfsType = new graphql_1.GraphQLObjectType({
    name: 'HistoryIpfsType',
    fields: {
        provider: {
            type: graphql_1.GraphQLString
        },
        dependencies: {
            type: new graphql_1.GraphQLList(graphql_1.GraphQLString)
        }
    }
});
//# sourceMappingURL=history-ipfs.type.js.map