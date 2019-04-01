import { GraphQLEnumType } from "graphql";

export const TransactionTypeEnum = new GraphQLEnumType({
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

export type TransactionTypeEnum = 'DEPLOYED' | 'COMMITED' | 'UNKNOWN';