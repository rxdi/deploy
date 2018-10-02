"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_description_1 = require("./commands-description");
function strEnum(o) {
    return o.reduce((res, key) => {
        res[key] = key;
        return res;
    }, Object.create(null));
}
exports.Commands = strEnum([
    '--message',
    '--out-dir',
    '--file',
    '--namespace',
    '--beat',
    '--html',
    '--webui',
    '--open-browser',
    '--node-only',
    '--silent',
    '--unminify',
    '--browser',
    '--v',
    '--tsconfig',
    '--verbose',
    '--default-ipfs-node',
    '--deployer-config-name',
    '--open-browser-graphiql',
    '--webui-server-watcher',
    '--webui-server-watcher-port',
    '--random-port',
    '--graphiql',
    '--graphiql-subscription-endpoint',
    '--graphiql-playground',
    '--graphiql-auth-token',
    '--graphiql-endpoint',
    '--graphql-endpoint',
    '--write-effects',
    '--graphql-api-port',
    '--disable-package-collection',
    '--collect-packages',
    '--server-push-interval',
    '--help',
    '--ipfs-api-gateway',
    '--ipfs-api-port',
    '--ipfs-swarms',
    '--graphql-server-only',
    '--enable-full-folder-access'
]);
exports.ExcludedFromHelpers = strEnum([
    '--v'
]);
Object.keys(exports.Commands).map(command => {
    if (Object.keys(exports.ExcludedFromHelpers).filter((c) => c === command).length) {
        return;
    }
    const commandExist = Object.keys(commands_description_1.CommandDescription).filter(c => c === command).length;
    if (!commandExist) {
        console.error(`
Missing helper for command ${command} if you seen this message the developers don't do their job very well and this release is broken...
        `);
        process.exit(0);
    }
});
//# sourceMappingURL=commands.js.map