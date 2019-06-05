"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const transaction_enum_type_1 = require("./transaction-enum.type");
exports.TransactionType = new graphql_1.GraphQLObjectType({
    name: 'TransactionType',
    fields: {
        _id: {
            type: graphql_1.GraphQLString
        },
        status: {
            type: transaction_enum_type_1.TransactionTypeEnum
        },
        birthtime: {
            type: graphql_1.GraphQLString
        },
        path: {
            type: graphql_1.GraphQLString
        },
        repoFolder: {
            type: graphql_1.GraphQLString
        },
        hash: {
            type: graphql_1.GraphQLString
        },
        namespace: {
            type: graphql_1.GraphQLString
        },
        message: {
            type: graphql_1.GraphQLString
        }
    }
});
//# sourceMappingURL=transaction.type.js.map