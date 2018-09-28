"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.HistoryPackageType = new graphql_1.GraphQLObjectType({
    name: 'HistoryPackageType',
    fields: {
        name: {
            type: graphql_1.GraphQLString
        },
        version: {
            type: graphql_1.GraphQLString
        }
    }
});
//# sourceMappingURL=history-package.type.js.map