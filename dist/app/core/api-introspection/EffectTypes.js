"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function strEnum(o) {
    return o.reduce((res, key) => {
        res[key] = key;
        return res;
    }, Object.create(null));
}
exports.EffectTypes = strEnum(["status",
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
//# sourceMappingURL=EffectTypes.js.map