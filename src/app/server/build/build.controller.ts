import { Type, Controller, Mutation, GraphQLString, GraphQLNonNull, Query, GraphQLInt, GraphQLInputObjectType, Subscribe, Subscription, PubSubService } from "@gapi/core";
import { BuildType } from './types/build.type';
import { CompileService } from "../services/compile.service";
import { IHistoryListType } from "../../core/api-introspection";
import { BuildHistoryService, FileService, TsConfigGenratorService } from "../../services";
import { HistoryListType } from '../history/types/history-list.type';
import { BuildStatusType } from './types/built-status.type';
import { ProcessStdOutType } from './types/process.type';

@Controller()
export class BuildController {

    constructor(
        private compileService: CompileService,
        private buildHistoryService: BuildHistoryService,
        private pubsub: PubSubService,
        private fileService: FileService,
        private tsGenerator: TsConfigGenratorService
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
        await this.fileService.writeFile(folder + '/tsconfig.json', this.tsGenerator.getTsConfig(file.replace('.ts', '')));
        setTimeout(async () => await this.compileService.buildFile(
            folder, file, message, namespace, buildFolder
        ).toPromise());
        return {
            status: 'Triggered'
        }
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
        const items = await this.buildHistoryService.findAll(skip, limit, { name: 1 }, where);
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