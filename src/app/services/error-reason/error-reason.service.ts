import { Service } from '@rxdi/core';

@Service()
export class ErrorReasonService {

    moduleIntegrityError(hash) {
        console.log(`Module is with the same integrity like in the previws version ${hash}`);
        console.log(`To check this version write rxdi-deploy --find ${hash}`);
        console.log(`Nothing is deployed --find ${hash}`);
    }

}