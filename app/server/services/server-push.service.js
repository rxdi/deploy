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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const http_1 = require("http");
const hapi_1 = require("hapi");
const hapi_2 = require("@rxdi/hapi");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const services_1 = require("../../services");
let ServerPushService = class ServerPushService {
    constructor(server, exitHandler, afterStarterService, openService) {
        this.server = server;
        this.exitHandler = exitHandler;
        this.afterStarterService = afterStarterService;
        this.openService = openService;
        this.sendToClient = new rxjs_1.Subject();
        this.sendTime = new rxjs_1.Subject();
        this.clientConnected = new rxjs_1.Subject();
        this.exitHandler.errorHandler.subscribe((e) => __awaiter(this, void 0, void 0, function* () { return yield this.stopServerWatcher(); }));
        this.server.events.on('response', (request) => this.sendToClient.next({ query: request.payload, response: request.response['source'] }));
        rxjs_1.timer(0, 1000).pipe(operators_1.tap(() => this.sendTime.next(true))).subscribe();
        this.afterStarterService.appStarted
            .pipe(operators_1.switchMapTo(this.waitXSeconds(5)), operators_1.take(1), operators_1.filter(() => !this.connected), operators_1.filter(() => services_1.includes('--webui')), operators_1.tap(() => this.openService.openPage(`http://${this.server.info.address}:${this.server.info.port}/webui`))).subscribe();
    }
    waitXSeconds(sec) {
        return rxjs_1.Observable.create((o) => {
            const timeout = setTimeout(() => o.next(true), sec * 1000);
            return () => clearTimeout(timeout);
        });
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            if (services_1.includes('--webui')) {
                this.createServerWatcher();
            }
        });
    }
    stopServerWatcher() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve) => this.serverWatcher.close(() => resolve()));
        });
    }
    createServerWatcher() {
        this.serverWatcher = http_1.createServer(this.OnRequest.bind(this));
        this.serverWatcher.listen(8968);
    }
    OnRequest(req, res) {
        if (req.url === '/status') {
            if (!this.connected) {
                this.clientConnected.next(true);
                res.write('data: ' + JSON.stringify({ response: { init: true } }) + '\n\n');
            }
            this.connected = true;
            res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
            });
            this.sendToClient.subscribe((data) => res.write('data: ' + JSON.stringify(data) + '\n\n'));
            this.sendTime.subscribe((data) => res.write('data: ' + JSON.stringify({ time: new Date().toLocaleTimeString() }) + '\n\n'));
            this.sendTime.subscribe((data) => res.write('data: ' + JSON.stringify({ config: { graphql: {}, hapi: this.server.info } }) + '\n\n'));
            req.on('end', () => {
                this.connected = false;
                req.destroy();
            });
            return;
        }
        res.statusCode = 400;
        return res.end();
    }
};
ServerPushService = __decorate([
    core_1.Service(),
    __param(0, core_1.Inject(hapi_2.HAPI_SERVER)),
    __metadata("design:paramtypes", [hapi_1.Server,
        core_1.ExitHandlerService,
        core_1.AfterStarterService,
        hapi_2.OpenService])
], ServerPushService);
exports.ServerPushService = ServerPushService;
//# sourceMappingURL=server-push.service.js.map