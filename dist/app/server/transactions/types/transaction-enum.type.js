"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.TransactionTypeEnum = new graphql_1.GraphQLEnumType({
    name: 'TransactionsTypeEnum',
    values: {
        DEPLOYED: {
            value: 'DEPLOYED'
        },
        COMMITED: {
            value: 'COMMITED'
        },
        UNKNOWN: {
            value: 'UNKNOWN'
        },
        BUILD: {
            value: 'BUILD'
        },
    }
});
//# sourceMappingURL=transaction-enum.type.js.map