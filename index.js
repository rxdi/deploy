#!/usr/bin/env node
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
process.argv.toString().includes('--silent') ? console.log = () => null : null;
const core_1 = require("@rxdi/core");
const environment_setter_module_1 = require("./environment-setter.module");
const app_module_1 = require("./app/app.module");
const arguments_service_1 = require("./app/services/arguments/arguments.service");
core_1.Container.get(core_1.ConfigService).setConfig(Object.assign({}, (process.argv.toString().includes('-v') || process.argv.toString().includes('--verbose')) ? ({
    logger: {
        logging: true,
        hashes: true,
        date: true,
        exitHandler: true,
        fileService: true
    }
}) : ({}), { init: false, initOptions: {
        services: true,
        pluginsAfter: arguments_service_1.nextOrDefault('--node-only', true, Boolean)
    } }));
core_1.BootstrapFramework(app_module_1.AppModule, [environment_setter_module_1.EnvironemntSetterModule])
    .subscribe(() => console.log('Bootstrap success!'), (error) => {
    throw new Error(error);
});
__export(require("./app/index"));
