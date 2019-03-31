import { FILE_DEPLOYMENT_STATUS_INTERFACE } from './status-injection.tokens';
export declare class StatusService {
    private $deploymentStatus;
    getBuildStatus(): FILE_DEPLOYMENT_STATUS_INTERFACE;
    setBuildStatus(status: FILE_DEPLOYMENT_STATUS_INTERFACE): void;
}
