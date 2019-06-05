#!/usr/bin/env node
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const check_arguments_1 = require("./check-arguments");
const core_1 = require("@rxdi/core");
const commands_description_1 = require("./commands-description");
const helpers_1 = require("./app/services/helpers/helpers");
const logger_service_1 = require("./app/services/logger/logger.service");
const Table = require('terminal-table');
const originalLog = console.log;
console.log = function (...a) {
    core_1.Container.get(logger_service_1.LoggerService).stdout.next(a.toString());
    return originalLog(...a);
};
helpers_1.includes('--silent') ? console.log = () => null : null;
if (helpers_1.includes('--help')) {
    const t = new Table({
        borderStyle: 2,
        horizontalLine: true,
        width: ['20%', '80%'],
        leftPadding: 1
    });
    t.push(['Command', 'Description']);
    t.push([`\Available arguments are:`]);
    Object.keys(commands_description_1.CommandDescription).forEach(c => t.push([c, commands_description_1.CommandDescription[c]]));
    t.attrRange({ row: [0, 1] }, {
        align: 'center',
        color: 'green',
        bg: 'black'
    });
    console.log('' + t);
    process.exit(0);
}
check_arguments_1.checkArguments();
const environment_setter_module_1 = require("./environment-setter.module");
const app_module_1 = require("./app/app.module");
const gapi_framework_imports_1 = require("./gapi-framework-imports");
core_1.Container.get(core_1.ConfigService).setConfig(Object.assign({}, (process.argv.toString().includes('-v') || process.argv.toString().includes('--verbose')) ? ({
    logger: {
        logging: true,
        hashes: false,
        date: true,
        exitHandler: true,
        fileService: true
    }
}) : ({}), { init: false, initOptions: {
        services: true,
        plugins: true,
        controllers: true
    } }));
const _FRAMEWORK_IMPORTS = [environment_setter_module_1.EnvironemntSetterModule, gapi_framework_imports_1.GapiFrameworkImports.forRoot(helpers_1.includes('--webui') || helpers_1.includes('--graphql-server-only'))];
core_1.BootstrapFramework(app_module_1.AppModule, _FRAMEWORK_IMPORTS)
    .subscribe(() => {
    console.log('Started! Use --open-browser argument! Enjoy! :)');
}, (error) => {
    throw new Error(error);
});
__export(require("./app/index"));
__export(require("./gapi-framework-imports"));
__export(require("./env.injection.tokens"));
__export(require("./commands"));
__export(require("./check-arguments"));
__export(require("./commands-description"));
//# sourceMappingURL=main.js.map