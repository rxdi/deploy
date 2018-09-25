"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@rxdi/core");
exports.nextOrDefault = (i, fb = true, type = (p) => (p)) => {
    if (process.argv.toString().includes(i)) {
        const isNextArgumentPresent = process.argv[process.argv.indexOf(i) + 1];
        if (!isNextArgumentPresent) {
            return fb;
        }
        return type(isNextArgumentPresent);
    }
    return fb;
};
exports.includes = (i) => process.argv.toString().includes(i);
let ArgumentsService = class ArgumentsService {
    nextOrDefault(i, fallback = null, type = (p) => (p)) {
        return exports.nextOrDefault(i, fallback, type);
    }
};
ArgumentsService = __decorate([
    core_1.Service()
], ArgumentsService);
exports.ArgumentsService = ArgumentsService;
//# sourceMappingURL=arguments.service.js.map