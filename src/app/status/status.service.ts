import { Service, Inject } from '@rxdi/core';
import {
  FILE_DEPLOYMENT_STATUS,
  FILE_DEPLOYMENT_STATUS_INTERFACE,
} from './status-injection.tokens';

@Service()
export class StatusService {
  @Inject(FILE_DEPLOYMENT_STATUS)
  private $deploymentStatus: FILE_DEPLOYMENT_STATUS;

  getBuildStatus() {
    return this.$deploymentStatus.getValue();
  }

  setBuildStatus(status: FILE_DEPLOYMENT_STATUS_INTERFACE) {
    this.$deploymentStatus.next({
      ...this.$deploymentStatus.getValue(),
      ...status,
    });
  }
}
