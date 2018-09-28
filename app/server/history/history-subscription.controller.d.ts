import { PubSubService } from "@gapi/core";
export declare class HistorySubscriptionController {
    private pubsub;
    constructor(pubsub: PubSubService);
    listenForNewBuilds(payload: any): {
        payload: any;
    };
    buildStatus(payload: any): {
        payload: any;
    };
}
