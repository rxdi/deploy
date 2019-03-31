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
const hapi_1 = require("@rxdi/hapi");
const core_1 = require("@rxdi/core");
const hapi_2 = require("hapi");
const env_injection_tokens_1 = require("../../../env.injection.tokens");
const services_1 = require("../../services");
let WebUiService = class WebUiService {
    constructor(server, root_folder) {
        this.server = server;
        this.root_folder = root_folder;
    }
    OnInit() {
        services_1.includes('--webui') ? this.register() : null;
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.route({
                method: 'GET',
                path: '/webui/{param*}',
                handler: {
                    directory: {
                        path: `${this.root_folder}/webui`,
                        listing: true,
                        index: ['index.html']
                    }
                }
            });
        });
    }
};
WebUiService = __decorate([
    core_1.Service(),
    __param(0, core_1.Inject(hapi_1.HAPI_SERVER)),
    __param(1, core_1.Inject(env_injection_tokens_1.__ROOT_FOLDER)),
    __metadata("design:paramtypes", [hapi_2.Server, String])
], WebUiService);
exports.WebUiService = WebUiService;
//# sourceMappingURL=webui.service.js.map