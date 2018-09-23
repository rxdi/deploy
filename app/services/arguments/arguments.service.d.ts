import { __DEPLOYER_ARGUMENTS } from '../../../env.injection.tokens';
export declare const nextOrDefault: (i: string, fb?: any, type?: (p: any) => any) => any;
export declare class ArgumentsService {
    private args;
    constructor(args: __DEPLOYER_ARGUMENTS);
    nextOrDefault(i: string, fallback?: any, type?: (p: any) => any): any;
}
