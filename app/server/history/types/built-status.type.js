"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.BuildStatusType = new graphql_1.GraphQLObjectType({
    name: 'BuildStatusType',
    fields: {
        status: {
            type: graphql_1.GraphQLString
        }
    }
});
//# sourceMappingURL=built-status.type.js.map