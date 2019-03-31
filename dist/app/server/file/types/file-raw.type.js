"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.FileRawType = new graphql_1.GraphQLObjectType({
    name: 'FileRawType',
    fields: {
        package: {
            type: graphql_1.GraphQLString
        },
        file: {
            type: graphql_1.GraphQLString
        }
    }
});
//# sourceMappingURL=file-raw.type.js.map