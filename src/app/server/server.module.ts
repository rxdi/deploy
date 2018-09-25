import { Module } from '@rxdi/core';
import { FrameworkImports } from './framework-imports';
import { WebUiService } from './services/webui.service';
import { ServerPushService } from './services/server-push.service';

@Module({
    imports: [FrameworkImports],
    services: [WebUiService, ServerPushService],
})
export class ServerModule {}