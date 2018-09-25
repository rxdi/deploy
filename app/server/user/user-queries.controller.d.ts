import { PubSubService } from '@gapi/core';
export declare class UserQueriesController {
    private pubsub;
    constructor(pubsub: PubSubService);
    findUser(root: any, { id }: {
        id: any;
    }, context: any): {
        id: any;
    };
    subscribeToUserMessagesBasic(): {
        id: string;
    };
}
