import { PubSubService } from '@gapi/core';
export declare class UserQueriesController {
    private pubsub;
    constructor(pubsub: PubSubService);
    findUser(root: any, { message }: {
        message: any;
    }): Promise<{
        message: any;
    }>;
    subscribeToUserMessagesBasic({ message }: {
        message: string;
    }): {
        message: string;
    };
}
