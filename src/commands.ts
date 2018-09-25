function strEnum<T extends string>(o: Array<T>): {[K in T]: K} {
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
    '--node-only'
]);
export type Commands = keyof typeof Commands;