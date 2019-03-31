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
const status_injection_tokens_1 = require("./status-injection.tokens");
let StatusService = class StatusService {
    getBuildStatus() {
        return this.$deploymentStatus.getValue();
    }
    setBuildStatus(status) {
        this.$deploymentStatus.next(Object.assign({}, this.$deploymentStatus.getValue(), status));
    }
};
__decorate([
    core_1.Inject(status_injection_tokens_1.FILE_DEPLOYMENT_STATUS),
    __metadata("design:type", Object)
], StatusService.prototype, "$deploymentStatus", void 0);
StatusService = __decorate([
    core_1.Service()
], StatusService);
exports.StatusService = StatusService;
//# sourceMappingURL=status.service.js.map