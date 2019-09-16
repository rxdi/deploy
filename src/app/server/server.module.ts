import { Module, Container } from '@rxdi/core';
import { WebUiService } from './services/webui.service';
import { ServerPushService } from './services/server-push.service';
import { UserQueriesController } from './user/user-queries.controller';
import { HistoryModule } from './history/history.module';
import { CompileService } from './services/compile.service';
import { NamespaceModule } from './namespace/namespace.module';
import { BuildModule } from './build/build.module';
import { FileModule } from './file/file.module';
import { TransactionsModule } from './transactions/transactions.module';
import {
  ON_REQUEST_HANDLER,
  GRAPHQL_PLUGIN_CONFIG,
  Boom,
  RESOLVER_HOOK,
  GenericGapiResolversType,
  errorUnauthorized,
} from '@gapi/core';
import { ResponseToolkit, Request } from 'hapi';
import { InterceptorType, RequestHandler } from '../../env.injection.tokens';
import { nextOrDefault } from '../services';

@Module({
  imports: [HistoryModule, NamespaceModule, BuildModule, FileModule, TransactionsModule],
  services: [WebUiService, ServerPushService, CompileService],
  controllers: [UserQueriesController],
  providers: [
    {
      provide: ON_REQUEST_HANDLER,
      deps: [GRAPHQL_PLUGIN_CONFIG],
      useFactory: (config: GRAPHQL_PLUGIN_CONFIG) => async (next, request: Request, h: ResponseToolkit, err: Error) => {
        let interceptor: InterceptorType;
        try {
          interceptor = Container.get<InterceptorType>(RequestHandler);
        } catch (e) {}
        if (interceptor && interceptor.handler) {
          try {
            config.graphqlOptions.context = await interceptor.handler(request);
          } catch (e) {
            return Boom.unauthorized();
          }
        } else {
          config.graphqlOptions.context = null;
        }
        return next();
      },
    },
    {
      provide: RESOLVER_HOOK,
      useFactory: () => (resolver: GenericGapiResolversType) => {
        const resolve = resolver.resolve.bind(resolver.target);
        if (nextOrDefault('--interceptor')) {
          let interceptor: InterceptorType;
          try {
            interceptor = Container.get<InterceptorType>(RequestHandler);
          } catch (e) {}
          if (interceptor && interceptor.resolverHook) {
            resolver.resolve = async function(root, args, context, info, ...a) {
              await interceptor.resolverHook(resolver, root, args, context, info);
              return resolve(root, args, context, info, ...a);
            };
          }
        }
        return resolver;
      },
    },
  ],
})
export class ServerModule {}
