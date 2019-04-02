
/* tslint:disable */
function strEnum<T extends string>(o: Array<T>): {[K in T]: K} {
    return o.reduce((res, key) => {
        res[key] = key;
        return res;
    }, Object.create(null));
}
export const EffectTypes = strEnum(["status",
"getNamespace",
"listNamespaces",
"getBuildHistory",
"listFiles",
"readFile",
"saveFile",
"listTransactions",
"findUser",
"insertNamespace",
"triggerBuild",
"addTransaction",
"checkoutTransaction",
"commitTransaction",
"pushTransactionMutation",
"listenForNewBuilds",
"buildStatus",
"processStdOut",
"subscribeToUserMessagesBasic"]);
export type EffectTypes = keyof typeof EffectTypes;
