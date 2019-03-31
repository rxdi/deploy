"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@gapi/core");
exports.ProcessStdOutType = new core_1.GraphQLObjectType({
    name: 'ProcessStdOutType',
    fields: {
        stdout: {
            type: core_1.GraphQLString
        }
    }
});
//# sourceMappingURL=process.type.js.map