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
const table_service_1 = require("../table-service/table-service");
let HistoryService = class HistoryService {
    constructor(tableService) {
        this.tableService = tableService;
        // console.log('' + this.showHistoryTable());
    }
    insert(doc) {
        return new rxjs_1.Observable(o => {
            this.historyDatabase.insert(doc, (e, d) => {
                if (e) {
                    throw new Error('Unable to insert to database');
                }
                o.next(d);
            });
        });
    }
    find(doc) {
        return new rxjs_1.Observable(o => {
            this.historyDatabase.find(doc, (e, d) => {
                if (e) {
                    o.error(e);
                }
                o.next(d);
            }).limit(100);
        });
    }
    showHistoryTable() {
        console.log(this.findAll());
        const table = this.tableService.getHistoryTable(this.findAll());
        console.log('', table);
        return table;
    }
    findAll() {
        return this.find({});
    }
};
__decorate([
    core_1.Inject(env_injection_tokens_1.__HISTORY_DATABASE),
    __metadata("design:type", Object)
], HistoryService.prototype, "historyDatabase", void 0);
HistoryService = __decorate([
    core_1.Service(),
    __metadata("design:paramtypes", [table_service_1.TableService])
], HistoryService);
exports.HistoryService = HistoryService;
