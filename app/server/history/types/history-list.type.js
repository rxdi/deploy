"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const history_type_1 = require("./history.type");
exports.HistoryListType = new graphql_1.GraphQLObjectType({
    name: 'HistoryListType',
    fields: {
        count: {
            type: graphql_1.GraphQLInt
        },
        rows: {
            type: new graphql_1.GraphQLList(history_type_1.HistoryType)
        }
    }
});
//# sourceMappingURL=history-list.type.js.map