"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const namespace_type_1 = require("./namespace.type");
exports.NamespaceListType = new graphql_1.GraphQLObjectType({
    name: 'NamespaceListType',
    fields: {
        count: {
            type: graphql_1.GraphQLInt
        },
        rows: {
            type: new graphql_1.GraphQLList(namespace_type_1.NamespaceType)
        }
    }
});
//# sourceMappingURL=namespace-list.type.js.map