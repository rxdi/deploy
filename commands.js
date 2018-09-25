"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    '--graphiql-playground',
    '--node-only',
    '--silent',
    '--unminify',
    '--browser',
    '--v',
    '--tsconfig',
    '--verbose',
    '--default-ipfs-node',
    '--deployer-config-name',
    '--graphiql',
    '--open-browser-graphiql',
    '--server-watcher',
    '--server-watcher-port',
    '--graphiql-subscription-endpoint',
    '--graphiql-auth-token',
    '--graphql-endpoint',
    '--write-effects',
    '--graphiql-endpoint',
    '--graphql-api-port'
]);
//# sourceMappingURL=commands.js.map