"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@rxdi/core");
exports.__ROOT_FOLDER = new core_1.InjectionToken('root_folder');
exports.__NODE_MODULES = new core_1.InjectionToken('local_node_modules');
exports.__DEPLOYER_ARGUMENTS = new core_1.InjectionToken('rxdi-deployer-command-arguments');
exports.__PARCEL_BROWSER_BUILD = new core_1.InjectionToken('rxdi-deployer-parcel-is-browser-build');
exports.__PARCEL_MINIFY = new core_1.InjectionToken('rxdi-deployer-parcel-minify');
exports.__PARCEL_BUILD_OUT_DIR = new core_1.InjectionToken('rxdi-deployer-parcel-build-out-dir');
exports.__PARCEL_SETTINGS = new core_1.InjectionToken('rxdi-deployer-parcel-settings');
exports.__GENERATE_TS_CONFIG = new core_1.InjectionToken('rxdi-deployer-tsconfig-generate');
exports.__FILE_PATH = new core_1.InjectionToken('rxdi-deployer-file-path');
exports.__FILE_NAME = new core_1.InjectionToken('rxdi-deployer-file-name');
exports.__NAMESPACE = new core_1.InjectionToken('rxdi-deployer-namespace');
exports.__FOLDER = new core_1.InjectionToken('rxdi-deployer-folder');
exports.__FILE_EXTENSION = new core_1.InjectionToken('rxdi-deployer-file-extension');
exports.__IPFS_NODE_RESOLUTION_TIME = new core_1.InjectionToken('rxdi-deployer-node-resolution-time');
exports.__DEPLOYER_OUTPUT_CONFIG_NAME = new core_1.InjectionToken('rxdi-deployer-default-migration-package-name');
exports.__PROCESSING_TIME_INIT = new core_1.InjectionToken('rxdi-deployer-processin-time-init');
exports.__PROCESSING_TIME_FINISH = new core_1.InjectionToken('rxdi-deployer-processin-time-finish');
exports.__PROCESSING_TIME_END = new core_1.InjectionToken('rxdi-deployer-processin-time-end');
exports.__SETTINGS_DATABASE = new core_1.InjectionToken('rxdi-deployer-home-settings');
exports.__BUILD_HISTORY_DATABASE = new core_1.InjectionToken('rxdi-deployer-build-history-database');
exports.__PREVIWS_DATABASE = new core_1.InjectionToken('rxdi-deployer-previews-database');
exports.__HOME_DIR = new core_1.InjectionToken('rxdi-deployer-home-directory');
exports.__COMMIT_MESSAGE = new core_1.InjectionToken('rxdi-deployer-commit-message');
exports.__CREATE_HTML_PAGE = new core_1.InjectionToken('rxdi-deployer-commit-message');
;
class DagModel {
}
exports.DagModel = DagModel;
class PreviewsModel {
}
exports.PreviewsModel = PreviewsModel;
//# sourceMappingURL=env.injection.tokens.js.map