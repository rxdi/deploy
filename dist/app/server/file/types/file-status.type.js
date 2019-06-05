"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@gapi/core");
const file_arguments_1 = require("./file.arguments");
exports.FileStatusType = new core_1.GraphQLObjectType({
    name: 'FileStatusType',
    fields: file_arguments_1.FileArguments
});
//# sourceMappingURL=file-status.type.js.map