"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
let ParcelBundlerService = class ParcelBundlerService {
    prepareBundler(file, settings = {}, target = process.argv.toString().includes('--browser') ? 'browser' : 'node') {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const options = Object.assign({ target, minify: true }, settings, { watch: false, logLevel: 3, detailedReport: true });
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
                    process.stdout.write(`Gapi Application build finished! ${file}\n`);
                    process.stdout.write(`Bundle source: ${bundle.name}`);
                    bundle = null;
                    setTimeout(() => resolve(), 1000);
                });
                bundler.bundle();
            });
        });
    }
};
ParcelBundlerService = __decorate([
    core_1.Service()
], ParcelBundlerService);
exports.ParcelBundlerService = ParcelBundlerService;
core_1.Container.get(ParcelBundlerService);
