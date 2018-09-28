import { CompilePlugin } from '../../plugins/compile/compile.plugin';
export declare class CompileService {
    private compilePlugin;
    constructor(compilePlugin: CompilePlugin);
    buildFile(): import("rxjs/internal/Observable").Observable<{}>;
}
