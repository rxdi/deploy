import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import { HistoryType } from "../../history/types/history.type";
import { Container } from "@rxdi/core";
import { BuildHistoryService } from "../../../services";

export const NamespaceType = new GraphQLObjectType({
    name: 'Namespacetype',
    fields: {
        _id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        builds: {
            type: new GraphQLList(HistoryType),
            resolve: async (root) => {
                const buildHistoryService = Container.get(BuildHistoryService);
                return await buildHistoryService.findAll(0, 100, null, { namespaceId: root._id})
            }
        }
    }
});