import { BootstrapLogger } from '@rxdi/core';
export declare class ErrorReasonService {
    private logger;
    constructor(logger: BootstrapLogger);
    moduleIntegrityError(hash: any): void;
}
