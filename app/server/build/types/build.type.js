"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.BuildType = new graphql_1.GraphQLObjectType({
    name: 'BuildType',
    fields: {
        status: {
            type: graphql_1.GraphQLString
        }
    }
});
//# sourceMappingURL=build.type.js.map