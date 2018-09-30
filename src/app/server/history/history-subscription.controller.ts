import { Controller, Subscription, Subscribe, Type, PubSubService, Query, GraphQLInt } from "@gapi/core";
import { HistoryType } from "./types/history.type";
import { BuildStatusType } from './types/built-status.type';
import { BuildHistoryService } from "../../services";
import { IHistoryListType } from "../../core/api-introspection";
import { HistoryListType } from './types/history-list.type';

@Controller()
export class HistorySubscriptionController {

    constructor(
        private pubsub: PubSubService,
        private buildHistoryService: BuildHistoryService
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

    @Type(HistoryListType)
    @Query({
        skip: {
            type: GraphQLInt
        },
        limit: {
            type: GraphQLInt
        },
    })
    async getBuildHistory(root, { skip, limit }): Promise<IHistoryListType> {
        const items = await this.buildHistoryService.findAll(skip, limit);
        return {
            count: items.length,
            rows: items
        };
    }

}