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
const services_1 = require("../../../services");
const path_1 = require("path");
const rxjs_1 = require("rxjs");
const util_1 = require("util");
const env_injection_tokens_1 = require("../../../../env.injection.tokens");
const dist_1 = require("@rxdi/core/dist/services/file/dist");
const ncp = require("ncp").ncp;
const rimraf = require("rimraf");
let FileService = class FileService {
    constructor() {
        this.units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        this.results = [];
    }
    wholeReadDirRecursive(path = ".") {
        return __awaiter(this, void 0, void 0, function* () {
            const directory = yield this.readDir(path);
            const pathinternal = path;
            const self = this;
            return (yield Promise.all(directory.map((file) => __awaiter(this, void 0, void 0, function* () {
                const path = path_1.resolve(pathinternal, file);
                const stat = yield this.statAsync(path);
                if (stat && stat.isDirectory()) {
                    if (!file.includes("node_modules")) {
                        yield self.wholeReadDirRecursive.bind(this)(path);
                    }
                    else {
                        return null;
                    }
                }
                else {
                    this.results = [...this.results, path];
                }
            })))).filter(a => !!a);
        });
    }
    readCurrentDirFlat(path = ".") {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.readDir(path))
                .map(file => path_1.resolve(path, file))
                .filter(a => !!a);
        });
    }
    listFolder(folder) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                rxjs_1.from(this.readCurrentDirFlat(folder))
                    .pipe(operators_1.switchMap(res => this.map(res)))
                    .subscribe(res => resolve(res), e => reject(e));
            });
        });
    }
    readDir(folder, limit = 200) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                fs_1.readdir(folder, (err, list) => {
                    if (err) {
                        resolve([]);
                    }
                    else {
                        let count = 0;
                        resolve(list
                            .map(f => {
                            count++;
                            if (limit > count) {
                                return f;
                            }
                            else {
                                return null;
                            }
                        })
                            .filter(res => !!res));
                    }
                });
            });
        });
    }
    map(res) {
        return __awaiter(this, void 0, void 0, function* () {
            let foldersCount = 100;
            let counter = 0;
            return (yield Promise.all(res.map((r) => __awaiter(this, void 0, void 0, function* () {
                counter++;
                const mapping = {
                    path: r,
                    directory: null,
                    file: null,
                    name: null,
                    status: null
                };
                const status = yield this.statAsync(r);
                const pathMapping = v => r.replace(process.cwd(), v);
                if (!status.isDirectory || (status && status["prototype"] === String)) {
                    return null;
                }
                if (status.isDirectory()) {
                    mapping.directory = true;
                }
                else {
                    mapping.file = true;
                }
                mapping.name = r.split("/").pop();
                mapping.path = pathMapping(".");
                if (services_1.includes("--enable-full-folder-access")) {
                    mapping.path = r;
                }
                mapping.status = status;
                mapping.status.size = this.niceBytes(status.size);
                if (counter === foldersCount) {
                    return null;
                }
                return mapping;
            })))).filter(res => !!res);
        });
    }
    niceBytes(x) {
        let l = 0, n = parseInt(x, 10) || 0;
        while (n >= 1024 && ++l)
            n = n / 1024;
        return n.toFixed(n >= 10 || l < 1 ? 0 : 1) + " " + this.units[l];
    }
    statAsync(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                fs_1.stat(path, (e, stats) => {
                    if (e) {
                        resolve(e);
                    }
                    resolve(stats);
                });
            });
        });
    }
    moveFile(filePath, newPath) {
        return rxjs_1.from(util_1.promisify(fs_1.rename)(filePath, newPath || `${this.homeDir}/.rxdi/builds`));
    }
    ensureDir(path) {
        return new Promise((resolve, reject) => {
            dist_1.mkdirp(path, err => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    getFolderFromPath(path) {
        return path.substring(0, path.lastIndexOf("/"));
    }
    copyTransactionFiles(transactionId, repoFolder, fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            const getJson = (path, type) => `${path}/${type}`;
            const { saveFolder, originalFilePath, filePath } = this.prepareCopyData(transactionId, repoFolder, fileName);
            const packageJsonRepoPath = getJson(repoFolder, "package.json");
            const reactiveJsonRepoPath = getJson(repoFolder, "reactive.json");
            const packageJsonFilePath = getJson(filePath, "package.json");
            const reactiveJsonFilePath = getJson(filePath, "reactive.json");
            let hasConfiguration = false;
            yield this.ensureDir(this.getFolderFromPath(saveFolder));
            if (this.isFileExist(packageJsonRepoPath)) {
                yield this.copyFile(packageJsonRepoPath, packageJsonFilePath);
                hasConfiguration = true;
            }
            if (this.isFileExist(packageJsonRepoPath)) {
                yield this.copyFile(reactiveJsonRepoPath, reactiveJsonFilePath);
                hasConfiguration = true;
            }
            if (!hasConfiguration) {
                console.error("Missing package.json or reactive.json bundle will proceed but if you depend on some modules you cannot use them since they will not be installed");
            }
            yield this.copyFolderRecursive(this.getFolderFromPath(originalFilePath), this.getFolderFromPath(saveFolder));
        });
    }
    prepareCopyData(transactionId, repoFolder, fileName) {
        const transactionFolder = `${this.homeDir}/.rxdi/builds/${transactionId}`;
        const originalFilePath = path_1.normalize(`${repoFolder}/${fileName}`);
        const saveFolder = path_1.normalize(`${transactionFolder}/${fileName}`);
        const filename = originalFilePath.replace(/^.*[\\\/]/, "");
        const filePath = saveFolder.replace(filename, "");
        return {
            saveFolder,
            originalFilePath,
            transactionFolder,
            filename,
            filePath
        };
    }
    removeTransaction(transactionId, repoFolder, fileName) {
        const { transactionFolder } = this.prepareCopyData(transactionId, repoFolder, fileName);
        return rxjs_1.from(new Promise(r => rimraf(transactionFolder, r)));
    }
    removeFile(path) {
        path = path_1.normalize(path);
        return rxjs_1.from(util_1.promisify(fs_1.unlink)(path));
    }
    copyFile(path, newPath) {
        return util_1.promisify(fs_1.copyFile)(path, newPath);
    }
    isFileExist(path) {
        return util_1.promisify(fs_1.exists)(path);
    }
    copyFolderRecursive(source, destination) {
        return new Promise((resolve, reject) => {
            console.log("WHY");
            ncp(source, destination, function (err) {
                console.log(err);
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
};
__decorate([
    core_1.Inject(env_injection_tokens_1.__HOME_DIR),
    __metadata("design:type", String)
], FileService.prototype, "homeDir", void 0);
FileService = __decorate([
    core_1.Service(),
    __metadata("design:paramtypes", [])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map