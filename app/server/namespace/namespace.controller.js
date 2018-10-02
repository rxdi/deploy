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
const namespace_type_1 = require("./types/namespace.type");
const namespace_service_1 = require("./services/namespace.service");
const namespace_list_type_1 = require("./types/namespace-list.type");
let NamespaceController = class NamespaceController {
    constructor(namespaceService) {
        this.namespaceService = namespaceService;
    }
    getNamespace(root, { id }) {
        return this.namespaceService.getNamespaceById(id);
    }
    insertNamespace(root, { name }) {
        return __awaiter(this, void 0, void 0, function* () {
            const namespace = yield this.namespaceService.searchForDuplicates(name);
            if (namespace) {
                throw new Error('Namespace already exists!');
            }
            return yield this.namespaceService.insert({ name });
        });
    }
    listNamespaces(root, { skip, limit }) {
        return __awaiter(this, void 0, void 0, function* () {
            const namespaces = yield this.namespaceService.listNamespaces(skip, limit);
            return {
                count: namespaces.length,
                rows: namespaces
            };
        });
    }
};
__decorate([
    core_1.Type(namespace_type_1.NamespaceType),
    core_1.Query({
        id: {
            type: core_1.GraphQLString
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], NamespaceController.prototype, "getNamespace", null);
__decorate([
    core_1.Type(namespace_type_1.NamespaceType),
    core_1.Mutation({
        name: {
            type: core_1.GraphQLString
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NamespaceController.prototype, "insertNamespace", null);
__decorate([
    core_1.Type(namespace_list_type_1.NamespaceListType),
    core_1.Query({
        skip: {
            type: core_1.GraphQLInt
        },
        limit: {
            type: core_1.GraphQLInt
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NamespaceController.prototype, "listNamespaces", null);
NamespaceController = __decorate([
    core_1.Controller(),
    __metadata("design:paramtypes", [namespace_service_1.NamespaceService])
], NamespaceController);
exports.NamespaceController = NamespaceController;
//# sourceMappingURL=namespace.controller.js.map