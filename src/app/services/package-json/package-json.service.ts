import { FileService } from '../file/file.service';
import { Service, Inject } from '@rxdi/core';
import { __DEPLOYER_OUTPUT_CONFIG_NAME } from '../../../env.injection.tokens';
import { includes } from '../arguments/arguments.service';

@Service()
export class PackageJsonService {

    defaultOutputConfig: __DEPLOYER_OUTPUT_CONFIG_NAME;

    constructor(
        private fileService: FileService,
        @Inject(__DEPLOYER_OUTPUT_CONFIG_NAME) private deployerOutputConfigName: __DEPLOYER_OUTPUT_CONFIG_NAME
    ) { }

    OnInit() {
        if (includes('--collect-packages')) {
            this.defaultOutputConfig = 'package.json';
        } else {
            this.defaultOutputConfig = this.deployerOutputConfigName;
        }
    }

    async prepareDependencies() {
        const file = await this.read();
        if (file.dependencies) {
            return Object.keys(file.dependencies).map(name => ({
                name,
                version: file.dependencies[name]
            }))
        }
        return [];
    }

    async readModifyWrite(modifier: any = {}) {
        let file = await this.read();
        file = { ...modifier, ...file };
        return await this.write(file);
    }

    async read() {
        return JSON.parse(await this.fileService.readFile(`${process.cwd()}/${this.defaultOutputConfig}`))
    }

    async write(data) {
        return await this.fileService.writeFile(`${process.cwd()}/${this.defaultOutputConfig}`, JSON.stringify(data));
    }

}