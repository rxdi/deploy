"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const file_status_type_1 = require("./file-status.type");
exports.FolderStructureType = new graphql_1.GraphQLObjectType({
    name: 'FolderStructureType',
    fields: {
        path: {
            type: graphql_1.GraphQLString
        },
        directory: {
            type: graphql_1.GraphQLString
        },
        file: {
            type: graphql_1.GraphQLString
        },
        name: {
            type: graphql_1.GraphQLString
        },
        status: {
            type: file_status_type_1.FileStatusType
        }
    }
});
//# sourceMappingURL=folder-structure.type.js.map