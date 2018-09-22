/// <reference types="node" />
import { BootstrapLogger } from '@rxdi/core';
import childProcess = require('child_process');
export declare class TypescriptDefinitionGeneratorService {
    private logger;
    private node_modules;
    child: childProcess.ChildProcess;
    constructor(logger: BootstrapLogger, node_modules: string);
    private validateEntries;
    mergeTypings(namespace: string, projectPath: any, outPath: string): Promise<{}>;
}
