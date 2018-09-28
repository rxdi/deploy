import { Service } from '@rxdi/core';
import { CompilePlugin } from '../../plugins/compile/compile.plugin';

@Service()
export class CompileService {

    constructor(
        private compilePlugin: CompilePlugin
    ) {}

    buildFile() {
        return this.compilePlugin.completeBuildAndAddToIpfs('./packages/', 'index.ts', 'bla bla', '@pesho', 'reactive.json');
    }
}