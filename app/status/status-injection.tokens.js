"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("@rxdi/core/container/Token");
class FILE_DEPLOYMENT_STATUS_INTERFACE {
    constructor() {
        this.file = 'SUCCESS';
        this.typings = 'SUCCESS';
        this.module = 'SUCCESS';
    }
}
exports.FILE_DEPLOYMENT_STATUS_INTERFACE = FILE_DEPLOYMENT_STATUS_INTERFACE;
exports.START = new Token_1.InjectionToken('compilation-started');
exports.FILE_DEPLOYMENT_STATUS = new Token_1.InjectionToken('files-deploy-ment');
//# sourceMappingURL=status-injection.tokens.js.map