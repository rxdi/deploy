import { INamespacetype } from '../../../core/api-introspection/index';
export declare class NamespaceService {
    private namespace;
    getNamespace(name: string): Promise<unknown>;
    getNamespaceById(_id: string): Promise<unknown>;
    searchForDuplicates(name: any): Promise<unknown>;
    insert(doc: {
        name: string;
    }): Promise<unknown>;
    listNamespaces(skip?: number, limit?: number, sort?: {
        createdAt: number;
    }): Promise<INamespacetype[]>;
}
