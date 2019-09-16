import { InjectionToken } from '@rxdi/core';
import * as Datastore from 'nedb';

export type __DEPLOYER_ARGUMENTS = string[];
export type __PARCEL_BROWSER_BUILD = boolean;
export type __PARCEL_MINIFY = boolean;
export type __GENERATE_TS_CONFIG = boolean;
export type __PARCEL_BUILD_OUT_DIR = 'build';
export type __FILE_PATH = './index';
export type __HOME_DIR = string;
export type __FILE_NAME = string;
export type __NAMESPACE = '@rxdi/core';
export type __FOLDER = string;
export type __FILE_EXTENSION = '.ts' | '.js';
export type __IPFS_NODE_RESOLUTION_TIME = number;
export type __DEPLOYER_OUTPUT_CONFIG_NAME = 'reactive.json' | 'package.json';
export type __PROCESSING_TIME_INIT = Date;
export type __PROCESSING_TIME_FINISH = Date;
export type __PROCESSING_TIME_END = Date;
export type __SETTINGS_DATABASE = Datastore;
export type __NAMESPACE_DB = Datastore;
export type __BUILD_HISTORY_DATABASE = Datastore;
export type __PREVIWS_DATABASE = Datastore;
export type __TRANSACTIONS_DATABASE = Datastore;

export type __COMMIT_MESSAGE = string;
export type __CREATE_HTML_PAGE = string;
export type __NODE_MODULES = string;
export type __ROOT_FOLDER = string;

export const __ROOT_FOLDER = new InjectionToken('root_folder');
export const __NODE_MODULES = new InjectionToken('local_node_modules');
export const __DEPLOYER_ARGUMENTS = new InjectionToken('rxdi-deployer-command-arguments');
export const __PARCEL_BROWSER_BUILD = new InjectionToken<boolean>('rxdi-deployer-parcel-is-browser-build');
export const __PARCEL_MINIFY = new InjectionToken<boolean>('rxdi-deployer-parcel-minify');
export const __PARCEL_BUILD_OUT_DIR = new InjectionToken<boolean>('rxdi-deployer-parcel-build-out-dir');
export const __PARCEL_SETTINGS = new InjectionToken('rxdi-deployer-parcel-settings');
export const __GENERATE_TS_CONFIG = new InjectionToken<boolean>('rxdi-deployer-tsconfig-generate');
export const __FILE_PATH = new InjectionToken<boolean>('rxdi-deployer-file-path');
export const __FILE_NAME = new InjectionToken<boolean>('rxdi-deployer-file-name');
export const __NAMESPACE = new InjectionToken<boolean>('rxdi-deployer-namespace');
export const __FOLDER = new InjectionToken<boolean>('rxdi-deployer-folder');
export const __FILE_EXTENSION = new InjectionToken<boolean>('rxdi-deployer-file-extension');
export const __IPFS_NODE_RESOLUTION_TIME = new InjectionToken<boolean>('rxdi-deployer-node-resolution-time');
export const __DEPLOYER_OUTPUT_CONFIG_NAME = new InjectionToken<boolean>(
  'rxdi-deployer-default-migration-package-name'
);
export const __PROCESSING_TIME_INIT = new InjectionToken<boolean>('rxdi-deployer-processin-time-init');
export const __PROCESSING_TIME_FINISH = new InjectionToken<boolean>('rxdi-deployer-processin-time-finish');
export const __PROCESSING_TIME_END = new InjectionToken<boolean>('rxdi-deployer-processin-time-end');
export const __SETTINGS_DATABASE = new InjectionToken<boolean>('rxdi-deployer-home-settings');
export const __BUILD_HISTORY_DATABASE = new InjectionToken<boolean>('rxdi-deployer-build-history-database');
export const __PREVIWS_DATABASE = new InjectionToken<boolean>('rxdi-deployer-previews-database');
export const __TRANSACTIONS_DATABASE = new InjectionToken<boolean>('rxdi-deployer-transactions-database');
export const __NAMESPACE_DB = new InjectionToken<boolean>('rxdi-deployer-namespace-database');
export const __HOME_DIR = new InjectionToken<boolean>('rxdi-deployer-home-directory');
export const __COMMIT_MESSAGE = new InjectionToken<boolean>('rxdi-deployer-commit-message');
export const __CREATE_HTML_PAGE = new InjectionToken<boolean>('rxdi-deployer-commit-message');

export interface __PARCEL_SETTINGS {
  watch?: boolean;
  detailedReport?: boolean;
  outFile?: string;
  publicUrl?: string;
  cache?: boolean;
  cacheDir?: '.cache';
  contentHash?: false;
  scopeHoist?: false;
  https?: { cert: string; key: string };
  logLevel?: 1 | 2 | 3;
  hmr?: true;
  hmrPort?: 0;
  sourceMaps?: true;
  hmrHostname?: string;
  detailedReports?: boolean;
}

export class DagModel {
  name: string;
  typings?: string;
  module: string;
  metadata?: {};
  message?: string;
  hash?: string;
  createdAt?: Date;
  previous?: string[];
  dependencies?: string[];
  packages?: { name: string; version: string }[];
  ipfs?: { provider: string; dependencies: string[] }[];
}

export class PreviousModel {
  id?: string;
  name: string;
  hash: string;
}
