
import { Service, Inject } from '@rxdi/core';
import { IPFSFile } from '@gapi/ipfs';
import { FILE_DEPLOYMENT_STATUS } from '../../status/status-injection.tokens';
import { HistoryModel } from 'env.injection.tokens';
import { FileIpfsService } from '../ipfs-file/ipfs-file.service';
var Table = require("terminal-table");

@Service()
export class TableService {
    @Inject(FILE_DEPLOYMENT_STATUS) private $deploymentStatus: FILE_DEPLOYMENT_STATUS;

    constructor(
        private fileIpfsService: FileIpfsService
    ) { }

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

    createTable(file: IPFSFile[], typings: IPFSFile[], m: IPFSFile[]) {
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


    previewsVersions(previewsVersions: string[]) {
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

    previewsNext(previewsVersions: string[]) {
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
            } else {
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

    getHistoryTable(history: HistoryModel[]) {
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


    fileUploadStatus(file: IPFSFile[]) {
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


}