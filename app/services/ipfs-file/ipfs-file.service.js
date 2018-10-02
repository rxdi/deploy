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
const stream_1 = require("stream");
const ipfs_daemon_node_info_1 = require("@gapi/ipfs-daemon/ipfs-daemon-node-info");
const ipfs_daemon_1 = require("@gapi/ipfs-daemon");
const rxjs_1 = require("rxjs");
const http_1 = require("http");
const https_1 = require("https");
const operators_1 = require("rxjs/operators");
let FileIpfsService = class FileIpfsService {
    constructor(ipfsDaemon, ipfsDaemonNodeInfo, logger) {
        this.ipfsDaemon = ipfsDaemon;
        this.ipfsDaemonNodeInfo = ipfsDaemonNodeInfo;
        this.logger = logger;
        this.nodeInfo = this.ipfsDaemonNodeInfo.info;
        this.providers = {
            infura: 'https://ipfs.infura.io/ipfs/',
            cloudflare: 'https://cloudflare-ipfs.com/ipfs/',
            ipfsOriginal: 'https://ipfs.io/ipfs/',
            thisNode: `http://${this.ipfsDaemonNodeInfo.info.gatewayHost}:${this.ipfsDaemonNodeInfo.info.gatewayPort}/ipfs/`,
            mainDesktopApp: `http://localhost:8080/ipfs/`
        };
    }
    addFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = new stream_1.Readable();
            content.push(file);
            content.push(null);
            const ipfsFile = yield this.ipfsDaemon.api.add([{ content }]);
            this.ping(ipfsFile[0].hash)
                .subscribe();
            this.logger.log(`\Cloudflare: ${this.providers.cloudflare}${ipfsFile[0].hash}`);
            return ipfsFile;
        });
    }
    ping(hash) {
        this.httpObservable(`${this.providers.mainDesktopApp}${hash}`).subscribe();
        return this.httpObservable(`${this.providers.thisNode}${hash}`)
            .pipe(operators_1.switchMap(() => rxjs_1.combineLatest(this.httpObservable(`${this.providers.infura}${hash}`), this.httpObservable(`${this.providers.cloudflare}${hash}`), this.httpObservable(`${this.providers.ipfsOriginal}${hash}`))));
    }
    httpObservable(link) {
        return rxjs_1.Observable.create(o => {
            if (link.includes('https')) {
                https_1.get(link, (r) => o.next(r));
            }
            else {
                http_1.get(link, (r) => o.next(r));
            }
        });
    }
    wait(ipfsFile) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => this.ping(ipfsFile[0].hash)
                .subscribe(stream => resolve(stream), e => reject(e)));
        });
    }
    addPackage(p) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.addFile(JSON.stringify(p, null, 4));
        });
    }
    catIpfsFile(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ipfsDaemon.api.cat(hash);
        });
    }
    getIpfsFile(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ipfsDaemon.api.get(hash);
        });
    }
    addRawFile(content) {
        return __awaiter(this, void 0, void 0, function* () {
            const ipfsFile = yield this.ipfsDaemon.api.add([{ content }]);
            this.ping(ipfsFile[0].hash).subscribe();
            return ipfsFile;
        });
    }
};
FileIpfsService = __decorate([
    core_1.Service(),
    __param(0, core_1.Inject(ipfs_daemon_1.IPFS_DAEMON)),
    __metadata("design:paramtypes", [Object, ipfs_daemon_node_info_1.IpfsDaemonInfoService,
        core_1.BootstrapLogger])
], FileIpfsService);
exports.FileIpfsService = FileIpfsService;
//# sourceMappingURL=ipfs-file.service.js.map