import { CommandDescription } from './commands-description';

function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
    return o.reduce((res, key) => {
        res[key] = key;
        return res;
    }, Object.create(null));
}

export const Commands = strEnum([
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
    '--graphql-api-port',
    '--disable-package-collection',
    '--collect-packages',
    '--help'
]);
export type Commands = keyof typeof Commands;


export const ExcludedFromHelpers = strEnum([
    '--v'
]);
export type ExcludedFromHelpers = keyof typeof ExcludedFromHelpers;

Object.keys(Commands).map(command => {
    if (Object.keys(ExcludedFromHelpers).filter((c) => c === command).length) {
        return;
    }
    const commandExist = Object.keys(CommandDescription).filter(c => c === command).length;
    if (!commandExist) {
        console.error(`
Missing helper for command ${command} if you seen this message the developers don't do their job very well and this release is broken...
        `);
        process.exit(0);
    }
});

