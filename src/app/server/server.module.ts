import { Module } from '@rxdi/core';
import { WebUiService } from './services/webui.service';
import { ServerPushService } from './services/server-push.service';
import { UserQueriesController } from './user/user-queries.controller';

@Module({
    services: [WebUiService, ServerPushService],
    controllers: [UserQueriesController]
})
export class ServerModule {}