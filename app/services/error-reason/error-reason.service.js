"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@rxdi/core");
let ErrorReasonService = class ErrorReasonService {
    moduleIntegrityError(hash) {
        console.log(`Module is with the same integrity like in the previws version ${hash}`);
        console.log(`To check this version write rxdi-deploy --find ${hash}`);
        console.log(`Nothing is deployed --find ${hash}`);
    }
};
ErrorReasonService = __decorate([
    core_1.Service()
], ErrorReasonService);
exports.ErrorReasonService = ErrorReasonService;
//# sourceMappingURL=error-reason.service.js.map