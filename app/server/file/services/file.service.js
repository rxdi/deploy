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
const operators_1 = require("rxjs/operators");
const fs_1 = require("fs");
let FileService = class FileService {
    constructor(fileService) {
        this.fileService = fileService;
        this.units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    }
    listFolder(folder) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                this.fileService.fileWalker(folder)
                    .pipe(operators_1.switchMap((res) => this.map(res)))
                    .subscribe(structure => resolve(structure), e => reject(e));
            });
        });
    }
    map(res) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all(res.map((r) => __awaiter(this, void 0, void 0, function* () {
                const mapping = {
                    path: r,
                    directory: null,
                    file: null,
                    name: null,
                    status: null
                };
                const status = yield this.statAsync(r);
                if (status.isDirectory()) {
                    mapping.directory = true;
                }
                else {
                    mapping.file = true;
                }
                mapping.name = r.split("/").pop();
                mapping.path = r.replace(process.cwd(), '.');
                mapping.status = status;
                mapping.status.size = this.niceBytes(status.size);
                return mapping;
            })));
        });
    }
    niceBytes(x) {
        let l = 0, n = parseInt(x, 10) || 0;
        while (n >= 1024 && ++l)
            n = n / 1024;
        return (n.toFixed(n >= 10 || l < 1 ? 0 : 1) + ' ' + this.units[l]);
    }
    statAsync(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                fs_1.stat(path, (e, stats) => {
                    if (e) {
                        reject(e);
                    }
                    resolve(stats);
                });
            });
        });
    }
};
FileService = __decorate([
    core_1.Service(),
    __metadata("design:paramtypes", [core_1.FileService])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map