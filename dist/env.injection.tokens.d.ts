import { InjectionToken } from '@rxdi/core';
import * as Datastore from 'nedb';
export declare type __DEPLOYER_ARGUMENTS = string[];
export declare type __PARCEL_BROWSER_BUILD = boolean;
export declare type __PARCEL_MINIFY = boolean;
export declare type __GENERATE_TS_CONFIG = boolean;
export declare type __PARCEL_BUILD_OUT_DIR = 'build';
export declare type __FILE_PATH = './index';
export declare type __HOME_DIR = string;
export declare type __FILE_NAME = string;
export declare type __NAMESPACE = '@rxdi/core';
export declare type __FOLDER = string;
export declare type __FILE_EXTENSION = '.ts' | '.js';
export declare type __IPFS_NODE_RESOLUTION_TIME = number;
export declare type __DEPLOYER_OUTPUT_CONFIG_NAME = 'reactive.json' | 'package.json';
export declare type __PROCESSING_TIME_INIT = Date;
export declare type __PROCESSING_TIME_FINISH = Date;
export declare type __PROCESSING_TIME_END = Date;
export declare type __SETTINGS_DATABASE = Datastore;
export declare type __NAMESPACE_DB = Datastore;
export declare type __BUILD_HISTORY_DATABASE = Datastore;
export declare type __PREVIWS_DATABASE = Datastore;
export declare type __TRANSACTIONS_DATABASE = Datastore;
export declare type __COMMIT_MESSAGE = string;
export declare type __CREATE_HTML_PAGE = string;
export declare type __NODE_MODULES = string;
export declare type __ROOT_FOLDER = string;
export declare const __ROOT_FOLDER: InjectionToken<unknown>;
export declare const __NODE_MODULES: InjectionToken<unknown>;
export declare const __DEPLOYER_ARGUMENTS: InjectionToken<unknown>;
export declare const __PARCEL_BROWSER_BUILD: InjectionToken<boolean>;
export declare const __PARCEL_MINIFY: InjectionToken<boolean>;
export declare const __PARCEL_BUILD_OUT_DIR: InjectionToken<boolean>;
export declare const __PARCEL_SETTINGS: InjectionToken<unknown>;
export declare const __GENERATE_TS_CONFIG: InjectionToken<boolean>;
export declare const __FILE_PATH: InjectionToken<boolean>;
export declare const __FILE_NAME: InjectionToken<boolean>;
export declare const __NAMESPACE: InjectionToken<boolean>;
export declare const __FOLDER: InjectionToken<boolean>;
export declare const __FILE_EXTENSION: InjectionToken<boolean>;
export declare const __IPFS_NODE_RESOLUTION_TIME: InjectionToken<boolean>;
export declare const __DEPLOYER_OUTPUT_CONFIG_NAME: InjectionToken<boolean>;
export declare const __PROCESSING_TIME_INIT: InjectionToken<boolean>;
export declare const __PROCESSING_TIME_FINISH: InjectionToken<boolean>;
export declare const __PROCESSING_TIME_END: InjectionToken<boolean>;
export declare const __SETTINGS_DATABASE: InjectionToken<boolean>;
export declare const __BUILD_HISTORY_DATABASE: InjectionToken<boolean>;
export declare const __PREVIWS_DATABASE: InjectionToken<boolean>;
export declare const __TRANSACTIONS_DATABASE: InjectionToken<boolean>;
export declare const __NAMESPACE_DB: InjectionToken<boolean>;
export declare const __HOME_DIR: InjectionToken<boolean>;
export declare const __COMMIT_MESSAGE: InjectionToken<boolean>;
export declare const __CREATE_HTML_PAGE: InjectionToken<boolean>;
export interface __PARCEL_SETTINGS {
    watch?: boolean;
    detailedReport?: boolean;
    outFile?: string;
    publicUrl?: string;
    cache?: boolean;
    cacheDir?: '.cache';
    contentHash?: false;
    scopeHoist?: false;
    https?: {
        cert: string;
        key: string;
    };
    logLevel?: 1 | 2 | 3;
    hmr?: true;
    hmrPort?: 0;
    sourceMaps?: true;
    hmrHostname?: string;
    detailedReports?: boolean;
}
export declare class DagModel {
    name: string;
    typings?: string;
    module: string;
    metadata?: {};
    message?: string;
    hash?: string;
    createdAt?: Date;
    previous?: string[];
    dependencies?: string[];
    packages?: {
        name: string;
        version: string;
    }[];
    ipfs?: {
        provider: string;
        dependencies: string[];
    }[];
}
export declare class PreviousModel {
    id?: string;
    name: string;
    hash: string;
}
