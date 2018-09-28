import { Controller, Subscription, Subscribe, Type, PubSubService } from "@gapi/core";
import { HistoryType } from "./types/history.type";
import { BuildStatusType } from './types/built-status.type';

@Controller()
export class HistorySubscriptionController {

    constructor(
        private pubsub: PubSubService
    ) { }

    @Type(HistoryType)
    @Subscribe((self: HistorySubscriptionController) => self.pubsub.asyncIterator('LISTEN_FOR_BUILDS'))
    @Subscription()
    listenForNewBuilds(payload) {
        return { payload };
    }

    @Type(BuildStatusType)
    @Subscribe((self: HistorySubscriptionController) => self.pubsub.asyncIterator('LISTEN_FOR_BUILDS'))
    @Subscription()
    buildStatus(payload) {
        return { payload };
    }

}