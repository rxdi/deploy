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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@rxdi/core");
const status_injection_tokens_1 = require("../../status/status-injection.tokens");
const ipfs_file_service_1 = require("../ipfs-file/ipfs-file.service");
var Table = require("terminal-table");
let TableService = class TableService {
    constructor(fileIpfsService) {
        this.fileIpfsService = fileIpfsService;
    }
    createGenericTableStatus(ModuleStatus) {
        let Icon, Color;
        if (ModuleStatus === 'WARNING') {
            Icon = '⚠';
            Color = 'yellow';
        }
        if (ModuleStatus === 'FAILED') {
            Icon = '✘';
            Color = 'red';
        }
        if (ModuleStatus === 'SUCCESS') {
            Icon = '✔';
            Color = 'green';
        }
        return { Icon, Color };
    }
    createTable(file, typings, m) {
        var t = new Table({
            borderStyle: 3,
            horizontalLine: true,
            width: [3, "10%", "10%", "8%", "70%"],
            rightPadding: 0,
            leftPadding: 1
        });
        let FileStatus = this.$deploymentStatus.getValue().file;
        let TypingsStatus = this.$deploymentStatus.getValue().typings;
        let ModuleStatus = this.$deploymentStatus.getValue().module;
        const statusFile = this.createGenericTableStatus(FileStatus);
        const statusTypings = this.createGenericTableStatus(TypingsStatus);
        const statusModule = this.createGenericTableStatus(ModuleStatus);
        t.push(["", "Deploy status", "File Type", "Size", "Gateway"]);
        t.push([statusFile.Icon, FileStatus, "Bundle", `${file[0].size} bytes`, `https://cloudflare-ipfs.com/ipfs/${file[0].hash}`]);
        t.push([statusTypings.Icon, TypingsStatus, "Typings", `${typings[0].size} bytes`, `https://cloudflare-ipfs.com/ipfs/${typings[0].hash}`]);
        t.push([statusModule.Icon, ModuleStatus, "Module", `${m[0].size} bytes`, `https://cloudflare-ipfs.com/ipfs/${m[0].hash}`]);
        t.attrRange({ row: [0, 1] }, {
            align: "center",
            color: "green",
            bg: "black"
        });
        t.attrRange({ column: [0, 2], row: [0, 4] }, {
            color: "green",
            bg: "black"
        });
        t.attrRange({ column: [0, 1], row: [0, 2] }, {
            color: "green"
        });
        t.attrRange({ column: [0, 2], row: [0, 2] }, {
            color: statusFile.Color
        });
        t.attrRange({ column: [0, 2], row: [2, 3] }, {
            color: statusTypings.Color
        });
        t.attrRange({ column: [0, 2], row: [3, 4] }, {
            color: statusModule.Color
        });
        t.attrRange({
            row: [1],
            column: [1]
        }, {
            leftPadding: 5
        });
        return t;
    }
    previewsVersions(previewsVersions) {
        var t = new Table({
            borderStyle: 3,
            horizontalLine: true,
            width: ['50%', '50%'],
            rightPadding: 0,
            leftPadding: 1
        });
        t.push(["Previews versions", "Gateway"]);
        previewsVersions.forEach(v => {
            t.push([v, `https://cloudflare-ipfs.com/ipfs/${v}`]);
        });
        t.attrRange({ row: [0, 1] }, {
            align: "center",
            color: "green",
            bg: "black"
        });
        t.attrRange({
            row: [1],
            column: [1]
        }, {
            leftPadding: 5
        });
        return t;
    }
    endInstallCommand(hash) {
        const t = new Table({
            borderStyle: 3,
            horizontalLine: true,
            width: ['50%'],
            rightPadding: 0,
            leftPadding: 1
        });
        t.push(["Install command"]);
        t.push([`rxdi i ${hash}`]);
        t.attrRange({ row: [0, 1] }, {
            align: "center",
            color: "green",
            bg: "black"
        });
        t.attrRange({
            row: [1],
            column: [1]
        }, {
            leftPadding: 5
        });
        return t;
    }
    previewsNext(previewsVersions) {
        var t = new Table({
            borderStyle: 3,
            horizontalLine: true,
            width: ['50%', '50%'],
            rightPadding: 0,
            leftPadding: 1
        });
        t.push(["Previews version", "Next version"]);
        let isNext = false;
        let previews = [];
        let next = [];
        previewsVersions.forEach(v => {
            if (isNext) {
                isNext = false;
                next.push(v);
            }
            else {
                previews.push(v);
                isNext = true;
            }
        });
        previews.forEach((v, index) => {
            t.push([v, next[index]]);
        });
        t.attrRange({ row: [0, 1] }, {
            align: "center",
            color: "green",
            bg: "black"
        });
        t.attrRange({
            row: [1],
            column: [1]
        }, {
            leftPadding: 5
        });
        return t;
    }
    getHistoryTable(history) {
        var t = new Table({
            borderStyle: 3,
            horizontalLine: true,
            width: [3, '50%', '50%'],
            rightPadding: 0,
            leftPadding: 1
        });
        t.push(['', 'Date', 'Hash']);
        console.log(history);
        history.forEach((v) => {
            t.push(['', `${v.date}`, `rxdi-deploy --find ${v.hash}`]);
        });
        t.attrRange({ row: [0, 1] }, {
            align: "center",
            color: "green",
            bg: "black"
        });
        t.attrRange({
            row: [1],
            column: [1]
        }, {
            leftPadding: 5
        });
        return t;
    }
    fileUploadStatus(file) {
        const t = new Table({
            borderStyle: 3,
            horizontalLine: true,
            width: ['100%'],
            rightPadding: 0,
            leftPadding: 1
        });
        t.push(["File upload status"]);
        t.push([`\File size: ${file[0].size} bytes`]);
        t.push([`\IPFS address: ${this.fileIpfsService.providers.cloudflare}${file[0].hash}`]);
        t.attrRange({ row: [0, 1] }, {
            align: "center",
            color: "green",
            bg: "black"
        });
        t.attrRange({
            row: [1],
            column: [1]
        }, {
            leftPadding: 5
        });
        return t;
    }
};
__decorate([
    core_1.Inject(status_injection_tokens_1.FILE_DEPLOYMENT_STATUS),
    __metadata("design:type", Object)
], TableService.prototype, "$deploymentStatus", void 0);
TableService = __decorate([
    core_1.Service(),
    __metadata("design:paramtypes", [ipfs_file_service_1.FileIpfsService])
], TableService);
exports.TableService = TableService;
//# sourceMappingURL=table-service.js.map