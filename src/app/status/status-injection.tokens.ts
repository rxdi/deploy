import { BehaviorSubject } from 'rxjs';
import { InjectionToken } from '@rxdi/core/container/Token';

export type STATUS_TYPE = BehaviorSubject<boolean>;
export type BUILD_STATUS = 'SUCCESS' | 'FAILED' | 'WARNING';
export class FILE_DEPLOYMENT_STATUS_INTERFACE {
    file?: BUILD_STATUS = 'SUCCESS';
    typings?: BUILD_STATUS ='SUCCESS';
    module?: BUILD_STATUS = 'SUCCESS';
}
export type FILE_DEPLOYMENT_STATUS = BehaviorSubject<FILE_DEPLOYMENT_STATUS_INTERFACE>;

export const START = new InjectionToken('compilation-started');
export const FILE_DEPLOYMENT_STATUS = new InjectionToken('files-deploy-ment');
