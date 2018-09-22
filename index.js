#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@rxdi/core");
const index_1 = require("./core/index");
const logger = core_1.Container.get(core_1.BootstrapLogger);
if (process.argv.toString().includes('-v') || process.argv.toString().includes('--verbose')) {
    core_1.Container.get(core_1.ConfigService).setConfig({ logger: { logging: true, hashes: true, date: true, exitHandler: true, fileService: true } });
}
core_1.Bootstrap(index_1.CoreModule)
    .subscribe(() => __awaiter(this, void 0, void 0, function* () {
    const filePath = process.argv[2];
    const namespace = process.argv[3];
    const fileUserService = core_1.Container.get(index_1.FileUserService);
    const fileService = core_1.Container.get(index_1.FileService);
    const file = filePath.replace(/^.*[\\\/]/, '');
    const folder = filePath.substring(0, filePath.lastIndexOf("/"));
    if (process.argv.toString().includes('--tsconfig')) {
        yield fileService.writeFile(folder + '/tsconfig.json', fileUserService.getTsConfig(file.replace('.ts', '')));
    }
    fileUserService.completeBuildAndAddToIpfs(folder, file, namespace)
        .subscribe((res) => {
        setTimeout(() => {
            logger.log(`Package added to IPFS: ${JSON.stringify(res, null, 4)}`);
            process.exit(0);
        }, 7000);
    }, e => {
        logger.error(e);
        process.exit(1);
    });
}));
__export(require("./core/index"));
