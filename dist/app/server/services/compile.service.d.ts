import { CompilePlugin } from '../../plugins/compile/compile.plugin';
export declare class CompileService {
    private compilePlugin;
    constructor(compilePlugin: CompilePlugin);
    buildFile(folder: string, file: string, message: string, namespace: string, buildFolder: any): import("rxjs/internal/Observable").Observable<{}>;
}
