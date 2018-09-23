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
const Bundler = require("parcel-bundler");
const env_injection_tokens_1 = require("../../../env.injection.tokens");
let ParcelBundlerService = class ParcelBundlerService {
    constructor(isBrowserBuild, isBuildMinfied, buildOutDir, parcelSettings, args) {
        this.isBrowserBuild = isBrowserBuild;
        this.isBuildMinfied = isBuildMinfied;
        this.buildOutDir = buildOutDir;
        this.parcelSettings = parcelSettings;
        this.args = args;
    }
    prepareBundler(file) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const options = {
                    target: this.isBrowserBuild ? 'browser' : 'node',
                    minify: this.isBuildMinfied,
                    outDir: this.buildOutDir
                };
                console.log(this.buildOutDir);
                const bundler = new Bundler(file, options);
                let bundle = null;
                bundler.on('bundled', (compiledBundle) => {
                    // const inter: {
                    //     id; name; basename; relativeName; options; encoding; type; processed; contents; ast; generated; hash; parentDeps; dependencies
                    //     depAssets; parentBundle; bundles; cacheData; startTime; endTime; buildTime; bundledSize; resolver;
                    // } = compiledBundle.entryAsset;
                    // console.log(inter.buildTime, inter.startTime, inter.endTime, inter.bundledSize);
                    bundle = compiledBundle;
                });
                bundler.on('buildEnd', () => {
                    process.stdout.write(`Parcel Build finished! Bundle source: ${bundle.name}\n`);
                    bundle = null;
                    setTimeout(() => resolve(), 1000);
                });
                bundler.bundle();
            });
        });
    }
};
ParcelBundlerService = __decorate([
    core_1.Service(),
    __param(0, core_1.Inject(env_injection_tokens_1.__PARCEL_BROWSER_BUILD)),
    __param(1, core_1.Inject(env_injection_tokens_1.__PARCEL_MINIFY)),
    __param(2, core_1.Inject(env_injection_tokens_1.__PARCEL_BUILD_OUT_DIR)),
    __param(3, core_1.Inject(env_injection_tokens_1.__PARCEL_SETTINGS)),
    __param(4, core_1.Inject(env_injection_tokens_1.__DEPLOYER_ARGUMENTS)),
    __metadata("design:paramtypes", [Boolean, Boolean, String, Object, Array])
], ParcelBundlerService);
exports.ParcelBundlerService = ParcelBundlerService;
