import { INamespacetype } from '../../../core/api-introspection/index';
export declare class NamespaceService {
    private namespace;
    getNamespace(name: string): Promise<{}>;
    getNamespaceById(_id: string): Promise<{}>;
    searchForDuplicates(name: any): Promise<{}>;
    insert(doc: {
        name: string;
    }): Promise<{}>;
    listNamespaces(skip?: number, limit?: number, sort?: {
        createdAt: number;
    }): Promise<INamespacetype[]>;
}
