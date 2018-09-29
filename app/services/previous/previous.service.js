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
const core_1 = require("@rxdi/core");
const rxjs_1 = require("rxjs");
const env_injection_tokens_1 = require("../../../env.injection.tokens");
let PreviousService = class PreviousService {
    insert(doc) {
        return new rxjs_1.Observable(o => {
            this.previwsDatabase.insert(doc, (e, d) => {
                if (e) {
                    throw new Error('Unable to insert to database');
                }
                o.next(d);
            });
        });
    }
    find(doc) {
        return new rxjs_1.Observable(o => {
            this.previwsDatabase.find(doc, (e, d) => {
                if (e) {
                    o.error(e);
                }
                o.next(d);
            });
        });
    }
};
__decorate([
    core_1.Inject(env_injection_tokens_1.__PREVIWS_DATABASE),
    __metadata("design:type", Object)
], PreviousService.prototype, "previwsDatabase", void 0);
PreviousService = __decorate([
    core_1.Service()
], PreviousService);
exports.PreviousService = PreviousService;
//# sourceMappingURL=previous.service.js.map