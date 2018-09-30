import { CompileService } from "../services/compile.service";
export declare class BuildController {
    private compileService;
    constructor(compileService: CompileService);
    triggerBuild(root: any, { folder, file, message, namespace, buildFolder }: {
        folder: any;
        file: any;
        message: any;
        namespace: any;
        buildFolder: any;
    }): {
        status: string;
    };
}
