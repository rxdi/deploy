import { GraphQLObjectType, GraphQLString } from "graphql";
import { TransactionTypeEnum } from "./transaction-enum.type";

export const TransactionType = new GraphQLObjectType({
    name: 'TransactionType',
    fields: {
        _id: {
            type: GraphQLString
        },
        status: {
            type: TransactionTypeEnum
        },
        birthtime: {
            type: GraphQLString
        },
        path: {
            type: GraphQLString
        },
        repoFolder: {
            type: GraphQLString
        },
        hash: {
            type: GraphQLString
        },
        namespace: {
            type: GraphQLString
        },
        message: {
            type: GraphQLString
        }
    }
});
