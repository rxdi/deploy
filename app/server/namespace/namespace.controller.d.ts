import { NamespaceService } from "./services/namespace.service";
export declare class NamespaceController {
    private namespaceService;
    constructor(namespaceService: NamespaceService);
    getNamespace(root: any, { id }: {
        id: any;
    }): Promise<{}>;
    insertNamespace(root: any, { name }: {
        name: any;
    }): Promise<{}>;
    listNamespaces(root: any, { skip, limit }: {
        skip: any;
        limit: any;
    }): Promise<{}>;
}
