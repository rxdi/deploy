import { CoreModule, Module } from '@gapi/core';
import { nextOrDefault } from '../services';
// import { AuthModule } from '@gapi/auth';
// import { readFileSync } from 'fs';
// import { AuthService } from './services/auth/auth.service';

export const isProduction = () => process.env.NODE_ENV === 'production';

isProduction() ? console.log = () => { } : null;

@Module({
    imports: [
        // AuthModule.forRoot({
        //     algorithm: 'HS256',
        //     cert: readFileSync('./cert.key'),
        //     cyper: {
        //         algorithm: 'aes256',
        //         iv: 'Jkyt1H3FA8JK9L3B',
        //         privateKey: '8zTVzr3p53VC12jHV54rIYu2545x47lA'
        //     }
        // }),
        CoreModule.forRoot({
            server: {
                hapi: {
                    port: process.env.API_PORT || process.env.PORT || 9000,
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
            pubsub: {
                // authentication: AuthService
            },
            graphql: {
                path: '/graphql',
                openBrowser: nextOrDefault('--open-browser', false),
                watcherPort: 8967,
                writeEffects: isProduction() || process.env.WRITE_EFFECTS ? false : true,
                // graphiql: isProduction() ? false : true,
                graphiQlPlayground: nextOrDefault('--graphiql-playground', false),
                graphiQlPath: '/graphiql',
                // authentication: AuthService,
                graphiqlOptions: {
                    endpointURL: '/graphql',
                    passHeader: `'Authorization':'${process.env.GRAPHIQL_TOKEN}'`,
                    subscriptionsEndpoint: `${process.env.GRAPHIQL_WS_SSH ? 'wss' : 'ws'}://${process.env.GRAPHIQL_WS_PATH || 'localhost'}${process.env.DEPLOY_PLATFORM === 'heroku'
                        ? ''
                        : `:${process.env.API_PORT ||
                        process.env.PORT}`}/subscriptions`,
                    websocketConnectionParams: {
                        token: process.env.GRAPHIQL_TOKEN
                    }
                },
                graphqlOptions: {
                    schema: null,
                    // validationRules: [queryComplexity({
                    //     maximumComplexity: 100,
                    //     onComplete: (complexity: number) => { console.log('Query Complexity:', complexity); },
                    // createError: (max: number, actual: number) => {
                    //     return new GraphQLError(`Query is too complex: ${actual}. Maximum allowed complexity: ${max}`);
                    //   }
                    // })]
                }
            },
        }),

    ]
})
export class FrameworkImports { }