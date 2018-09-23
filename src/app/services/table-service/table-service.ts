
import { Service, Inject } from '@rxdi/core';
import { IPFSFile } from '@gapi/ipfs';
import { FILE_DEPLOYMENT_STATUS } from '../../status/status-injection.tokens';
var Table = require("terminal-table");

@Service()
export class TableService {
    table;
    @Inject(FILE_DEPLOYMENT_STATUS) private $deploymentStatus: FILE_DEPLOYMENT_STATUS;

    createTable(file: IPFSFile[], typings: IPFSFile[], m: IPFSFile[]) {
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

    previewsNext(previewsVersions: string[]) {
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
            } else {
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

}