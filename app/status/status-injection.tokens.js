"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("@rxdi/core/container/Token");
class BuildStatus {
    constructor() {
        this.status = 'SUCCESS';
        this.message = '';
    }
}
class FILE_DEPLOYMENT_STATUS_INTERFACE {
    constructor() {
        this.file = new BuildStatus();
        this.typings = new BuildStatus();
        this.module = new BuildStatus();
    }
}
exports.FILE_DEPLOYMENT_STATUS_INTERFACE = FILE_DEPLOYMENT_STATUS_INTERFACE;
exports.START = new Token_1.InjectionToken('compilation-started');
exports.FILE_DEPLOYMENT_STATUS = new Token_1.InjectionToken('files-deploy-ment');
//# sourceMappingURL=status-injection.tokens.js.map