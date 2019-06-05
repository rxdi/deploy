import { NamespaceService } from "./services/namespace.service";
import { INamespaceListType } from "../../core/api-introspection";
export declare class NamespaceController {
    private namespaceService;
    constructor(namespaceService: NamespaceService);
    getNamespace(root: any, { id }: {
        id: any;
    }): Promise<unknown>;
    insertNamespace(root: any, { name }: {
        name: any;
    }): Promise<unknown>;
    listNamespaces(root: any, { skip, limit }: {
        skip: any;
        limit: any;
    }): Promise<INamespaceListType>;
}
