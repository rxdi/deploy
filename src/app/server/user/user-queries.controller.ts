import { Controller } from '@rxdi/core';
import { Type, Query, Subscription, Subscribe, PubSubService } from '@gapi/core';
import { GraphQLString } from 'graphql';
import { UserType } from './types/user.type';
import { CompileService } from '../services/compile.service';

@Controller()
export class UserQueriesController {
    
    constructor(
        private pubsub: PubSubService,
        private compileService: CompileService
    ) {
        let counter = 0;
        setInterval(() => {
            counter++;
            this.pubsub.publish('CREATE_SIGNAL_BASIC', { id: String(counter) });
        }, 3000);
    }

    @Type(UserType)
    @Query({
        id: {
            type: GraphQLString
        }
    })
    async findUser(root, { id }, context) {
        setTimeout(async () => await this.compileService.buildFile().toPromise());
        return {
            id
        }
    }

    @Type(UserType)
    @Subscribe((self: UserQueriesController) => self.pubsub.asyncIterator('CREATE_SIGNAL_BASIC'))
    @Subscription()
    subscribeToUserMessagesBasic({id}: {id: string}) {
        return { id };
    }
}