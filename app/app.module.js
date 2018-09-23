"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@rxdi/core");
const ipfs_1 = require("@gapi/ipfs");
const ipfs_daemon_1 = require("@gapi/ipfs-daemon");
const ipfs_file_service_1 = require("./services/ipfs-file/ipfs-file.service");
const file_service_1 = require("./services/file/file.service");
const parcel_bundler_service_1 = require("./services/parcel-bundler/parcel-bundler.service");
const file_user_service_1 = require("./services/file/file-user.service");
const dts_generator_service_1 = require("./services/dts-generator/dts-generator.service");
const arguments_service_1 = require("./services/arguments/arguments.service");
const compile_service_1 = require("./services/compile/compile.service");
const tsconfig_generator_service_1 = require("./services/tsconfig-generator/tsconfig-generator.service");
const table_service_1 = require("./services/table-service/table-service");
const status_module_1 = require("./status/status.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.Module({
        imports: [
            ipfs_daemon_1.IpfsDaemonModule.forRoot({
                type: arguments_service_1.nextOrDefault('--default-ipfs-node', 'js')
            }),
            ipfs_1.IpfsModule.forRoot(),
            status_module_1.StatusModule
        ],
        services: [
            ipfs_file_service_1.FileIpfsService,
            file_service_1.FileService,
            parcel_bundler_service_1.ParcelBundlerService,
            file_user_service_1.FileUserService,
            dts_generator_service_1.TypescriptDefinitionGeneratorService,
            tsconfig_generator_service_1.TsConfigGenratorService,
            table_service_1.TableService
        ],
        afterPlugins: [compile_service_1.CompileService]
    })
], AppModule);
exports.AppModule = AppModule;
