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
const core_1 = require("@rxdi/core");
const env_injection_tokens_1 = require("../../../../env.injection.tokens");
let NamespaceService = class NamespaceService {
    getNamespace(name) {
        return new Promise((resolve, reject) => {
            this.namespace.find({ name })
                .exec((e, d) => {
                if (e) {
                    reject(e);
                }
                resolve(d);
            });
        });
    }
    getNamespaceById(_id) {
        return new Promise((resolve, reject) => {
            this.namespace.findOne({ _id }, (e, d) => {
                if (e) {
                    reject(e);
                }
                console.log(d);
                resolve(d);
            });
        });
    }
    searchForDuplicates(name) {
        return new Promise((resolve, reject) => {
            this.namespace.findOne({ name }, (e, d) => {
                if (e) {
                    reject(e);
                }
                resolve(d);
            });
        });
    }
    insert(doc) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                this.namespace.insert(doc, (e, d) => {
                    if (e) {
                        reject(e);
                    }
                    resolve(d);
                });
            });
        });
    }
    listNamespaces(skip = 0, limit = 100, sort = { createdAt: -1 }) {
        return new Promise((resolve, reject) => {
            this.namespace
                .find({})
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .exec((e, d) => {
                if (e) {
                    reject(e);
                }
                resolve(d);
            });
        });
    }
};
__decorate([
    core_1.Inject(env_injection_tokens_1.__NAMESPACE_DB),
    __metadata("design:type", Object)
], NamespaceService.prototype, "namespace", void 0);
NamespaceService = __decorate([
    core_1.Service()
], NamespaceService);
exports.NamespaceService = NamespaceService;
//# sourceMappingURL=namespace.service.js.map