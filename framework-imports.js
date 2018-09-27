"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@gapi/core");
const arguments_service_1 = require("./app/services/arguments/arguments.service");
let FrameworkImports = class FrameworkImports {
};
FrameworkImports = __decorate([
    core_1.Module({
        imports: [
            core_1.CoreModule.forRoot({
                server: {
                    hapi: {
                        port: arguments_service_1.nextOrDefault('--graphql-api-port', 9000),
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
                    path: arguments_service_1.nextOrDefault('--graphql-endpoint', '/graphql'),
                    openBrowser: arguments_service_1.includes('--open-browser-graphiql'),
                    watcherPort: arguments_service_1.nextOrDefault('--open-browser-graphiql', 8967),
                    writeEffects: arguments_service_1.includes('--write-effects'),
                    graphiql: arguments_service_1.includes('--graphiql'),
                    graphiQlPlayground: arguments_service_1.includes('--graphiql-playground'),
                    graphiQlPath: arguments_service_1.nextOrDefault('--graphiql-endpoint', '/graphiql'),
                    graphiqlOptions: {
                        endpointURL: arguments_service_1.nextOrDefault('--graphql-endpoint', '/graphql'),
                        passHeader: `'Authorization':'${arguments_service_1.nextOrDefault('--graphiql-auth-token', '')}'`,
                        subscriptionsEndpoint: arguments_service_1.nextOrDefault('--graphiql-subscription-endpoint', 'ws://localhost:9000/subscriptions'),
                        websocketConnectionParams: {
                            token: arguments_service_1.nextOrDefault('--graphiql-auth-token', '')
                        }
                    },
                    graphqlOptions: {
                        schema: null
                    }
                },
            }),
        ]
    })
], FrameworkImports);
exports.FrameworkImports = FrameworkImports;
//# sourceMappingURL=framework-imports.js.map