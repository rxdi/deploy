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
let CoreModule = class CoreModule {
};
CoreModule = __decorate([
    core_1.Module({
        imports: [
            ipfs_daemon_1.IpfsDaemonModule.forRoot({ type: 'js' }),
            ipfs_1.IpfsModule.forRoot({
                init: false,
                start: true,
                logging: true,
                config: {
                    Addresses: {
                        API: '/ip4/127.0.0.1/tcp/5002',
                        Announce: [],
                        Gateway: '/ip4/127.0.0.1/tcp/8080',
                        NoAnnounce: [],
                        Swarm: [
                            '/ip4/0.0.0.0/tcp/4002',
                            '/ip6/::/tcp/4002'
                        ]
                    },
                }
            }),
        ],
        services: [
            ipfs_file_service_1.FileIpfsService,
            file_service_1.FileService,
            parcel_bundler_service_1.ParcelBundlerService,
            file_user_service_1.FileUserService,
            dts_generator_service_1.TypescriptDefinitionGeneratorService
        ]
    })
], CoreModule);
exports.CoreModule = CoreModule;
