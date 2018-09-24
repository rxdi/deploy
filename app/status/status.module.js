"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@rxdi/core");
const rxjs_1 = require("rxjs");
const status_injection_tokens_1 = require("./status-injection.tokens");
const status_service_1 = require("./status.service");
let StatusModule = class StatusModule {
};
StatusModule = __decorate([
    core_1.Module({
        services: [
            status_service_1.StatusService,
            {
                provide: status_injection_tokens_1.START,
                useValue: new rxjs_1.BehaviorSubject(true)
            },
            {
                provide: status_injection_tokens_1.FILE_DEPLOYMENT_STATUS,
                useValue: new rxjs_1.BehaviorSubject({
                    file: 'SUCCESS',
                    typings: 'SUCCESS',
                    module: 'SUCCESS'
                })
            }
        ]
    })
], StatusModule);
exports.StatusModule = StatusModule;
//# sourceMappingURL=status.module.js.map