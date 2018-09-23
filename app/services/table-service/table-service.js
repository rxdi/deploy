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
var Table = require("terminal-table");
let TableService = class TableService {
    createTable(file, typings, m) {
        var t = new Table({
            borderStyle: 3,
            horizontalLine: true,
            width: [3, "10%", "23%", "5%", "60%"],
            rightPadding: 0,
            leftPadding: 1
        });
        const isFileDeployValid = this.$deploymentStatus.getValue().file;
        const isTypingsDeployValid = this.$deploymentStatus.getValue().typings;
        const isModuleDeployValid = this.$deploymentStatus.getValue().module;
        const statuses = {
            failed: 'FAILED',
            success: 'SUCCESS'
        };
        t.push(["", "Deploy status", "File Type", "Size", "Gateway"]);
        t.push([isFileDeployValid ? "✔" : "✘", isFileDeployValid ? statuses.success : statuses.failed, "Bundle", `${file[0].size} bytes`, `https://cloudflare-ipfs.com/ipfs/${file[0].hash}`]);
        t.push([isTypingsDeployValid ? "✔" : "✘", isTypingsDeployValid ? statuses.success : statuses.failed, "Typings", `${typings[0].size} bytes`, `https://cloudflare-ipfs.com/ipfs/${typings[0].hash}`]);
        t.push([isModuleDeployValid ? "✔" : "✘", isModuleDeployValid ? statuses.success : statuses.failed, "Module", `${m[0].size} bytes`, `https://cloudflare-ipfs.com/ipfs/${m[0].hash}`]);
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
        if (!isFileDeployValid) {
            t.attrRange({ column: [0, 2], row: [0, 2] }, {
                color: "red"
            });
        }
        if (!isTypingsDeployValid) {
            t.attrRange({ column: [0, 2], row: [2, 3] }, {
                color: "red"
            });
        }
        if (!isModuleDeployValid) {
            t.attrRange({ column: [0, 2], row: [3, 4] }, {
                color: "red"
            });
        }
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
    previewsNext(previewsVersions) {
        var t = new Table({
            borderStyle: 3,
            horizontalLine: true,
            width: ['50%', '50%'],
            rightPadding: 0,
            leftPadding: 1
        });
        t.push(["Previews version", "Next version"]);
        let count = 0;
        previewsVersions.forEach(v => {
            if (count = 1) {
                count = 0;
            }
            else {
                t.push([previewsVersions[previewsVersions.indexOf(v) - 1], v]);
            }
            count++;
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
};
__decorate([
    core_1.Inject(status_injection_tokens_1.FILE_DEPLOYMENT_STATUS),
    __metadata("design:type", Object)
], TableService.prototype, "$deploymentStatus", void 0);
TableService = __decorate([
    core_1.Service()
], TableService);
exports.TableService = TableService;
