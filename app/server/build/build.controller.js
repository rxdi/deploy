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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@gapi/core");
const build_type_1 = require("./types/build.type");
const compile_service_1 = require("../services/compile.service");
let BuildController = class BuildController {
    constructor(compileService) {
        this.compileService = compileService;
    }
    triggerBuild(root, { folder, file, message, namespace, buildFolder }) {
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            return yield this.compileService.buildFile(folder, file, message, namespace, buildFolder).toPromise();
        }));
        return {
            status: 'Triggered'
        };
    }
};
__decorate([
    core_1.Type(build_type_1.BuildType),
    core_1.Mutation({
        folder: {
            type: new core_1.GraphQLNonNull(core_1.GraphQLString)
        },
        file: {
            type: new core_1.GraphQLNonNull(core_1.GraphQLString)
        },
        message: {
            type: new core_1.GraphQLNonNull(core_1.GraphQLString)
        },
        namespace: {
            type: new core_1.GraphQLNonNull(core_1.GraphQLString)
        },
        buildFolder: {
            type: core_1.GraphQLString
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BuildController.prototype, "triggerBuild", null);
BuildController = __decorate([
    core_1.Controller(),
    __metadata("design:paramtypes", [compile_service_1.CompileService])
], BuildController);
exports.BuildController = BuildController;
//# sourceMappingURL=build.controller.js.map