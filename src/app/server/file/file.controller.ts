import { Controller } from "@rxdi/core";
import { Query, Type, GraphQLString, GraphQLNonNull } from "@gapi/core";
import { FileType } from './types/file.type';
import { FileService as InternalFileService } from "./services/file.service";
import { FileService } from "../../services/file/file.service";
import { FileRawType } from './types/file-raw.type';

@Controller()
export class FileController {

    constructor(
        private fileServiceInternal: InternalFileService,
        private fileService: FileService

    ) { }

    @Type(FileType)
    @Query({
        folder: {
            type: GraphQLString
        }
    })
    async listFiles(root, { folder }) {
        return {
            paths: await this.fileServiceInternal.listFolder(folder)
        };
    }

    @Type(FileRawType)
    @Query({
        folder: {
            type: new GraphQLNonNull(GraphQLString)
        }
    })
    async readFile(root, {folder}) {
        folder = folder.replace('.', '')
        return {
            file: await this.fileService.readFile(process.cwd() + folder)
        }
    }
}