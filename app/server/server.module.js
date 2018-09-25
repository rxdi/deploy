"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@rxdi/core");
const webui_service_1 = require("./services/webui.service");
const server_push_service_1 = require("./services/server-push.service");
const user_queries_controller_1 = require("./user/user-queries.controller");
let ServerModule = class ServerModule {
};
ServerModule = __decorate([
    core_1.Module({
        services: [webui_service_1.WebUiService, server_push_service_1.ServerPushService],
        controllers: [user_queries_controller_1.UserQueriesController]
    })
], ServerModule);
exports.ServerModule = ServerModule;
//# sourceMappingURL=server.module.js.map