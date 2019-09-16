import { Service, Inject } from '@rxdi/core';
import { IPFSFile } from '@gapi/ipfs';
import { FILE_DEPLOYMENT_STATUS } from '../../status/status-injection.tokens';
import { FileIpfsService } from '../ipfs-file/ipfs-file.service';
import { DagModel } from '../../../env.injection.tokens';
const Table = require('terminal-table');

@Service()
export class TableService {
  @Inject(FILE_DEPLOYMENT_STATUS)
  private $deploymentStatus: FILE_DEPLOYMENT_STATUS;

  constructor(private fileIpfsService: FileIpfsService) {}

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
    if (m.length < 1) {
      m.push(m[0]);
    }
    const provider = this.fileIpfsService.providers.ipfsOriginal;
    const FileStatus = this.$deploymentStatus.getValue().file;
    const TypingsStatus = this.$deploymentStatus.getValue().typings;
    const ModuleStatus = this.$deploymentStatus.getValue().module;
    const statusFile = this.createGenericTableStatus(FileStatus.status);
    const statusTypings = this.createGenericTableStatus(TypingsStatus.status);
    const statusModule = this.createGenericTableStatus(ModuleStatus.status);
    const columns = ['', 'Status', 'File Type', 'Size', 'Gateway'];
    let width = [4, '6%', '6%', '8%', '78%'];
    const fileRow = [
      statusFile.Icon,
      FileStatus.status,
      'Bundle',
      `${file[0].size} bytes`,
      `${provider}${file[0].hash}`,
    ];
    const typingsRow = [
      statusTypings.Icon,
      TypingsStatus.status,
      'Typings',
      `${typings[0].size} bytes`,
      `${provider}${typings[0].hash}`,
    ];
    const moduleRow = [
      statusModule.Icon,
      ModuleStatus.status,
      'Module',
      `${m[1].size} bytes`,
      `${provider}${m[1].hash}`,
    ];

    if (FileStatus.status !== 'SUCCESS' || TypingsStatus.status !== 'SUCCESS' || ModuleStatus.status !== 'SUCCESS') {
      columns.push('Errors');
      width = [4, '6%', '6%', '8%', '40%', '38%'];
    }

    if (FileStatus.status !== 'SUCCESS') {
      fileRow.push(FileStatus.message);
    }

    if (TypingsStatus.status !== 'SUCCESS') {
      typingsRow.push(TypingsStatus.message);
    }

    if (ModuleStatus.status !== 'SUCCESS') {
      moduleRow.push(ModuleStatus.message);
    }

    const t = new Table({
      borderStyle: 2,
      horizontalLine: true,
      width,
      rightPadding: 0,
      leftPadding: 1,
    });

    t.push(columns);
    t.push(fileRow);
    t.push(typingsRow);
    t.push(moduleRow);

    t.attrRange(
      { row: [0, 1] },
      {
        color: 'green',
        bg: 'black',
      }
    );

    t.attrRange(
      { column: [0, 1] },
      {
        color: 'green',
        bg: 'black',
      }
    );

    t.attrRange(
      { column: [0, 2], row: [0, 4] },
      {
        color: 'green',
        bg: 'black',
      }
    );

    t.attrRange(
      { column: [0, 1], row: [0, 2] },
      {
        color: 'green',
      }
    );

    t.attrRange(
      { column: [0, 2], row: [0, 2] },
      {
        color: statusFile.Color,
      }
    );
    t.attrRange(
      { column: [0, 2], row: [2, 3] },
      {
        color: statusTypings.Color,
      }
    );
    t.attrRange(
      { column: [0, 2], row: [3, 4] },
      {
        color: statusModule.Color,
      }
    );
    t.attrRange(
      {
        row: [1],
        column: [1],
      },
      {
        // leftPadding: 5
      }
    );

    if (FileStatus.status !== 'SUCCESS' || TypingsStatus.status !== 'SUCCESS' || ModuleStatus.status !== 'SUCCESS') {
      t.attrRange(
        { column: [5, 6] },
        {
          color: 'red',
        }
      );
      t.attrRange(
        { column: [5, 6], row: [5, 6] },
        {
          color: 'red',
        }
      );
    }
    return t;
  }

  previewsVersions(previewsVersions: string[]) {
    const t = new Table({
      borderStyle: 2,
      horizontalLine: true,
      width: ['50%', '50%'],
      rightPadding: 0,
      leftPadding: 1,
    });

    t.push(['Previews versions', 'Gateway']);
    previewsVersions.forEach(v => {
      t.push([v, `${this.fileIpfsService.providers.ipfsOriginal}${v}`]);
    });

    t.attrRange(
      { row: [0, 1] },
      {
        align: 'center',
        color: 'green',
        bg: 'black',
      }
    );

    t.attrRange(
      {
        row: [1],
        column: [1],
      },
      {
        leftPadding: 5,
      }
    );

    return t;
  }

  endInstallCommand(hash) {
    const t = new Table({
      borderStyle: 2,
      horizontalLine: true,
      width: ['50%'],
      rightPadding: 0,
      leftPadding: 1,
    });

    t.push(['Install command']);
    t.push([`rxdi i ${hash}`]);

    t.attrRange(
      { row: [0, 1] },
      {
        align: 'center',
        color: 'green',
        bg: 'black',
      }
    );

    t.attrRange(
      {
        row: [1],
        column: [1],
      },
      {
        leftPadding: 5,
      }
    );

    return t;
  }

  previewsNext(previewsVersions: string[]) {
    const t = new Table({
      borderStyle: 2,
      horizontalLine: true,
      width: ['50%', '50%'],
      rightPadding: 0,
      leftPadding: 1,
    });

    t.push(['Previews version', 'Next version']);
    let isNext = false;
    const previews = [];
    const next = [];
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

    t.attrRange(
      { row: [0, 1] },
      {
        align: 'center',
        color: 'green',
        bg: 'black',
      }
    );

    t.attrRange(
      {
        row: [1],
        column: [1],
      },
      {
        leftPadding: 5,
      }
    );

    return t;
  }

  getHistoryTable(history: DagModel[]) {
    const t = new Table({
      borderStyle: 2,
      horizontalLine: true,
      width: [3, '50%', '50%'],
      rightPadding: 0,
      leftPadding: 1,
    });

    t.push(['', 'Date', 'Hash']);
    console.log(history);
    history.forEach(v => {
      t.push(['', `${v.createdAt}`, `rxdi-deploy --find ${v.hash}`]);
    });

    t.attrRange(
      { row: [0, 1] },
      {
        align: 'center',
        color: 'green',
        bg: 'black',
      }
    );

    t.attrRange(
      {
        row: [1],
        column: [1],
      },
      {
        leftPadding: 5,
      }
    );

    return t;
  }

  fileUploadStatus(file: IPFSFile[]) {
    const t = new Table({
      borderStyle: 2,
      horizontalLine: true,
      width: ['100%'],
      rightPadding: 0,
      leftPadding: 1,
    });

    t.push(['File upload status']);
    t.push([`\File size: ${file[0].size} bytes`]);
    t.push([`\IPFS address: ${this.fileIpfsService.providers.ipfsOriginal}${file[0].hash}`]);

    t.attrRange(
      { row: [0, 1] },
      {
        align: 'center',
        color: 'green',
        bg: 'black',
      }
    );

    t.attrRange(
      {
        row: [1],
        column: [1],
      },
      {
        leftPadding: 5,
      }
    );

    return t;
  }
}
