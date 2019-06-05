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
const compile_plugin_1 = require("../../plugins/compile/compile.plugin");
let CompileService = class CompileService {
    constructor(compilePlugin) {
        this.compilePlugin = compilePlugin;
    }
    buildFile(folder = './packages/', file = 'index.ts', message = 'bla bla', namespace = '@pesho', buildFolder) {
        return this.compilePlugin.completeBuildAndAddToIpfs(folder, file, message, namespace, 'reactive.json', buildFolder);
    }
    pushTransaction(folder = './packages/', file = 'index.ts', message = 'bla bla', namespace = '@pesho', buildFolder) {
        return this.compilePlugin.pushTransaction(folder, file, message, namespace, 'reactive.json', buildFolder);
    }
};
CompileService = __decorate([
    core_1.Service(),
    __metadata("design:paramtypes", [compile_plugin_1.CompilePlugin])
], CompileService);
exports.CompileService = CompileService;
//# sourceMappingURL=compile.service.js.map