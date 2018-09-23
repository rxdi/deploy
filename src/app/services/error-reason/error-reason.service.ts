import { Service, BootstrapLogger } from '@rxdi/core';

@Service()
export class ErrorReasonService {

    constructor(
        private logger: BootstrapLogger
    ) { }

    moduleIntegrityError(hash) {
        this.logger.log(`Module is with the same integrity like in the version ${hash}`);
        this.logger.log(`To check this version write rxdi-deploy --find ${hash}`);
    }

}