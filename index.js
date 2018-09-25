#!/usr/bin/env node
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const arguments_service_1 = require("./app/services/arguments/arguments.service");
arguments_service_1.includes('--silent') || arguments_service_1.includes('--webui') ? console.log = () => null : null;
const core_1 = require("@rxdi/core");
const environment_setter_module_1 = require("./environment-setter.module");
const app_module_1 = require("./app/app.module");
const framework_imports_1 = require("./framework-imports");
core_1.Container.get(core_1.ConfigService).setConfig(Object.assign({}, (process.argv.toString().includes('-v') || process.argv.toString().includes('--verbose')) ? ({
    logger: {
        logging: true,
        hashes: true,
        date: true,
        exitHandler: true,
        fileService: true
    }
}) : ({}), { init: true, initOptions: {
        services: true,
        plugins: true,
        controllers: true
    } }));
const _FRAMEWORK_IMPORTS = [environment_setter_module_1.EnvironemntSetterModule];
arguments_service_1.includes('--webui') ? _FRAMEWORK_IMPORTS.push(framework_imports_1.FrameworkImports) : null;
core_1.BootstrapFramework(app_module_1.AppModule, _FRAMEWORK_IMPORTS)
    .subscribe(() => {
    console.log('Bootstrap success!');
}, (error) => {
    throw new Error(error);
});
__export(require("./app/index"));
__export(require("./framework-imports"));
//# sourceMappingURL=index.js.map