"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const file_arguments_1 = require("./file.arguments");
exports.FileInputObjectType = new graphql_1.GraphQLInputObjectType({
    name: 'FileInputObjectType',
    fields: () => (file_arguments_1.FileArguments)
});
//# sourceMappingURL=file-input.type.js.map