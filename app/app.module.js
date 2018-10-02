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
const tsconfig_generator_service_1 = require("./services/tsconfig-generator/tsconfig-generator.service");
const table_service_1 = require("./services/table-service/table-service");
const status_module_1 = require("./status/status.module");
const build_history_service_1 = require("./services/build-history/build-history.service");
const error_reason_service_1 = require("./services/error-reason/error-reason.service");
const compile_plugin_1 = require("./plugins/compile/compile.plugin");
const time_service_1 = require("./services/time/time.service");
const services_1 = require("./services");
const server_module_1 = require("./server/server.module");
const _IMPORTS = [
    ipfs_daemon_1.IpfsDaemonModule.forRoot({
        type: services_1.nextOrDefault('--default-ipfs-node', 'go'),
        config: {
            Addresses: {
                API: process.env.IPFS_API_PORT ? process.env.IPFS_API_PORT : services_1.nextOrDefault('--ipfs-api-port', '/ip4/127.0.0.1/tcp/5002', (a) => `/ip4/127.0.0.1/tcp/${a}`),
                Gateway: process.env.IPFS_API_GATEWAY ? process.env.IPFS_API_GATEWAY : services_1.nextOrDefault('--ipfs-api-gateway', '/ip4/127.0.0.1/tcp/8081', (a) => `/ip4/127.0.0.1/tcp/${a}`),
                Swarm: services_1.nextOrDefault('--ipfs-swarms', ['/ip4/0.0.0.0/tcp/4001', '/ip6/::/tcp/4001'], (a) => a.split(',')),
            }
        }
    }),
    ipfs_1.IpfsModule.forRoot(),
    status_module_1.StatusModule,
];
services_1.includes('--webui') ? _IMPORTS.push(server_module_1.ServerModule) : null;
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.Module({
        imports: _IMPORTS,
        services: [
            ipfs_file_service_1.FileIpfsService,
            file_service_1.FileService,
            parcel_bundler_service_1.ParcelBundlerService,
            file_user_service_1.FileUserService,
            dts_generator_service_1.TypescriptDefinitionGeneratorService,
            tsconfig_generator_service_1.TsConfigGenratorService,
            table_service_1.TableService,
            build_history_service_1.BuildHistoryService,
            error_reason_service_1.ErrorReasonService,
            time_service_1.TimeService,
            services_1.HtmlTemplateBuilder,
            services_1.PackageJsonService,
            services_1.PreviousService
        ],
        plugins: [compile_plugin_1.CompilePlugin]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map