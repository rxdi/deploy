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
const core_2 = require("@gapi/core");
const graphql_1 = require("graphql");
const user_type_1 = require("./types/user.type");
let UserQueriesController = class UserQueriesController {
    constructor(pubsub) {
        this.pubsub = pubsub;
    }
    findUser(root, { message }) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                message
            };
        });
    }
    subscribeToUserMessagesBasic({ message }) {
        return { message };
    }
};
__decorate([
    core_2.Type(user_type_1.UserType),
    core_2.Query({
        message: {
            type: graphql_1.GraphQLString
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserQueriesController.prototype, "findUser", null);
__decorate([
    core_2.Type(user_type_1.UserType),
    core_2.Subscribe((self) => self.pubsub.asyncIterator('CREATE_SIGNAL_BASIC')),
    core_2.Subscription(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserQueriesController.prototype, "subscribeToUserMessagesBasic", null);
UserQueriesController = __decorate([
    core_1.Controller(),
    __metadata("design:paramtypes", [core_2.PubSubService])
], UserQueriesController);
exports.UserQueriesController = UserQueriesController;
//# sourceMappingURL=user-queries.controller.js.map