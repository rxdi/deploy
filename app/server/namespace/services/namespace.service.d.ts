export declare class NamespaceService {
    private namespace;
    getNamespace(name: string): Promise<{}>;
    getNamespaceById(id: string): Promise<{}>;
    searchForDuplicates(name: any): Promise<{}>;
    insert(doc: {
        name: string;
    }): Promise<{}>;
    listNamespaces(skip?: number, limit?: number, query?: {}): Promise<{}>;
}
