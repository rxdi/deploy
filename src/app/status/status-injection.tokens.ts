import { BehaviorSubject } from 'rxjs';
import { InjectionToken } from '@rxdi/core/container/Token';

export type STATUS_TYPE = BehaviorSubject<boolean>;
export interface FILE_DEPLOYMENT_STATUS_INTERFACE {
    file?: boolean;
    typings?: boolean;
    module?: boolean;
}
export type FILE_DEPLOYMENT_STATUS = BehaviorSubject<FILE_DEPLOYMENT_STATUS_INTERFACE>;

export const START = new InjectionToken('compilation-started');
export const FILE_DEPLOYMENT_STATUS = new InjectionToken('files-deploy-ment');
