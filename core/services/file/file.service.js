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
const fs_1 = require("fs");
let FileService = class FileService {
    constructor(fileService) {
        this.fileService = fileService;
    }
    ensureDir(dir) {
        return this.fileService.mkdirp(dir);
    }
    readFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.readFilePromisify(file);
        });
    }
    writeFile(path, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.writeFilePromisify(path, data);
        });
    }
    createFolder(folder) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.fileService.mkdirp(folder).toPromise();
        });
    }
    fileWalker(folder) {
        return this.fileService.fileWalker(folder);
    }
    readFilePromisify(file) {
        return new Promise((resolve, reject) => {
            fs_1.readFile(file, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
    writeFilePromisify(path, data) {
        return new Promise((resolve, reject) => {
            fs_1.writeFile(path, data, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }
};
FileService = __decorate([
    core_1.Service(),
    __metadata("design:paramtypes", [core_1.FileService])
], FileService);
exports.FileService = FileService;
