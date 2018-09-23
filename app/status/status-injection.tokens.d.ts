import { BehaviorSubject } from 'rxjs';
import { InjectionToken } from '@rxdi/core/container/Token';
export declare type STATUS_TYPE = BehaviorSubject<boolean>;
export interface FILE_DEPLOYMENT_STATUS_INTERFACE {
    file?: boolean;
    typings?: boolean;
    module?: boolean;
}
export declare type FILE_DEPLOYMENT_STATUS = BehaviorSubject<FILE_DEPLOYMENT_STATUS_INTERFACE>;
export declare const START: InjectionToken<{}>;
export declare const FILE_DEPLOYMENT_STATUS: InjectionToken<{}>;
