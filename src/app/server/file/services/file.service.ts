import { Service, Inject } from "@rxdi/core";
import { switchMap } from "rxjs/operators";
import {
  stat,
  Stats,
  readdir,
  rename,
  createReadStream,
  createWriteStream,
  unlink,
  copyFile
} from "fs";
import { includes } from "../../../services";
import { resolve, normalize } from "path";
import { from } from "rxjs";
import { promisify } from "util";
import { __HOME_DIR } from "../../../../env.injection.tokens";
import { mkdirp } from "@rxdi/core/dist/services/file/dist";


const ncp = require("ncp").ncp;
const rimraf = require("rimraf");

@Service()
export class FileService {
  units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  results: string[] = [];
  @Inject(__HOME_DIR) private homeDir: __HOME_DIR;
  constructor() {}
  async wholeReadDirRecursive(path: string = ".") {
    const directory = await this.readDir(path);
    const pathinternal = path;
    const self = this;
    return (await Promise.all(
      directory.map(async file => {
        const path = resolve(pathinternal, file);
        const stat = await this.statAsync(path);
        if (stat && stat.isDirectory()) {
          if (!file.includes("node_modules")) {
            await self.wholeReadDirRecursive.bind(this)(path);
          } else {
            return null;
          }
        } else {
          this.results = [...this.results, path];
        }
      })
    )).filter(a => !!a);
  }

  async readCurrentDirFlat(path: string = ".") {
    return (await this.readDir(path))
      .map(file => resolve(path, file))
      .filter(a => !!a);
  }

  async listFolder(folder: string) {
    return await new Promise((resolve, reject) => {
      from(this.readCurrentDirFlat(folder))
        .pipe(switchMap(res => this.map(res)))
        .subscribe(res => resolve(res), e => reject(e));
    });
  }

  async readDir(folder: string, limit: number = 200) {
    return await new Promise<string[]>((resolve, reject) => {
      readdir(folder, (err, list: string[]) => {
        if (err) {
          resolve([]);
        } else {
          let count = 0;
          resolve(
            list
              .map(f => {
                count++;
                if (limit > count) {
                  return f;
                } else {
                  return null;
                }
              })
              .filter(res => !!res)
          );
        }
      });
    });
  }

  async map(res) {
    let foldersCount = 100;
    let counter = 0;
    return (await Promise.all(
      res.map(async r => {
        counter++;
        const mapping = {
          path: r,
          directory: null,
          file: null,
          name: null,
          status: null
        };
        const status: Stats = await this.statAsync(r);
        const pathMapping = v => r.replace(process.cwd(), v);

        if (!status.isDirectory || (status && status["prototype"] === String)) {
          return null;
        }
        if (status.isDirectory()) {
          mapping.directory = true;
        } else {
          mapping.file = true;
        }
        mapping.name = r.split("/").pop();
        mapping.path = pathMapping(".");

        if (includes("--enable-full-folder-access")) {
          mapping.path = r;
        }

        mapping.status = status;
        mapping.status.size = this.niceBytes(status.size);
        if (counter === foldersCount) {
          return null;
        }
        return mapping;
      })
    )).filter(res => !!res);
  }

  private niceBytes(x) {
    let l = 0,
      n = parseInt(x, 10) || 0;
    while (n >= 1024 && ++l) n = n / 1024;
    return n.toFixed(n >= 10 || l < 1 ? 0 : 1) + " " + this.units[l];
  }

  async statAsync(path: string): Promise<any> {
    return await new Promise((resolve, reject) => {
      stat(path, (e, stats) => {
        if (e) {
          resolve(e);
        }
        resolve(stats);
      });
    });
  }

  moveFile(filePath: string, newPath?: string) {
    return from(
      promisify(rename)(filePath, newPath || `${this.homeDir}/.rxdi/builds`)
    );
  }

  ensureDir(path: string) {
    return new Promise((resolve, reject) => {
      mkdirp(path, (err) => {
        if (err) {
            console.error(err);
            reject(err);
        }
        else {
           resolve();
        }
      });
    })
  }
  private getFolderFromPath(path: string) {
    return path.substring(0, path.lastIndexOf("/"));
  }
  async copyTransactionFiles(
    transactionId: string,
    repoFolder: string,
    fileName: string
  ) {
    const {saveFolder, originalFilePath, filePath } = this.prepareCopyData(transactionId, repoFolder, fileName);
    await this.ensureDir(this.getFolderFromPath(saveFolder));
    await this.copyFile(`${repoFolder}/package.json`, `${filePath}/package.json`);
    await this.copyFolderRecursive(
      this.getFolderFromPath(originalFilePath),
      this.getFolderFromPath(saveFolder)
    );
  }

  prepareCopyData(
    transactionId: string,
    repoFolder: string,
    fileName: string
  ) {
    const transactionFolder = `${this.homeDir}/.rxdi/builds/${transactionId}`;
    const originalFilePath = normalize(`${repoFolder}/${fileName}`);
    const saveFolder = normalize(`${transactionFolder}/${fileName}`);
    const filename = originalFilePath.replace(/^.*[\\\/]/, '');
    const filePath = saveFolder.replace(filename, '');

    return {
        saveFolder,
        originalFilePath,
        transactionFolder,
        filename,
        filePath
    }
  }

  removeTransaction(
    transactionId: string,
    repoFolder: string,
    fileName: string
  ) {
    const {transactionFolder} = this.prepareCopyData(transactionId, repoFolder, fileName);
    return from(new Promise(r => rimraf(transactionFolder, r)));
  }

  removeFile(path: string) {
    path = normalize(path);
    return from(promisify(unlink)(path));
  }

  copyFile(path: string, newPath: string) {
    return promisify(copyFile)(path, newPath);
  }

  copyFolderRecursive(source: string, destination: string) {
    // ncp.limit = 16;
    return new Promise((resolve, reject) => {
      console.log("WHY")
      ncp(source, destination, function(err) {
        console.log(err)
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }
}
