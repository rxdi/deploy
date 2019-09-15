import { FileService } from '../file/file.service';
import { Service, Inject } from '@rxdi/core';
import { __DEPLOYER_OUTPUT_CONFIG_NAME } from '../../../env.injection.tokens';
import { includes } from '../helpers/helpers';

@Service()
export class PackageJsonService {
  defaultOutputConfig: __DEPLOYER_OUTPUT_CONFIG_NAME;

  constructor(
    private fileService: FileService,
    @Inject(__DEPLOYER_OUTPUT_CONFIG_NAME)
    private deployerOutputConfigName: __DEPLOYER_OUTPUT_CONFIG_NAME
  ) {}

  OnInit() {
    if (includes('--collect-packages')) {
      this.defaultOutputConfig = 'package.json';
    } else {
      this.defaultOutputConfig = this.deployerOutputConfigName;
    }
  }

  async prepareDependencies(path?: string) {
    const file = await this.read(path);
    if (file.dependencies) {
      return Object.keys(file.dependencies).map(name => ({
        name,
        version: file.dependencies[name]
      }));
    }
    return [];
  }

  async readModifyWrite(modifier: any = {}, path?: string) {
    let file = await this.read(path);
    file = { ...modifier, ...file };
    return await this.write(file, path);
  }

  async read(path?: string) {
    return JSON.parse(
      await this.fileService.readFile(
        path || `${process.cwd()}/${this.defaultOutputConfig}`
      )
    );
  }

  async write(data, path?: string) {
    return await this.fileService.writeFile(
      path || `${process.cwd()}/${this.defaultOutputConfig}`,
      JSON.stringify(data)
    );
  }
}
