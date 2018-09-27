#!/usr/bin/env node
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const check_arguments_1 = require("./check-arguments");
const commands_description_1 = require("./commands-description");
const helpers_1 = require("./app/services/helpers/helpers");
let Table = require('terminal-table');
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
}) : ({}), { init: false, initOptions: {
        services: true,
        plugins: true,
        controllers: true
    } }));
const _FRAMEWORK_IMPORTS = [environment_setter_module_1.EnvironemntSetterModule];
helpers_1.includes('--webui') ? _FRAMEWORK_IMPORTS.push(framework_imports_1.FrameworkImports) : null;
core_1.BootstrapFramework(app_module_1.AppModule, _FRAMEWORK_IMPORTS)
    .subscribe(() => {
    console.log('Bootstrap success!');
}, (error) => {
    throw new Error(error);
});
__export(require("./app/index"));
__export(require("./framework-imports"));
//# sourceMappingURL=index.js.map