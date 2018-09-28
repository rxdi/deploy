import { PubSubService } from '@gapi/core';
import { CompileService } from '../services/compile.service';
export declare class UserQueriesController {
    private pubsub;
    private compileService;
    constructor(pubsub: PubSubService, compileService: CompileService);
    findUser(root: any, { id }: {
        id: any;
    }, context: any): Promise<{
        id: any;
    }>;
    subscribeToUserMessagesBasic({ id }: {
        id: string;
    }): {
        id: string;
    };
}
