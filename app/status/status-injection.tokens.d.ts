import { BehaviorSubject } from 'rxjs';
import { InjectionToken } from '@rxdi/core/container/Token';
export declare type STATUS_TYPE = BehaviorSubject<boolean>;
export declare type BUILD_STATUS = 'SUCCESS' | 'FAILED' | 'WARNING';
declare class BuildStatus {
    status: BUILD_STATUS;
    message?: string;
}
export declare class FILE_DEPLOYMENT_STATUS_INTERFACE {
    file?: BuildStatus;
    typings?: BuildStatus;
    module?: BuildStatus;
}
export declare type FILE_DEPLOYMENT_STATUS = BehaviorSubject<FILE_DEPLOYMENT_STATUS_INTERFACE>;
export declare const START: InjectionToken<{}>;
export declare const FILE_DEPLOYMENT_STATUS: InjectionToken<{}>;
export {};
