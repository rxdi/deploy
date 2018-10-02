"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const history_type_1 = require("../../history/types/history.type");
const core_1 = require("@rxdi/core");
const services_1 = require("../../../services");
exports.NamespaceType = new graphql_1.GraphQLObjectType({
    name: 'Namespacetype',
    fields: {
        _id: {
            type: graphql_1.GraphQLString
        },
        name: {
            type: graphql_1.GraphQLString
        },
        builds: {
            type: new graphql_1.GraphQLList(history_type_1.HistoryType),
            resolve: (root) => __awaiter(this, void 0, void 0, function* () {
                const buildHistoryService = core_1.Container.get(services_1.BuildHistoryService);
                return yield buildHistoryService.findAll(0, 100, null, { namespaceId: root._id });
            })
        }
    }
});
//# sourceMappingURL=namespace.type.js.map