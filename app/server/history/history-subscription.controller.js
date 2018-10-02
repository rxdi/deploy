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
const core_1 = require("@gapi/core");
const history_type_1 = require("./types/history.type");
let HistorySubscriptionController = class HistorySubscriptionController {
    constructor(pubsub) {
        this.pubsub = pubsub;
    }
    listenForNewBuilds(payload) {
        return { payload };
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
HistorySubscriptionController = __decorate([
    core_1.Controller(),
    __metadata("design:paramtypes", [core_1.PubSubService])
], HistorySubscriptionController);
exports.HistorySubscriptionController = HistorySubscriptionController;
//# sourceMappingURL=history-subscription.controller.js.map