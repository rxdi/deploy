import { Module } from '@rxdi/core';
import { WebUiService } from './services/webui.service';
import { ServerPushService } from './services/server-push.service';
import { UserQueriesController } from './user/user-queries.controller';
import { HistoryModule } from './history/history.module';
import { CompileService } from './services/compile.service';
import { NamespaceModule } from './namespace/namespace.module';
import { BuildModule } from './build/build.module';
import { FileModule } from './file/file.module';

@Module({
    imports: [
        HistoryModule,
        NamespaceModule,
        BuildModule,
        FileModule
    ],
    services: [WebUiService, ServerPushService, CompileService],
    controllers: [UserQueriesController]
})
export class ServerModule { }