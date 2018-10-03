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
const services_1 = require("../../services");
const history_list_type_1 = require("../history/types/history-list.type");
const built_status_type_1 = require("./types/built-status.type");
const process_type_1 = require("./types/process.type");
const fs_1 = require("fs");
const util_1 = require("util");
let BuildController = class BuildController {
    constructor(compileService, buildHistoryService, pubsub, fileService, tsGenerator, loggerService) {
        this.compileService = compileService;
        this.buildHistoryService = buildHistoryService;
        this.pubsub = pubsub;
        this.fileService = fileService;
        this.tsGenerator = tsGenerator;
        this.loggerService = loggerService;
    }
    triggerBuild(root, { folder, file, message, namespace, buildFolder }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield this.fileService.writeFile(folder + '/tsconfig.json', this.tsGenerator.getTsConfig(file.replace('.ts', '')));
                const log_file = fs_1.createWriteStream(`${folder}/${file}.log`, { flags: 'w' });
                const subscription = this.loggerService.stdout.subscribe(log => {
                    log_file.write(util_1.format(log) + '\n');
                    this.pubsub.publish('CREATE_SIGNAL_BASIC', { message: util_1.format(log) });
                });
                let sub;
                const cancelSubscription = () => {
                    subscription.unsubscribe();
                    log_file.close();
                    sub.unsubscribe();
                    reject('Build failed');
                };
                sub = this.compileService.buildFile(folder, file, message, namespace, buildFolder).subscribe(() => {
                    resolve({
                        status: 'Finish'
                    });
                    cancelSubscription();
                }, () => cancelSubscription());
            }));
        });
    }
    getBuildHistory(root, { skip, limit, where }) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.buildHistoryService.findAll(skip, limit, null, where);
            return {
                count: items.length,
                rows: items
            };
        });
    }
    buildStatus(payload) {
        return { payload };
    }
    processStdOut(payload) {
        return { payload };
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
    __metadata("design:returntype", Promise)
], BuildController.prototype, "triggerBuild", null);
__decorate([
    core_1.Type(history_list_type_1.HistoryListType),
    core_1.Query({
        skip: {
            type: core_1.GraphQLInt
        },
        limit: {
            type: core_1.GraphQLInt
        },
        where: {
            type: new core_1.GraphQLInputObjectType({
                name: 'BuildWhereType',
                fields: {
                    namespaceId: {
                        type: core_1.GraphQLString
                    },
                    name: {
                        type: core_1.GraphQLString
                    }
                }
            })
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BuildController.prototype, "getBuildHistory", null);
__decorate([
    core_1.Type(built_status_type_1.BuildStatusType),
    core_1.Subscribe((self) => self.pubsub.asyncIterator('LISTEN_FOR_BUILDS')),
    core_1.Subscription(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BuildController.prototype, "buildStatus", null);
__decorate([
    core_1.Type(process_type_1.ProcessStdOutType),
    core_1.Subscribe((self) => self.pubsub.asyncIterator('PROCESS_STDOUT')),
    core_1.Subscription(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BuildController.prototype, "processStdOut", null);
BuildController = __decorate([
    core_1.Controller(),
    __metadata("design:paramtypes", [compile_service_1.CompileService,
        services_1.BuildHistoryService,
        core_1.PubSubService,
        services_1.FileService,
        services_1.TsConfigGenratorService,
        services_1.LoggerService])
], BuildController);
exports.BuildController = BuildController;
//# sourceMappingURL=build.controller.js.map