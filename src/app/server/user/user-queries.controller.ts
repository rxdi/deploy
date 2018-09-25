import { Controller } from '@rxdi/core';
import { Type, Query, Subscription, Subscribe, PubSubService } from '@gapi/core';
import { GraphQLString } from 'graphql';
import { UserType } from './types/user.type';

@Controller()
export class UserQueriesController {

    constructor(
        private pubsub: PubSubService
    ) {
        setInterval(() => {
            this.pubsub.publish('CREATE_SIGNAL_BASIC', { id: 1 });
        }, 3000);
    }

    @Type(UserType)
    @Query({
        id: {
            type: GraphQLString
        }
    })
    findUser(root, { id }, context) {
        return {
            id
        }
    }

    @Type(UserType)
    @Subscribe((self: UserQueriesController) => self.pubsub.asyncIterator('CREATE_SIGNAL_BASIC'))
    @Subscription()
    subscribeToUserMessagesBasic() {
        return { id: '1' };
    }
}