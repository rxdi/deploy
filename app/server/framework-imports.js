"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@gapi/core");
const services_1 = require("../services");
exports.isProduction = () => process.env.NODE_ENV === 'production';
exports.isProduction() ? console.log = () => { } : null;
let FrameworkImports = class FrameworkImports {
};
FrameworkImports = __decorate([
    core_1.Module({
        imports: [
            core_1.CoreModule.forRoot({
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
                pubsub: {},
                graphql: {
                    path: '/graphql',
                    openBrowser: services_1.nextOrDefault('--open-browser', false),
                    watcherPort: 8967,
                    writeEffects: exports.isProduction() || process.env.WRITE_EFFECTS ? false : true,
                    graphiQlPlayground: services_1.nextOrDefault('--graphiql-playground', false),
                    graphiQlPath: '/graphiql',
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
                    }
                },
            }),
        ]
    })
], FrameworkImports);
exports.FrameworkImports = FrameworkImports;
//# sourceMappingURL=framework-imports.js.map