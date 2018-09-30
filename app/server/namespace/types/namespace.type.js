"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.NamespaceType = new graphql_1.GraphQLObjectType({
    name: 'Namespacetype',
    fields: {
        _id: {
            type: graphql_1.GraphQLString
        },
        name: {
            type: graphql_1.GraphQLString
        }
    }
});
//# sourceMappingURL=namespace.type.js.map