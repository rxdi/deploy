import { Service } from '@rxdi/core';

@Service()
export class ErrorReasonService {
  moduleIntegrityError(oldHash, newHash) {
    console.log(`Module is with the same integrity like in the previws version ${oldHash}`);
    console.log(`To check this version write down following command rxdi-deploy --find ${newHash}`);
    // console.log(`Nothing is deployed!`);
  }
}
