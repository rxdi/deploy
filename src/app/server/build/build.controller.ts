import { Type, Controller, Mutation, GraphQLString, GraphQLNonNull } from "@gapi/core";
import { BuildType } from './types/build.type';
import { CompileService } from "../services/compile.service";

@Controller()
export class BuildController {

    constructor(
        private compileService: CompileService
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
    triggerBuild(root, { folder, file, message, namespace, buildFolder }) {
        setTimeout(async () => await this.compileService.buildFile(
            folder, file, message, namespace, buildFolder
        ).toPromise());
        return {
            status: 'Triggered'
        }
    }
}