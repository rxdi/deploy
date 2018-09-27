import { FileService } from '../file/file.service';
import { __DEPLOYER_OUTPUT_CONFIG_NAME } from '../../../env.injection.tokens';
export declare class PackageJsonService {
    private fileService;
    private deployerOutputConfigName;
    defaultOutputConfig: __DEPLOYER_OUTPUT_CONFIG_NAME;
    constructor(fileService: FileService, deployerOutputConfigName: __DEPLOYER_OUTPUT_CONFIG_NAME);
    OnInit(): void;
    prepareDependencies(): Promise<{
        name: string;
        version: any;
    }[]>;
    readModifyWrite(modifier?: any): Promise<boolean>;
    read(): Promise<any>;
    write(data: any): Promise<boolean>;
}
