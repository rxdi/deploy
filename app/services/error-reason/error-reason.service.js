"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@rxdi/core");
let ErrorReasonService = class ErrorReasonService {
    constructor(logger) {
        this.logger = logger;
    }
    moduleIntegrityError(hash) {
        this.logger.log(`Module is with the same integrity like in the version ${hash}`);
        this.logger.log(`To check this version write rxdi-deploy --find ${hash}`);
    }
};
ErrorReasonService = __decorate([
    core_1.Service(),
    __metadata("design:paramtypes", [core_1.BootstrapLogger])
], ErrorReasonService);
exports.ErrorReasonService = ErrorReasonService;
//# sourceMappingURL=error-reason.service.js.map