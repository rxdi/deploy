import { FileService } from '../file/file.service';
import { __DEPLOYER_OUTPUT_CONFIG_NAME } from '../../../env.injection.tokens';
export declare class PackageJsonService {
    private fileService;
    private deployerOutputConfigName;
    defaultOutputConfig: __DEPLOYER_OUTPUT_CONFIG_NAME;
    constructor(fileService: FileService, deployerOutputConfigName: __DEPLOYER_OUTPUT_CONFIG_NAME);
    OnInit(): void;
    prepareDependencies(path?: string): Promise<{
        name: string;
        version: any;
    }[]>;
    readModifyWrite(modifier?: any, path?: string): Promise<boolean>;
    read(path?: string): Promise<any>;
    write(data: any, path?: string): Promise<boolean>;
}
