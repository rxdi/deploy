"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@rxdi/core");
const core_2 = require("@gapi/core");
const file_type_1 = require("./types/file.type");
const file_service_1 = require("./services/file.service");
const file_service_2 = require("../../services/file/file.service");
const file_raw_type_1 = require("./types/file-raw.type");
const services_1 = require("../../services");
let FileController = class FileController {
    constructor(fileServiceInternal, fileService) {
        this.fileServiceInternal = fileServiceInternal;
        this.fileService = fileService;
    }
    listFiles(root, { folder }) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                paths: yield this.fileServiceInternal.listFolder(folder)
            };
        });
    }
    readFile(root, { folder }) {
        return __awaiter(this, void 0, void 0, function* () {
            let filePath = process.cwd();
            if (services_1.includes('--enable-full-folder-access')) {
                filePath = folder;
            }
            else {
                folder = folder.replace('.', '');
                filePath = filePath + folder;
            }
            const extension = filePath.split('.').pop();
            const isImage = extension === 'jpg' || extension === 'jpeg' || extension === 'png';
            let file = yield this.fileService.readFile(filePath);
            ;
            if (isImage) {
                file = (yield this.fileService.readFileRaw(filePath)).toString('base64');
                file = `data:image/${extension};base64, ${file}`;
            }
            let reactivePackage = null;
            try {
                reactivePackage = yield this.fileService.readFile(filePath.substring(0, filePath.lastIndexOf('/')) + '/reactive.json');
            }
            catch (e) { }
            return {
                package: reactivePackage,
                file
            };
        });
    }
    saveFile(root, { folder, content }) {
        return __awaiter(this, void 0, void 0, function* () {
            let filePath;
            if (services_1.includes('--enable-full-folder-access')) {
                filePath = folder;
            }
            else {
                folder = folder.replace('.', '');
                filePath = process.cwd() + folder;
            }
            yield this.fileService.writeFile(filePath, content);
            return {
                file: yield this.fileService.readFile(filePath)
            };
        });
    }
};
__decorate([
    core_2.Type(file_type_1.FileType),
    core_2.Query({
        folder: {
            type: core_2.GraphQLString
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "listFiles", null);
__decorate([
    core_2.Type(file_raw_type_1.FileRawType),
    core_2.Query({
        folder: {
            type: new core_2.GraphQLNonNull(core_2.GraphQLString)
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "readFile", null);
__decorate([
    core_2.Type(file_raw_type_1.FileRawType),
    core_2.Query({
        folder: {
            type: new core_2.GraphQLNonNull(core_2.GraphQLString)
        },
        content: {
            type: new core_2.GraphQLNonNull(core_2.GraphQLString)
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "saveFile", null);
FileController = __decorate([
    core_1.Controller(),
    __metadata("design:paramtypes", [file_service_1.FileService,
        file_service_2.FileService])
], FileController);
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map