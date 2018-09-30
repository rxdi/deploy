import { PubSubService } from "@gapi/core";
import { BuildHistoryService } from "../../services";
import { IHistoryListType } from "../../core/api-introspection";
export declare class HistorySubscriptionController {
    private pubsub;
    private buildHistoryService;
    constructor(pubsub: PubSubService, buildHistoryService: BuildHistoryService);
    listenForNewBuilds(payload: any): {
        payload: any;
    };
    buildStatus(payload: any): {
        payload: any;
    };
    getBuildHistory(root: any, { skip, limit }: {
        skip: any;
        limit: any;
    }): Promise<IHistoryListType>;
}
