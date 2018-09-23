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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@rxdi/core");
const env_injection_tokens_1 = require("../../../env.injection.tokens");
exports.nextOrDefault = (i, fb = null, type = (p) => (p)) => process.argv.toString().includes(i) ? type(process.argv[process.argv.indexOf(i) + 1]) : fb;
let ArgumentsService = class ArgumentsService {
    constructor(args) {
        this.args = args;
    }
    nextOrDefault(i, fallback = null, type = (p) => (p)) {
        return exports.nextOrDefault(i, fallback, type);
    }
};
ArgumentsService = __decorate([
    core_1.Service(),
    __param(0, core_1.Inject(env_injection_tokens_1.__DEPLOYER_ARGUMENTS)),
    __metadata("design:paramtypes", [Array])
], ArgumentsService);
exports.ArgumentsService = ArgumentsService;
