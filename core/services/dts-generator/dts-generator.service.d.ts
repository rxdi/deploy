/// <reference types="node" />
import { BootstrapLogger } from '@rxdi/core';
import childProcess = require('child_process');
export declare class TypescriptDefinitionGeneratorService {
    private logger;
    child: childProcess.ChildProcess;
    constructor(logger: BootstrapLogger);
    private validateEntries;
    mergeTypings(namespace: string, projectPath: any, outPath: string): Promise<{}>;
}
