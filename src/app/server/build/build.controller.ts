import { Type, Controller, Mutation, GraphQLString, GraphQLNonNull, Query, GraphQLInt, GraphQLInputObjectType, Subscribe, Subscription, PubSubService } from "@gapi/core";
import { BuildType } from './types/build.type';
import { CompileService } from "../services/compile.service";
import { IHistoryListType } from "../../core/api-introspection";
import { BuildHistoryService, FileService, TsConfigGenratorService, LoggerService } from "../../services";
import { HistoryListType } from '../history/types/history-list.type';
import { BuildStatusType } from './types/built-status.type';
import { ProcessStdOutType } from './types/process.type';
import { createWriteStream } from "fs";
import { format } from "util";
import { Subscription as rxjsSubscription } from "rxjs";

@Controller()
export class BuildController {

    constructor(
        private compileService: CompileService,
        private buildHistoryService: BuildHistoryService,
        private pubsub: PubSubService,
        private fileService: FileService,
        private tsGenerator: TsConfigGenratorService,
        private loggerService: LoggerService
    ) { }

    @Type(BuildType)
    @Mutation({
        folder: {
            type: new GraphQLNonNull(GraphQLString)
        },
        file: {
            type: new GraphQLNonNull(GraphQLString)
        },
        message: {
            type: new GraphQLNonNull(GraphQLString)
        },
        namespace: {
            type: new GraphQLNonNull(GraphQLString)
        },
        buildFolder: {
            type: GraphQLString
        }
    })
    async triggerBuild(root, { folder, file, message, namespace, buildFolder }) {
        return new Promise(async (resolve, reject) => {
            await this.fileService.writeFile(folder + '/tsconfig.json', this.tsGenerator.getTsConfig(file.replace('.ts', '')));
            const log_file = createWriteStream(`${folder}/${file}.log`, { flags: 'w' });
            const subscription = this.loggerService.stdout.subscribe(log => {
                log_file.write(format(log) + '\n');
                this.pubsub.publish('CREATE_SIGNAL_BASIC', { message: format(log) });
            });
            let sub: rxjsSubscription;
            const cancelSubscription = (e?) => {
                subscription.unsubscribe();
                log_file.close();
                sub.unsubscribe();
                reject(e || 'Build failed');
            };
            sub = this.compileService.buildFile(
                folder, file, message, namespace, buildFolder
            ).subscribe(
                () => {
                    resolve({
                        status: 'Finish'
                    });
                    cancelSubscription();
                },
                (e) => {
                    cancelSubscription(e);
                }
            );
        });

    }

    @Type(HistoryListType)
    @Query({
        skip: {
            type: GraphQLInt
        },
        limit: {
            type: GraphQLInt
        },
        where: {
            type: new GraphQLInputObjectType({
                name: 'BuildWhereType',
                fields: {
                    namespaceId: {
                        type: GraphQLString
                    },
                    name: {
                        type: GraphQLString
                    }
                }
            })
        }
    })
    async getBuildHistory(root, { skip, limit, where }): Promise<IHistoryListType> {
        const items = await this.buildHistoryService.findAll(skip, limit, null, where);
        return {
            count: items.length,
            rows: items
        };
    }


    @Type(BuildStatusType)
    @Subscribe((self: BuildController) => self.pubsub.asyncIterator('LISTEN_FOR_BUILDS'))
    @Subscription()
    buildStatus(payload) {
        return { payload };
    }


    @Type(ProcessStdOutType)
    @Subscribe((self: BuildController) => self.pubsub.asyncIterator('PROCESS_STDOUT'))
    @Subscription()
    processStdOut(payload) {
        return { payload }
    }

}