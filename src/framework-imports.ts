import { CoreModule, Module } from '@gapi/core';
import { includes, nextOrDefault } from './app/services/arguments/arguments.service';

@Module({
    imports: [
        CoreModule.forRoot({
            server: {
                hapi: {
                    port: nextOrDefault('--graphql-api-port', 9000),
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
                                'Cache-Control'
                            ]
                        }
                    }

                }
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
                    subscriptionsEndpoint: nextOrDefault('--graphiql-subscription-endpoint', 'ws://localhost:9000/subscriptions'),
                    websocketConnectionParams: {
                        token: nextOrDefault('--graphiql-auth-token', '')
                    }
                },
                graphqlOptions: {
                    schema: null
                }
            },
        }),
    ]
})
export class FrameworkImports { }