import { Query, Controller, Type, GraphQLString, GraphQLInt, Mutation } from "@gapi/core";
import { NamespaceType } from './types/namespace.type';
import { NamespaceService } from "./services/namespace.service";

@Controller()
export class NamespaceController {

    constructor(
        private namespaceService: NamespaceService
    ) { }

    @Type(NamespaceType)
    @Query({
        id: {
            type: GraphQLString
        }
    })
    getNamespace(root, { id }) {
        return this.namespaceService.getNamespaceById(id);
    }

    @Type(NamespaceType)
    @Mutation({
        name: {
            type: GraphQLString
        }
    })
    async insertNamespace(root, { name }) {
        const namespace = await this.namespaceService.searchForDuplicates(name);
        if (namespace) {
            throw new Error('Namespace already exists!');
        }
        return await this.namespaceService.insert({ name });
    }

    @Type(NamespaceType)
    @Query({
        skip: {
            type: GraphQLInt
        },
        limit: {
            type: GraphQLInt
        },
    })
    listNamespaces(root, { skip, limit }) {
        return this.namespaceService.listNamespaces(skip, limit);
    }

}