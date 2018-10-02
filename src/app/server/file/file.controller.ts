import { Controller } from "@rxdi/core";
import { Query, Type, GraphQLString, GraphQLNonNull } from "@gapi/core";
import { FileType } from './types/file.type';
import { FileService as InternalFileService } from "./services/file.service";
import { FileService } from "../../services/file/file.service";
import { FileRawType } from './types/file-raw.type';
import { includes } from "../../services";

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
        let filePath;
        if (includes('--enable-full-folder-access')) {
            filePath = folder;
        } else {
            folder = folder.replace('.', '')
            filePath = process.cwd() + folder;
        }
        return {
            file: await this.fileService.readFile(filePath)
        }
    }

    @Type(FileRawType)
    @Query({
        folder: {
            type: new GraphQLNonNull(GraphQLString)
        },
        content: {
            type: new GraphQLNonNull(GraphQLString)
        }
    })
    async saveFile(root, {folder, content}) {
        let filePath;
        if (includes('--enable-full-folder-access')) {
            filePath = folder;
        } else {
            folder = folder.replace('.', '')
            filePath = process.cwd() + folder;
        }
        await this.fileService.writeFile(filePath, content);
        return {
            file: await this.fileService.readFile(filePath)
        }
    }

}