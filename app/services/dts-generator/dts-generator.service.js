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
const childProcess = require("child_process");
const env_injection_tokens_1 = require("../../../env.injection.tokens");
let TypescriptDefinitionGeneratorService = class TypescriptDefinitionGeneratorService {
    constructor(logger, node_modules) {
        this.logger = logger;
        this.node_modules = node_modules;
    }
    validateEntries(namespace, projectPath, outPath) {
        if (!projectPath) {
            throw new Error('Missing project path');
        }
        if (!namespace) {
            throw new Error('Missing project namespace');
        }
        if (!outPath) {
            throw new Error('Missing project outPath');
        }
    }
    mergeTypings(namespace, projectPath, outPath) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateEntries(namespace, projectPath, outPath);
            return new Promise((resolve, reject) => {
                if (this.child) {
                    this.child.stdout.removeAllListeners('data');
                    this.child.stderr.removeAllListeners('data');
                    this.child.removeAllListeners('exit');
                    this.child.kill();
                }
                process.env = Object.assign(process.env, {});
                this.logger.log('Typescript merging definitions started in child process...\n');
                this.child = childProcess.spawn(`${this.node_modules}/.bin/rxdi-merge`, [
                    '--name',
                    namespace,
                    '--project',
                    projectPath,
                    '--out',
                    outPath
                ]);
                this.child.stdout.on('data', (data) => process.stdout.write(data));
                this.child.stderr.on('data', (data) => {
                    if (data.toString().includes('Unable to resolve configuration')) {
                        this.logger.log('If you want rxdi-deploy to create tsconfig.json for you pass parameter --tsconfig');
                    }
                    reject(process.stdout.write(data));
                });
                this.child.on('exit', (code) => {
                    this.child.kill();
                    this.child = null;
                    this.logger.log(`Child process exited with code ${code}\n`);
                    resolve(true);
                });
            });
        });
    }
};
TypescriptDefinitionGeneratorService = __decorate([
    core_1.Service(),
    __param(1, core_1.Inject(env_injection_tokens_1.__NODE_MODULES)),
    __metadata("design:paramtypes", [core_1.BootstrapLogger, String])
], TypescriptDefinitionGeneratorService);
exports.TypescriptDefinitionGeneratorService = TypescriptDefinitionGeneratorService;
