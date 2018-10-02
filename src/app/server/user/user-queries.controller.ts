import { Controller } from '@rxdi/core';
import { Type, Query, Subscription, Subscribe, PubSubService } from '@gapi/core';
import { GraphQLString } from 'graphql';
import { UserType } from './types/user.type';

@Controller()
export class UserQueriesController {
    
    constructor(
        private pubsub: PubSubService
    ) {
    }

    @Type(UserType)
    @Query({
        message: {
            type: GraphQLString
        }
    })
    async findUser(root, { message }) {
        return {
            message
        }
    }

    @Type(UserType)
    @Subscribe((self: UserQueriesController) => self.pubsub.asyncIterator('CREATE_SIGNAL_BASIC'))
    @Subscription()
    subscribeToUserMessagesBasic({message}: {message: string}) {
        return { message };
    }
}