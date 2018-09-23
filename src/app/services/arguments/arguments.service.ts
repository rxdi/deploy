
import { Service, Inject } from '@rxdi/core';
import { __DEPLOYER_ARGUMENTS } from '../../../env.injection.tokens';

export const nextOrDefault = (i: string, fb: any = null, type = (p) => (p)) => process.argv.toString().includes(i) ? type(process.argv[process.argv.indexOf(i) + 1]) : fb

@Service()
export class ArgumentsService {

    constructor(
        @Inject(__DEPLOYER_ARGUMENTS) private args: __DEPLOYER_ARGUMENTS
    ) { }

    nextOrDefault(i: string, fallback: any = null, type = (p) => (p)) {
        return nextOrDefault(i, fallback, type);
    }

}