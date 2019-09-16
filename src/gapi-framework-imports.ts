import { CoreModule, Module } from '@gapi/core';
import { nextOrDefault, includes } from './app/services/helpers/helpers';
import { ModuleWithServices } from '@rxdi/core';

@Module()
export class GapiFrameworkImports {
  public static forRoot(init: boolean): ModuleWithServices {
    let imports = [];
    if (init) {
      imports = [
        CoreModule.forRoot({
          server: {
            randomPort: !process.env.RANDOM_PORT ? nextOrDefault('--random-port', false, Boolean) : false,
            hapi: {
              port: process.env.API_PORT ? process.env.API_PORT : nextOrDefault('--graphql-api-port', 9300, Number),
              routes: {
                cors: {
                  origin: ['*'],
                  additionalHeaders: [
                    'Host',
                    'User-Agent',
                    'Accept',
                    'Accept-Language',
                    'Accept-Encoding',
                    'Access-Control-Request-Method',
                    'Access-Control-Allow-Origin',
                    'Access-Control-Request-Headers',
                    'Origin',
                    'Connection',
                    'Pragma',
                    'Cache-Control',
                  ],
                },
              },
            },
          },
          graphql: {
            path: nextOrDefault('--graphql-endpoint', '/graphql'),
            openBrowser: includes('--open-browser-graphiql'),
            watcherPort: nextOrDefault('--open-browser-graphiql', 8967),
            writeEffects: includes('--write-effects'),
            graphiql: includes('--graphiql'),
            graphiQlPlayground: includes('--graphiql-playground'),
            graphiQlPath: nextOrDefault('--graphiql-endpoint', '/graphiql'),
            graphiqlOptions: {
              endpointURL: nextOrDefault('--graphql-endpoint', '/graphql'),
              passHeader: `'Authorization':'${nextOrDefault('--graphiql-auth-token', '')}'`,
              subscriptionsEndpoint: nextOrDefault(
                '--graphiql-subscription-endpoint',
                'ws://localhost:9300/subscriptions'
              ),
              websocketConnectionParams: {
                token: nextOrDefault('--graphiql-auth-token', ''),
              },
            },
            graphqlOptions: {
              schema: null,
            },
          },
        }),
      ];
    }
    return {
      module: GapiFrameworkImports,
      frameworkImports: imports,
    };
  }
}
