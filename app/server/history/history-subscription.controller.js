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
const history_type_1 = require("./types/history.type");
const built_status_type_1 = require("./types/built-status.type");
const services_1 = require("../../services");
const history_list_type_1 = require("./types/history-list.type");
let HistorySubscriptionController = class HistorySubscriptionController {
    constructor(pubsub, buildHistoryService) {
        this.pubsub = pubsub;
        this.buildHistoryService = buildHistoryService;
    }
    listenForNewBuilds(payload) {
        return { payload };
    }
    buildStatus(payload) {
        return { payload };
    }
    getBuildHistory(root, { skip, limit }) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.buildHistoryService.findAll(skip, limit);
            return {
                count: items.length,
                rows: items
            };
        });
    }
};
__decorate([
    core_1.Type(history_type_1.HistoryType),
    core_1.Subscribe((self) => self.pubsub.asyncIterator('LISTEN_FOR_BUILDS')),
    core_1.Subscription(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HistorySubscriptionController.prototype, "listenForNewBuilds", null);
__decorate([
    core_1.Type(built_status_type_1.BuildStatusType),
    core_1.Subscribe((self) => self.pubsub.asyncIterator('LISTEN_FOR_BUILDS')),
    core_1.Subscription(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HistorySubscriptionController.prototype, "buildStatus", null);
__decorate([
    core_1.Type(history_list_type_1.HistoryListType),
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
], HistorySubscriptionController.prototype, "getBuildHistory", null);
HistorySubscriptionController = __decorate([
    core_1.Controller(),
    __metadata("design:paramtypes", [core_1.PubSubService,
        services_1.BuildHistoryService])
], HistorySubscriptionController);
exports.HistorySubscriptionController = HistorySubscriptionController;
//# sourceMappingURL=history-subscription.controller.js.map