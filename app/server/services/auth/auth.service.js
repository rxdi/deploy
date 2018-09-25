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
const boom_1 = require("boom");
const auth_1 = require("@gapi/auth");
let AuthService = class AuthService {
    constructor(authService) {
        this.authService = authService;
    }
    onSubOperation(message, params, webSocket) {
        return params;
    }
    onSubConnection(connectionParams) {
        return __awaiter(this, void 0, void 0, function* () {
            if (connectionParams.token) {
                return yield this.validateToken(connectionParams.token, 'Subscription');
            }
            else {
                throw boom_1.default.unauthorized();
            }
        });
    }
    validateToken(token, requestType = 'Query') {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = this.verifyToken(token);
            tokenData.type = tokenData.scope[0];
            let user = {};
            try {
            }
            catch (e) {
                console.log(e);
            }
            console.log(`${requestType} from: ${JSON.stringify(user)}`);
            if (user) {
                return user;
            }
            else {
                throw boom_1.default.unauthorized();
            }
        });
    }
    signJWTtoken(tokenData) {
        return this.authService.sign(tokenData);
    }
    issueJWTToken(tokenData) {
        const jwtToken = this.authService.sign({
            email: '',
            id: 1,
            scope: ['ADMIN']
        });
        return jwtToken;
    }
    verifyToken(token) {
        return this.authService.verifyToken(token);
    }
    decryptPassword(password) {
        return this.authService.decrypt(password);
    }
    encryptPassword(password) {
        return this.authService.encrypt(password);
    }
};
AuthService = __decorate([
    core_1.Service(),
    __metadata("design:paramtypes", [auth_1.AuthInternalService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map