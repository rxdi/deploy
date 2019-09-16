import { Query, Controller, Type, GraphQLString, GraphQLInt, Mutation } from '@gapi/core';
import { NamespaceType } from './types/namespace.type';
import { NamespaceService } from './services/namespace.service';
import { NamespaceListType } from './types/namespace-list.type';
import { INamespaceListType } from '../../core/api-introspection';

@Controller()
export class NamespaceController {
  constructor(private namespaceService: NamespaceService) {}

  @Type(NamespaceType)
  @Query({
    id: {
      type: GraphQLString,
    },
  })
  getNamespace(root, { id }) {
    return this.namespaceService.getNamespaceById(id);
  }

  @Type(NamespaceType)
  @Mutation({
    name: {
      type: GraphQLString,
    },
  })
  async insertNamespace(root, { name }) {
    const namespace = await this.namespaceService.searchForDuplicates(name);
    if (namespace) {
      throw new Error('Namespace already exists!');
    }
    return await this.namespaceService.insert({ name });
  }

  @Type(NamespaceListType)
  @Query({
    skip: {
      type: GraphQLInt,
    },
    limit: {
      type: GraphQLInt,
    },
  })
  async listNamespaces(root, { skip, limit }): Promise<INamespaceListType> {
    const namespaces = await this.namespaceService.listNamespaces(skip, limit);
    return {
      count: namespaces.length,
      rows: namespaces,
    };
  }
}
