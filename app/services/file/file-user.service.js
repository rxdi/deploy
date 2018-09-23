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
const file_service_1 = require("./file.service");
const env_injection_tokens_1 = require("../../../env.injection.tokens");
let FileUserService = class FileUserService {
    constructor(fileService) {
        this.fileService = fileService;
    }
    writeFile(file, fileName, namespace) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                this.fileService.ensureDir(`${this.parcelBuildDir}/${namespace}`)
                    .subscribe(() => __awaiter(this, void 0, void 0, function* () {
                    yield this.fileService.writeFile(`${this.parcelBuildDir}/${namespace}/${fileName}`, file);
                    resolve(true);
                }), e => reject(e));
            }));
        });
    }
    writeDag(path, file) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield this.fileService.writeFile(path, file);
                resolve(true);
            }));
        });
    }
};
__decorate([
    core_1.Inject(env_injection_tokens_1.__PARCEL_BUILD_OUT_DIR),
    __metadata("design:type", String)
], FileUserService.prototype, "parcelBuildDir", void 0);
FileUserService = __decorate([
    core_1.Service(),
    __metadata("design:paramtypes", [file_service_1.FileService])
], FileUserService);
exports.FileUserService = FileUserService;
