import { Service, BootstrapLogger, Inject } from '@rxdi/core';
import childProcess = require('child_process');
import { __NODE_MODULES } from '../../../env.injection.tokens';

@Service()
export class TypescriptDefinitionGeneratorService {
    child: childProcess.ChildProcess;

    constructor(
        private logger: BootstrapLogger,
        @Inject(__NODE_MODULES) private node_modules: string
    ) { }

    private validateEntries(namespace: string, projectPath: string, outPath: string) {
        if (!projectPath) {
            throw new Error('Missing project path');
        }
        if (!namespace) {
            throw new Error('Missing project namespace');
        }

        if (!outPath) {
            throw new Error('Missing project outPath');
        }
    }

    async mergeTypings(namespace: string, projectPath, outPath: string) {
        this.validateEntries(namespace, projectPath, outPath);
        return new Promise((resolve, reject) => {
            if (this.child) {
                this.child.stdout.removeAllListeners('data');
                this.child.stderr.removeAllListeners('data');
                this.child.removeAllListeners('exit');
                this.child.kill();
            }
            process.env = Object.assign(process.env, {});
            this.logger.log('Typescript merging definitions started in child process...\n');
            this.child = childProcess.spawn(
                `${this.node_modules}/.bin/rxdi-merge`,
                [
                    '--name',
                    namespace,
                    '--project',
                    projectPath,
                    '--out',
                    outPath
                ]
            );
            this.child.stdout.on('data', (data) => process.stdout.write(data));
            this.child.stderr.on('data', (data) => {
                if (data.toString().includes('Unable to resolve configuration')) {
                    this.logger.log('If you want rxdi-deploy to create tsconfig.json for you pass parameter --tsconfig');
                }
                reject(process.stdout.write(data));
            });
            this.child.on('exit', (code) => {
                this.child.kill();
                this.child = null;
                this.logger.log(`Child process exited with code ${code}\n`);
                resolve(true);
            });
        });
    }

}