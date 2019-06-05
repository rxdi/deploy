"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GapiFrameworkImports_1;
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@gapi/core");
const helpers_1 = require("./app/services/helpers/helpers");
let GapiFrameworkImports = GapiFrameworkImports_1 = class GapiFrameworkImports {
    static forRoot(init) {
        let imports = [];
        if (init) {
            imports = [core_1.CoreModule.forRoot({
                    server: {
                        randomPort: !process.env.RANDOM_PORT ? helpers_1.nextOrDefault('--random-port', false, Boolean) : false,
                        hapi: {
                            port: process.env.API_PORT ? process.env.API_PORT : helpers_1.nextOrDefault('--graphql-api-port', 9300, Number),
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
                        path: helpers_1.nextOrDefault('--graphql-endpoint', '/graphql'),
                        openBrowser: helpers_1.includes('--open-browser-graphiql'),
                        watcherPort: helpers_1.nextOrDefault('--open-browser-graphiql', 8967),
                        writeEffects: helpers_1.includes('--write-effects'),
                        graphiql: helpers_1.includes('--graphiql'),
                        graphiQlPlayground: helpers_1.includes('--graphiql-playground'),
                        graphiQlPath: helpers_1.nextOrDefault('--graphiql-endpoint', '/graphiql'),
                        graphiqlOptions: {
                            endpointURL: helpers_1.nextOrDefault('--graphql-endpoint', '/graphql'),
                            passHeader: `'Authorization':'${helpers_1.nextOrDefault('--graphiql-auth-token', '')}'`,
                            subscriptionsEndpoint: helpers_1.nextOrDefault('--graphiql-subscription-endpoint', 'ws://localhost:9300/subscriptions'),
                            websocketConnectionParams: {
                                token: helpers_1.nextOrDefault('--graphiql-auth-token', '')
                            }
                        },
                        graphqlOptions: {
                            schema: null
                        }
                    },
                })];
        }
        return {
            module: GapiFrameworkImports_1,
            frameworkImports: imports
        };
    }
};
GapiFrameworkImports = GapiFrameworkImports_1 = __decorate([
    core_1.Module()
], GapiFrameworkImports);
exports.GapiFrameworkImports = GapiFrameworkImports;
//# sourceMappingURL=gapi-framework-imports.js.map