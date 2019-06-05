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
const file_service_1 = require("../file/file.service");
const core_1 = require("@rxdi/core");
const env_injection_tokens_1 = require("../../../env.injection.tokens");
const helpers_1 = require("../helpers/helpers");
let PackageJsonService = class PackageJsonService {
    constructor(fileService, deployerOutputConfigName) {
        this.fileService = fileService;
        this.deployerOutputConfigName = deployerOutputConfigName;
    }
    OnInit() {
        if (helpers_1.includes('--collect-packages')) {
            this.defaultOutputConfig = 'package.json';
        }
        else {
            this.defaultOutputConfig = this.deployerOutputConfigName;
        }
    }
    prepareDependencies(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield this.read(path);
            if (file.dependencies) {
                return Object.keys(file.dependencies).map(name => ({
                    name,
                    version: file.dependencies[name]
                }));
            }
            return [];
        });
    }
    readModifyWrite(modifier = {}, path) {
        return __awaiter(this, void 0, void 0, function* () {
            let file = yield this.read(path);
            file = Object.assign({}, modifier, file);
            return yield this.write(file, path);
        });
    }
    read(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return JSON.parse(yield this.fileService.readFile(path || `${process.cwd()}/${this.defaultOutputConfig}`));
        });
    }
    write(data, path) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.fileService.writeFile(path || `${process.cwd()}/${this.defaultOutputConfig}`, JSON.stringify(data));
        });
    }
};
PackageJsonService = __decorate([
    core_1.Service(),
    __param(1, core_1.Inject(env_injection_tokens_1.__DEPLOYER_OUTPUT_CONFIG_NAME)),
    __metadata("design:paramtypes", [file_service_1.FileService, String])
], PackageJsonService);
exports.PackageJsonService = PackageJsonService;
//# sourceMappingURL=package-json.service.js.map