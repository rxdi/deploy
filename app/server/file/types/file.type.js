"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const folder_structure_type_1 = require("./folder-structure.type");
exports.FileType = new graphql_1.GraphQLObjectType({
    name: 'FileType',
    fields: {
        paths: {
            type: new graphql_1.GraphQLList(folder_structure_type_1.FolderStructureType)
        }
    }
});
//# sourceMappingURL=file.type.js.map